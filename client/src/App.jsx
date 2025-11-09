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
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from "./contexts/ThemeContext";
import MagicCursorTrail from "./components/magiccursortrail.jsx";
import commnApiEndpoint from "./common/backendAPI.jsx";

function App() {
  const matches = useMatches();
  const hideLayout = matches.some((match) => match.handle?.noLayout);
  const dispatch = useDispatch();

  useEffect(() => {
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
    } else if (token && !userData) {
      // Try to fetch user info from backend if token exists but userData is missing
      fetch(commnApiEndpoint.getUserInfo.url, {
        method: commnApiEndpoint.getUserInfo.method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data) {
            localStorage.setItem('userData', JSON.stringify(data.data));
            dispatch(setUser(data.data));
          }
        })
        .catch(() => {
          localStorage.removeItem('token');
        });
    }
  }, [dispatch]);

  return (
    <ThemeProvider>
      <div className="w-full min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <MagicCursorTrail />   {/* Custom cursor trail animation effect */}
        <ScrollRestoration />
        {!hideLayout && <Header />}

        <ScrollToTop />
        <ScrollToBottom />

        <main className="mt-20 bg-white dark:bg-gray-900 transition-colors duration-300">
          <Outlet />
        </main>

        {!hideLayout && <Footer />}

        {/* Toast notifications */}
        <Toaster position="top-right" /> 
      </div>
    </ThemeProvider>
  );
}

export default App;
