import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { LocationProvider } from "./context/LocationContext.jsx";
import { QueryClientProvider,QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SeatContextProvider } from "./context/SeatContext.jsx";
import "./index.css";
import App from "./App.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      statleTime:10000, //refetch data if the data is older than 10 seconds
    }
  }
});


createRoot(document.getElementById("root")).render(
  
    <Router>
      <QueryClientProvider client={queryClient}>
        <LocationProvider>
          <AuthProvider>
            <SeatContextProvider>
              <App />
            </SeatContextProvider>
          </AuthProvider>
        </LocationProvider>
      </QueryClientProvider>
    </Router>
);
