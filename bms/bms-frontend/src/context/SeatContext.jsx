import {createContext, useContext, useState } from "react";

const SeatContext=createContext(); //Creates a global context container.

export const SeatContextProvider =({ children })=>{

    const [shows,setShows]=useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);

    return (
    <SeatContext.Provider
        value={{
            shows,
            setShows,
            selectedSeats,
            setSelectedSeats
        }}
    > {children}</SeatContext.Provider>
    )

}


//custom hook
export const useSeatContext=()=>useContext(SeatContext);