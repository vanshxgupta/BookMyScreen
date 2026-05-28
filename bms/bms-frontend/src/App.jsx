import { Route, Routes } from "react-router-dom";
import Header from "./components/shared/Header.jsx";
import Footer from "./components/shared/Footer.jsx";
import Home from "./pages/Home.jsx";
import Movies from "./pages/Movies.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import Profile from "./pages/Profile.jsx";
import SeatLayout from "./pages/SeatLayout.jsx";
import { useMatch } from "react-router-dom";
import Checkout from "./pages/Checkout.jsx";
import { Toaster } from "react-hot-toast";
import { useLoadUser } from "./hooks/useLoadUser.js";
import FullScreenLoader from "./components/shared/FullScreenLoader.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { auth }  = useAuth();
  return auth ? <Outlet /> : <Navigate to="/" replace />;
}

function App() {

  const {isLoading} =useLoadUser();

  // Hide header/footer only on seat layout page
  const isSeatLayoutPage = useMatch(
    "/movies/:movieId/:movieName/:state/theatre/:theatreId/show/:showId/seat-layout"
  );

  const isCheckoutPage= useMatch("/shows/:showId/:state/checkout")

  return (
    <>
    <Toaster 
        position="top-right"
        toastOptions={{
          style : {
            fontSize : "14px",
          }
        }}
      />
      
      <div className="flex flex-col min-h-screen">
        {!isSeatLayoutPage && !isCheckoutPage && <Header/>}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:state/:movieName/:movieid/ticket" element={<MovieDetails />} />
            <Route path="/shows/:showId/:state/checkout" element={<Checkout/>} />
            
            <Route element={<PrivateRoute/>}>
            <Route path="/movies/:movieId/:movieName/:state/theatre/:theatreId/show/:showId/seat-layout" element={<SeatLayout />} />
            <Route path="/profile/:id/:tab" element={<Profile />} />
            </Route>
          </Routes>
        </main>
        {!isSeatLayoutPage && !isCheckoutPage && <Footer />}
      </div>
    </>
  );
}

export default App;
