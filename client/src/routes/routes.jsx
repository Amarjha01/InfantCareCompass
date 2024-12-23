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
import ConsultationPage from "../pages/consult";

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
        path: "consultation",
        element: <ConsultationPage />,
        children: [
          {
            path: "doctordetail/:id",
            element: <DoctorDetails />,
          },
        ],
      }
      
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
]);

export default router;