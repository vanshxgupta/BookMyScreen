import React, { useEffect ,useState} from 'react'
import Header from '../components/seat-layout/Header.jsx';
import Footer from '../components/seat-layout/Footer.jsx';
import { useParams } from 'react-router-dom';
import { useQuery , keepPreviousData } from '@tanstack/react-query';
import { getShowById } from '../apis';
import screenImg from "../assets/screen.png";
import { uselocation } from '../context/LocationContext.jsx';
import { useSeatContext } from '../context/SeatContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

import { socket } from '../utils/socket.js';

const Seat = ({ seat, row, selectedSeats, lockedSeats , onClick }) => {
  const seatId = `${row}${seat.number}`;
  const isLocked = lockedSeats?.includes(seatId);
  const isSelected = selectedSeats?.includes(seatId);

   return (
    <button
      className={`w-9 h-9 m-[2px] rounded-lg border text-sm
        ${
          seat.status === "BOOKED"
            ? "bg-gray-100 border-red-200 text-red-400 cursor-not-allowed"
            : isLocked
            ? "bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed"
            : isSelected
            ? "bg-[#6e52fa] text-white border-[#cec4f7] border-3 cursor-pointer"
            : "hover:bg-gray-100 border-black cursor-pointer"
        }`}
      disabled={seat.status === "BOOKED" || isLocked}
      onClick={onClick}
    >
      {seat.status === "BOOKED" || isLocked ? "X" : seat.number}
    </button>
  );
};

const SeatLayout = () => {
    const { user } = useAuth();
    const [lockedSeats, setLockedSeats] = useState(); 
    const {selectedSeats,setSelectedSeats}=useSeatContext();
    const { location } = uselocation();

    const handleSelectSeat = (row, number) => {
      const seatId = `${row}${number}`;
      console.log(seatId);

      setSelectedSeats((prev) => 
      prev.includes(seatId) ? prev.filter((existingId) => existingId !== seatId) : [...prev, seatId])
      // Toggles seat selection by adding the seat if not selected
      // and removing it if the seat is already selected.
  
      console.log(selectedSeats)
    }


    const { showId } = useParams();

    const {
        data: showData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["show", showId],
        queryFn: async () => await getShowById(showId),
        placeholderData: keepPreviousData,
        enabled: !!showId,
        select: (res) => res.data,
    });

    // console.log(showData);

    const isSelectedSeats = selectedSeats.length > 0;



  // socket.io code start

  useEffect(()=>{
    setSelectedSeats([]);
    // send show id to backend
    socket.emit("join-show",{showId}); 
    
    //recieve the locked seats status from backend, to display it on frontend
    socket.on("locked-seats-initials", ({seatIds}) => {
      setLockedSeats(seatIds);
    })


    //Listen when new seats get locked
    //This runs when ANY user successfully locks seats.
    socket.on("seat-locked", ({seatIds, showId: incommingShowId, userId: lockingUserId}) => {
      if(incommingShowId !== showId) return;

      setLockedSeats((prev) => [...new Set([...prev, ...seatIds])]); // old +new locked seats 
      

      //this code is important , 
      // suppose , one users selects E5, E6 , and user B selects ,E5,E7 , and user A PROCEEDS FIRST,
      //  tooh E5,56 TOOH book ho jayegi , aur userB jo hai ,vo select nahi kr payega ,E5 ab ,
      //  par user B E7 bhi proceed nahi kar payega kyunnki uske array mai abhi bhi E5 present 
      // hai which is creating this issue that "Selected Seats are already selected " , but iss code ke baad esa nahi hoga 
       //Remove seats only for OTHER users
      if(user && lockingUserId !== user._id){
        setSelectedSeats((prevSelected) =>
          prevSelected.filter(
            (seatId) => !seatIds.includes(seatId)
          )
        );
      }

    })

    //Listen when seats get unlocked
      socket.on("seat-unlocked", ({seatIds, showId:incommingShowId}) => {
      if(incommingShowId !== showId) return;

      setLockedSeats((prev) => prev.filter((id) => !seatIds.includes(id)));
    })


    //RACE CONDITIONS
    //Suppose 2 users click same seat simultaneously -> then show the failed notification to one of the user 
    socket.on("seat-locked-failed", ({
      showId,
      requested: seatIds,
      alreadyLocked,}) => {
      toast.error('Some seats are already locked')
    })

    }, [showId,user]); // runs everytime showid changes or user changes
    
    console.log("lockedSeats",lockedSeats);
    
    // socket.io code ends
    

    return (
    <>
      <div className="h-screen overflow-y-hidden">
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 w-full z-10">
          <Header showData={showData} />
        </div>
        {/* Scrollable Seat Layout */}
         <div className="max-w-7xl mx-auto mt-[210px] px-6 pb-4 bg-white h-[calc(100vh-320px)] overflow-y-scroll scrollbar-hide">
          <div className="flex flex-col items-center justify-center">
            {showData?.data?.seatLayout && (
              <div className="flex flex-col items-center justify-center">
                {Object.entries(
                  showData.data.seatLayout.reduce((acc, curr) => {
                    if (!acc[curr.type])
                    acc[curr.type] = { price: curr.price, rows: [] };
                    acc[curr.type].rows.push(curr);
                    return acc;
                  }, {})
                ).map(([type, { price, rows }]) => (
                  <div
                    key={type}
                    className="mb-12 w-full flex flex-col items-center justify-center"
                  >
                    <h2 className="text-center font-semibold text-lg mb-4">
                      {type} : ₹{price}
                    </h2>
                    <div className="space-y-2">
                      {rows.map((rowObj) => (
                        <div key={rowObj.row} className="flex items-center">
                          <div className="w-6 text-right mr-2 text-sm text-gray-600">
                            {rowObj.row}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {rowObj.seats.map((seat, i) => (
                              <Seat
                                key={i}
                                seat={seat}
                                row={rowObj.row}
                                selectedSeats={selectedSeats}
                                lockedSeats={lockedSeats}
                                onClick={() => handleSelectSeat(rowObj.row, seat.number)}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-center mt-5">
              <img
                src={screenImg} // or "/screen.png" if in public
                alt="Screen"
                className="w-[300px] md:w-[400px] object-contain opacity-80"
              />
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="fixed bottom-0 left-0 w-full h-[100px] bg-white border-t border-gray-200 py-4 px-4 z-10">
          <Footer isSelected={isSelectedSeats} selectedSeats={selectedSeats} showData={showData} state={location}  />
        </div>
      </div>
    </>
  );
};

export default SeatLayout;