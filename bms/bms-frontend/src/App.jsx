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

function App() {

  // Hide header/footer only on seat layout page
  const isSeatLayoutPage = useMatch(
    "/movies/:movieId/:movieName/:state/theatre/:theatreId/show/:showId/seat-layout"
  );

  const isCheckoutPage= useMatch("/shows/:showId/:state/checkout")

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {!isSeatLayoutPage && !isCheckoutPage && <Header/>}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:state/:movieName/:movieid/ticket" element={<MovieDetails />} />
            <Route path="/movies/:movieId/:movieName/:state/theatre/:theatreId/show/:showId/seat-layout" element={<SeatLayout />} />
            <Route path="/shows/:showId/:state/checkout" element={<Checkout/>} />
          </Routes>
        </main>
        {!isSeatLayoutPage && !isCheckoutPage && <Footer />}
      </div>
    </>
  );
}

export default App;
