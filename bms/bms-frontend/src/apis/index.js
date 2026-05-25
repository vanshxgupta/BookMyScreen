import { axiosWrapper } from "./axiosWrapper";

//list all the endpoints 
export const getRecommendedMovies=()=> axiosWrapper.get("/movies/recommended");
export const getAllMovies=()=>axiosWrapper.get("/movies");
export const getMovieById=(data)=>axiosWrapper.get(`/movies/${data}`);
export const getShowsByMovieAndLocation=(movieId,state,date)=>axiosWrapper.get("/shows",{
    params:{
        movieId,
        state,
        date
    }
})
    
export const getShowById = (data)=> axiosWrapper.get(`/shows/${data}`);


//auth Apis
export const sendOTP=(data)=>axiosWrapper.post("/auth/send-otp",data);
export const verifyOTP=(data)=>axiosWrapper.post("/auth/verify-otp",data);
export const activate = ({id,...data})=>axiosWrapper.put(`/users/activate/${id}`,data);
export const logout = () => axiosWrapper.post("/auth/logout");
export const getUser = () => axiosWrapper.get("/users/me");


//Interceptor 
// When access token expires backend returns 401 Unauthorized
// This interceptor - >Calls /auth/refresh-token ,Gets new tokens , Retries the original API request automatically
// So user stays logged in without noticing anything.

axiosWrapper.interceptors.response.use( // Runs after every API response
  (config) => { // success then just return response
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(originalRequest);
    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry //Prevents infinite loop.
       &&
      !originalRequest.url.includes("/auth/refresh-token")
    ) {
      originalRequest._isRetry = true;

      try {
        await axiosWrapper.get("/auth/refresh-token");
        console.log("INTERCEPTOR")
        return axiosWrapper.request(originalRequest);
      } catch (error) {
        console.log("Error while refreshing the token", error);
      }
    }

    throw error;
  },
);
