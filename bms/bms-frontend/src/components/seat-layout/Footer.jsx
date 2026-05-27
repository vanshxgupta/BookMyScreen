import React from "react";
import { useNavigate } from "react-router-dom";
import { useSeatContext } from "../../context/SeatContext";
import { socket } from "../../utils/socket";
import { useAuth } from "../../context/AuthContext";
import {toast} from "react-hot-toast";

const Footer = ({isSelected,selectedSeats,showData,state}) => {
  const navigate = useNavigate();
  const { setShows } = useSeatContext();
  const { user } = useAuth();

   const handleNavigateToCheckout = () => {
    // send lock request to socket.io server
    socket.emit("lock-seats", {
      showId: showData?.data?._id,
      seatIds: selectedSeats,
      userId: user._id
    },(response)=>{    // This is Socket.IO ACK callback.

    // Only navigate if the backend confirms the lock was successful
    if (response && response.success) {
      navigate(`/shows/${showData?.data?._id}/${state}/checkout`);
      setShows(showData.data);
    }
    else{
      // The backend rejected it. 
      // (Your existing toast in SeatLayout will handle the error message)
      toast.error("Seats are already locked by someone else!");
      console.log("Navigation prevented: Seats were already locked.");
    }
  });
}

  return (
    <>
      {isSelected ? (
        <div className="bg-white py-3 px-6 flex items-center justify-between z-10">
            <p className="text-gray-700 font-medium text-base">
                {selectedSeats.length} Seat{selectedSeats.length !== 1 ? 's' : ''} Selected
            </p>
            <button
             onClick={handleNavigateToCheckout} 
             className="bg-black cursor-pointer text-white px-6 py-2 rounded-lg font-semibold">
              Proceed
            </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-xs font-bold text-purple-600 tracking-wider">
            SCREEN THIS WAY
          </p>
          <div className="flex gap-4 text-xs mt-3">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border rounded-[4px]"></div>
              <p>Available</p>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-200 border rounded-[4px] flex items-center justify-center">
                <small className="-mt-1">x</small>
              </div>
              Occupied
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-purple-600 rounded-[4px]"></div>
              Selected
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;