import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home";
import About from "../pages/About";
import Blog from "../pages/Blog";
import ContactUs from "../pages/ContactUs";
import News from "../pages/News";
import Contributors from "../pages/Contributors";
import VideoRoom from "../pages/VideoRoom";
import Signin from "../pages/SignIn";
import Registration from "../pages/Registration";
import NotFoundPage from "../pages/NotFoundPage";
import CareCoPilot from "../pages/CareCoPilot";
import VaccineReminder from "../pages/VaccineReminder";
import DoctorDetails from "../pages/DoctorDetails";
import LearningHub from "../pages/LearningHub";
import ConsultationPage from "../pages/consult";

// This file defines the routing for a React application using react-router-dom.
// It imports all the necessary components (pages) and creates a browser router.

// The `createBrowserRouter` function creates a router instance.
// The configuration is an array of route objects.
const router = createBrowserRouter([
  {
    // The main path '/' is a layout route for the entire application.
    // It renders the <App /> component which likely contains shared layout elements like a header and footer.
    path: "/",
    element: <App />,
    children: [
      {
        // This is the default child route for the main path, rendering the <HomePage />.
        path: "",
        element: <HomePage />,
      },
      {
        // The /about route renders the <About /> page.
        path: "about",
        element: <About />,
      },
      {
        // The /blog route renders the <Blog /> page.
        path: "blog",
        element: <Blog />,
      },
      {
        // The /contactus route renders the <ContactUs /> page.
        path: "contactus",
        element: <ContactUs />,
      },
      {
        // The /news route renders the <News /> page.
        path: "news",
        element: <News />,
      },
      {
        // The /contributors route renders the <Contributors /> page.
        path: "contributors",
        element: <Contributors />,
      },
      {
        // The /consultation route is a parent route that renders the <ConsultationPage />.
        path: "consultation",
        element: <ConsultationPage />,
        children: [
          {
            // This is a nested route under /consultation that takes a dynamic parameter ':id'
            // and renders the <DoctorDetails /> page.
            path: "doctordetail/:id",
            element: <DoctorDetails />,
          },
        ],
      },
      {
        // The /learning-hub route renders the <LearningHub /> page.
        path: "learning-hub",
        element: <LearningHub />,
      },
      {
        // The /vaccineReminder route renders the <VaccineReminder /> page.
        path: "vaccineReminder",
        element: <VaccineReminder />,
      },
      {
        // The /care-co-pilot route renders the <CareCoPilot /> page.
        path: "care-co-pilot",
        element: <CareCoPilot />,
      },
      {
        // This is a catch-all route for any undefined paths, rendering a <NotFoundPage />.
        // The `handle: { noLayout: true }` is a custom handle that might be used by a parent
        // layout component to determine if it should render the main layout or not.
        path: "*",
        element: <NotFoundPage />,
        handle: { noLayout: true },
      },
    ],
  },
  {
    // These are top-level routes that do not share the main <App /> layout.
    // They are siblings to the main path.
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    // This is a dynamic route for a video room that takes a ':roomId' parameter.
    path: "room/:roomId",
    element: <VideoRoom />,
  },
]);

// The router configuration is exported as the default export.
export default router;
