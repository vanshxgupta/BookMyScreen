import axios from 'axios';

const defaultHeader={
    "Content-Type": "application/json", // tells backend , that i am sending json data 
    Accept:"application/json", // accepts json data from backend
};

export const axiosWrapper=axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    //allows the browser to send:
    // cookies
    // authentication tokens
    // session data

    headers:{...defaultHeader}
})