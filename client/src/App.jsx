import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet, useMatches } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slices/userSlice.jsx";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToBottom from "./components/ScrollToBottom";
import ScrollRestoration from "./components/ScrollRestoration";
import { Toaster, toast } from 'react-hot-toast';
function App() {
  const matches = useMatches();
  const hideLayout = matches.some((match) => match.handle?.noLayout);
  const dispatch = useDispatch();

  useEffect(() => {
    // Restore user session on app load
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        console.log("Restoring user session:", parsedUserData);
        dispatch(setUser(parsedUserData));
      } catch (error) {
        console.error("Error restoring user session:", error);
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
      }
    }
  }, [dispatch]);

  return (
    <div className="w-full">
      <ScrollRestoration />
      {!hideLayout && <Header />}

      <ScrollToTop />
      <ScrollToBottom />
 

      {/* Main content area */}

      <main className="mt-20">
        <Outlet />
      </main>

      {!hideLayout && <Footer />}
      <ScrollToTop />
      <ScrollToBottom />
      

      {/* Toast notifications */}

      <Toaster position="top-right" /> 
    </div>
  );
}

export default App;
