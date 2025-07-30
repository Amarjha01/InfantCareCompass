import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.jsx";
import { Provider } from 'react-redux';
import { store } from './store/store.jsx';
import CustomCursor from "./components/CustomCursor.jsx";

// Polyfill for global in browser environment
if (typeof global === 'undefined') {
    window.global = window;
}

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <CustomCursor />
  </Provider>
);
