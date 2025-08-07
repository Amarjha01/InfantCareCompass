import App from "../App";
import { createBrowserRouter } from 'react-router-dom';
import HomePage from "../pages/Home";
import About  from  "../pages/About";
import Blog  from  "../pages/Blog";
import ContactUs  from  "../pages/ContactUs";
import News from  "../pages/News";
import Contributors  from  "../pages/Contributors";
import VideoRoom from  "../pages/VideoRoom";
import Signin from  "../pages/SignIn";
import Registration from  "../pages/Registration";
import NotFoundPage from  "../pages/NotFoundPage";
import CareCoPilot from  "../pages/CareCoPilot";
import VaccineReminder from  "../pages/VaccineReminder";
import PersonalisedLearningHub from  "../pages/LearningHub";
import DoctorDetails from  "../pages/DoctorDetails";
import LearningHub from "../pages/LearningHub";
import ConsultationPage from  "../pages/consult";

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
        element: <LearningHub />,
      },
      {
        path: "vaccineReminder",
        element: <VaccineReminder />,
      },
      {
        path: "care-co-pilot",
        element: <CareCoPilot />,
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
    element: <VideoRoom />,
  },
]);
export default router;