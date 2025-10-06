import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.jsx";
import { Provider } from 'react-redux';
import { store } from './store/store.jsx';
import MagicCursorTrail from "./components/magiccursortrail.jsx"
import Loader from "./components/Loader.jsx";
import { useState, useEffect } from "react";
import './i18n';

// Ensure initial theme is applied before React mounts to avoid flashes
(function applyInitialTheme() {
  try {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    if (shouldUseDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (_) {
    // no-op
  }
})();

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
      <MagicCursorTrail />
    </Provider>
  );
};

createRoot(document.getElementById("root")).render(<AppWithLoader />);
