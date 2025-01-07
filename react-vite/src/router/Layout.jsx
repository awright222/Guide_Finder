import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navigation from "../components/Navigation/Navigation";
import * as sessionActions from "../redux/session";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log("Restoring user...");
    dispatch(sessionActions.restoreUser())
      .then(() => {
        console.log("User restored");
        setIsLoaded(true);
      })
      .catch(err => console.error("Error restoring user:", err));
  }, [dispatch]);
  

  return (
    <>
      <Navigation />
      {isLoaded && <div style={{ minHeight: '100vh' }}><Outlet /></div>}

    </>
  );
}