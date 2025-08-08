import { createBrowserRouter } from "react-router-dom";
import App from "../App";

// Pages
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
import DoctorDetails from "../pages/DoctorDetails";
import ConsultationPage from "../pages/consult";
import VideoRoom from "../pages/VideoRoom";

// Components
import BabyFeeder from "../components/BabyFeeder";
import Sleeper from "../components/Sleeper";

import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService";
import CookiePolicy from "../pages/CookiePolicy";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> }, // Use index for home
      { path: "about", element: <About /> },
      { path: "blog", element: <Blog /> },
      { path: "contactus", element: <ContactUs /> },
      { path: "news", element: <News /> },
      { path: "contributors", element: <Contributors /> },
      {

        path: "babyfeeder",
        element: <BabyFeeder />,
      },
      {
        path: "sleeper",
        element: <Sleeper />,
      },
      {
        path: "care-co-pilot",
        element: <CareCoPilot />,
      },

        path: "consultation",
        element: <ConsultationPage />,
        children: [
          {
            path: "doctordetail/:id",
            element: <DoctorDetails />,
          },
        ],
      },
      { path: "learning-hub", element: <LearningHub /> },
      { path: "vaccine-reminder", element: <VaccineReminder /> }, // Use kebab-case
      { path: "care-co-pilot", element: <CareCoPilot /> }, // Only ONE instance
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms-of-service", element: <TermsOfService /> },
      { path: "cookie-policy", element: <CookiePolicy /> },

      {
        path: "vaccineReminder",
        element: <VaccineReminder />,
      },
      {
        path: "learning-hub",
        element: <LearningHub />,
      },
      {
        path: "consultation",
        element: <ConsultationPage />,
        children: [
          {
            path: "doctordetail/:id",
            element: <DoctorDetails />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
        handle: { noLayout: true },
      },
    ],
  },

  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/room/:roomId",
    element: <VideoRoom />,
  },

  { path: "/registration", element: <Registration /> },
  { path: "/signin", element: <Signin /> },
  { path: "room/:roomId", element: <VideoRoom /> },

]);

export default router;
