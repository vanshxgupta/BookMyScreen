import Redis from "ioredis";
import { config } from "./config";

const redis=new Redis({
    host:config.redisHost,
    port:config.redisPort,
    retryStrategy: ()=>5000 
    // If Redis connection fails, ioredis waits 5000ms (5 sec) before reconnecting.

})

redis.on("error",(err)=>{
    console.log("[Redis error:]",err);
});


redis.on("connect",()=>{
    console.log("[Redis] Connected Successfully");
});

export default redis;