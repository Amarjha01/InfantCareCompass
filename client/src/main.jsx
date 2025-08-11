import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.jsx";
import { Provider } from 'react-redux';
import { store } from './store/store.jsx';
import CustomCursor from "./components/CustomCursor.jsx";
import Loader from "./components/Loader.jsx";
import { useState, useEffect } from "react";

// Polyfill for global in browser environment
if (typeof global === 'undefined') {
    window.global = window;
}

// Development helper: Reset loader for testing
if (import.meta.env.DEV) {
  window.resetLoader = () => {
    window.location.reload();
  };
}

const AppWithLoader = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Show loader on every page refresh/load
    setShowLoader(true);
  }, []);

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  if (showLoader) {
    return <Loader onComplete={handleLoaderComplete} />;
  }

  return (
    
    <Provider store={store}>
      <RouterProvider router={router} />
      <CustomCursor />
    </Provider>
  );
};

createRoot(document.getElementById("root")).render(<AppWithLoader />);
