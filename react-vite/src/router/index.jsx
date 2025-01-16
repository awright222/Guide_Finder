import { createBrowserRouter } from "react-router-dom";
import Layout from './Layout'; 
import LandingPage from "../components/LandingPage";
import UserDashboard from "../components/UserDashboard";
import GuideDashboard from "../components/GuideDashboard";
import { Services, ServiceDetail } from "../components/services";
import SearchServices from '../components/searchServices';
import DirectMessages from "../components/Messages/DirectMessages";
import CreateService from "../components/services/CreateService";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "user-dashboard",
        element: <UserDashboard />,
      },
      {
        path: "guide-dashboard",
        element: <GuideDashboard />,
      },
      {
        path: "services", 
        element: <Services />,
      },
      {
        path: "services/:serviceId", 
        element: <ServiceDetail />,
      },
      {
        path: "search-services",
        element: <SearchServices />,
      },
      {
        path: "messages",
        element: <DirectMessages />,
      },
      {
        path: "create-service",
        element: <CreateService />,
      },
    ],
  },
]);

export { router };