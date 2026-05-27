import {Socket,Server} from 'socket.io'
import redis from '../config/redis'
import { release } from 'os';

export const registerSocketHandlers =(socket : Socket,io:Server) =>{

    /**
   * USER JOINS A SHOW ROOM
   
   * When a user opens the seat layout page,
   * we send all currently locked seats.
   */

    socket.on("join-show",async({showId})=>{
        
        //1)Join the room using showId
        socket.join(showId)// socket.join() -> It adds a socket (user connection) into a room 

        //socket.data is a built-in object provided by Socket.IO.
        // -> It is used to store custom data for that socket connection.
        // current connected user/socket ka custom data temporarily save karne ke liye use hota hai.
        socket.data.showId=showId;

        console.log(`✅ Socket ${socket.id} joined show ${showId}`);
        


        //2)Fetch all locked seats from Redis SET
        const lockedSeats= await redis.smembers(`locked-seats:${showId}`); // semembers()->Redis Set ke saare values return karta hai

        //currently active locked seats  -> removing the locked seats from the Redis SET , which are expired or unlocked
        const activeLockedSeats=[];
        for(const seatId of lockedSeats){
            const lockKey = `seat-lock:${showId}:${seatId}`;
            const exists = await redis.exists(lockKey);

            if(exists){
                activeLockedSeats.push(seatId);
            }else{
                await redis.srem(`locked-seats:${showId}`, seatId);
            }
        }

        //3)send ACTIVE locked seats to new user that comes to seat layout page  
        socket.emit("locked-seats-initials",{seatIds:activeLockedSeats}); 

    });



    /**
     * LOCK SEATS
     
        * User clicks "Proceed"
        * We lock seats for 5 minutes
    */
    //Race condition handling 
    socket.on("lock-seats",async({showId,seatIds,userId},callback)=>{
        if(!seatIds || !showId || !userId) return ;

        const lockedSeatsKeys : string =`locked-seats:${showId}`;
        const successfullyLocked: string[] = []; //Tracks seats THIS REQUEST locked successfully.
        const unavailableSeats:string[]=[]; //Tracks seats already locked by others.


        //step 1: Attempt to atomically lock every seat
        for(const seatId of seatIds){
            const seatLockKey = `seat-lock:${showId}:${seatId}`;
           
            // Atomic check-and-set: EX = 300 seconds
            const acquired = await redis.set(
                seatLockKey, 
                userId,
                "EX", //expiry after 300 seconds
                300,
                "NX"  // Only set if key DOES NOT already exist
            );

            if (acquired === "OK") {
                successfullyLocked.push(seatId);
            }
            else {
                unavailableSeats.push(seatId);
            } 
        }


        //step 2 ->If any seat already locked → reject request
        if(successfullyLocked.length === 0){
            socket.emit("seat-locked-failed",{
                showId,
                requested: seatIds,
                alreadyLocked: unavailableSeats,
            });
            
           
            if(typeof callback === "function"){
                callback({
                    success:false,
                    alreadyLocked: unavailableSeats,
                });
            }
            return;
        }


        // Step 3: All seats were successfully and atomically locked. 
        // Now safely add them to the Redis SET for initial layout loads.
        if (successfullyLocked.length > 0) {
            await redis.sadd(lockedSeatsKeys, ...successfullyLocked);
        }

        //STEP 4: Broadcast seat lock to everyone in the show
        io.to(showId).emit("seat-locked",{
            showId,
            seatIds,
            userId,
        })

        // Tell the frontend it succeeded -> and now we can navigate to checkout page
        if (typeof callback === "function") {
            callback({ success: true });  
        }

        console.log(`✅ ${userId} locked seats:`, seatIds);

    });




    /**
   * UNLOCK SEATS
   * 
   * Triggered when:
   * - User leaves checkout
   * - User cancels booking
   */

    socket.on("unlock-seats",async({showId,seatIds,userId})=>{
        if(!showId  || !seatIds?.length) return ;

        const lockedSeatsKeys : string =`locked-seats:${showId}`;

        for(const seatId of seatIds){
            const seatLockKey = `seat-lock:${showId}:${seatId}`;

            //remove individual seat lock 
            await redis.del(seatLockKey);

            //remove seat from locked set
            await redis.srem(lockedSeatsKeys,seatId);

        }

        //notify all clients that seats are unlocked
        io.to(showId).emit("seat-unlocked",{
            showId,
            seatIds,
            userId,
        });

        console.log(`🔓 ${userId} unlocked seats:`, seatIds);

    });


    //Socket Disconnect
    
    // We don't manually unlock seats here
    // Redis TTL will automatically release them after 5 minutes

    socket.on("disconnect",()=>{
        const showId=socket.data.showId;
        console.log(`❌ Socket ${socket.id} disconnected from show ${showId}`);
    })

}