import { use, useContext,createContext } from "react";
import { useState ,useEffect} from "react";

const LocationContext = createContext()

export const LocationProvider = ({children}) => {

    const [location,setLocation] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(() => {

        const fetchlocationdata = async (latitude,longitude) => {

            try {
                const res= await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                )
                
                const data=await res.json();
                const userlocation=data?.address?.state;
                setLocation(userlocation);
                console.log("Fetched location data:", data);

            } catch (error) {
                console.log("Error fetching location data:", error);
                setError("Failed to fetch location data");
            }
            finally{
                setLoading(false);
            }
        }


        // logic to fetch and set location
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                const {latitude,longitude} = position.coords;
                
                fetchlocationdata(latitude,longitude);
            },
            ()=>{
                console.log("Location access denied by user.");
                setError("Unable to retrieve location");
                setLoading(false);
            } //If we deny the location access, then this error callback will be called
        )


    },[])// run only once

    return (
        <LocationContext.Provider value={{location,loading,error}}>
            {children}
        </LocationContext.Provider>
    )
}

export const uselocation = () =>useContext(LocationContext); 
// uselocation is now a custom hook that can be used in any component to access location data, loading state and error state from the LocationContext.