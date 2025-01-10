import { createBrowserRouter } from "react-router-dom";
import Layout from './Layout'; 
import LandingPage from "../components/LandingPage";
import UserHomePage from "../components/UserHomePage"; 
// Import other components as needed

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Use Layout as the main layout
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "user-home",
        element: <UserHomePage />,
      },
      // Add other routes here
    ],
  },
]);

export { router };