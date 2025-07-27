if (typeof global === 'undefined') {
    window.global = window;
}


import { createRoot } from "react-dom/client";
import "./index.css"; // Global styles
import { RouterProvider } from "react-router-dom"; // Correct import for RouterProvider
import router from "./routes/routes.jsx"; // Import your routes
import { Provider } from 'react-redux';
import { store } from './store/store.jsx'
import { Toaster } from "react-hot-toast";
import { checkAuth } from "../../server/controller/user/checkAuth.js";

createRoot(document.getElementById("root")).render(

    <Provider store={store}>
        <RouterProvider router={router} /> {/* Provides the router configuration */}
        <Toaster position="top-center" />
    </Provider>

);
