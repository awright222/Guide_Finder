import { createBrowserRouter } from "react-router-dom";
import Layout from './Layout'; 
import LandingPage from "../components/LandingPage";
import Partners from "../components/Partners";
import { Services, ServiceDetail } from "../components/services";
import SearchServices from '../components/searchServices';
import DirectMessages from "../components/Messages/DirectMessages";
import CreateService from "../components/services/CreateService";
import AllUserDashboard from "../components/AllUserDashboard";
import UnderConstructionModal from "../components/UnderConstructionModal";

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
        path: "dashboard",
        element: <AllUserDashboard />,
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
        element: (
          <>
            <DirectMessages />
            <UnderConstructionModal /> 
          </>
        ),
      },
      {
        path: "create-service",
        element: <CreateService />,
      },
      {
        path: "partners",
        element: <Partners />,
      },
    ],
  },
]);

export { router };
