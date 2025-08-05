import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import Blog from "../pages/Blog";
import ContactUs from "../pages/ContactUs";
import News from "../pages/News";
import DoctorDetails from "../pages/DoctorDetails";
import Registration from "../pages/Registration";
import Signin from "../pages/SignIn";
import HomePage from "../pages/Home";
import ConsultationPage from "../pages/consult.jsx";
import VideoRoom from "../pages/VideoRoom.jsx";
import PersonalizedLearningHub from "../pages/LearningHub.jsx";
import VaccineReminder from "../pages/VaccineReminder.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import Contributors from "../pages/Contributors";
import BabyFeeder from "../components/BabyFeeder";
import Sleeper from "../components/Sleeper";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "contactus",
        element: <ContactUs />,
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "contributors",
        element: <Contributors />,
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
        path: "learning-hub",
        element: <PersonalizedLearningHub />,
      },
      {
        path: "vaccineReminder",
        element: <VaccineReminder />,
      },
      {
        path: "babyfeeder",
        element: <BabyFeeder />,
      },
      {
        path: "sleeper",
        element: <Sleeper />,
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
    path: "room/:roomId",
    element: <VideoRoom />, // Route for VideoCall component
  },
  {
        path: "*",
        element: <NotFoundPage />,
        handle: { noLayout: true },
      },
]);

export default router;
