import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navigation from "../components/Navigation/Navigation";
import * as sessionActions from "../redux/session";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .unwrap()
      .then((user) => {
        if (user === null) {
          console.log("No token found, user not logged in.");
        } else {
          console.log("User restored successfully");
        }
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error("Error restoring user:", err);
        setError("Failed to restore session.");
        setIsLoaded(true);
      });
  }, [dispatch]);

  return (
    <>
      <Navigation />
      {isLoaded ? (
        error ? (
          <div style={{ minHeight: '100vh', textAlign: 'center', padding: '2rem' }}>
            <p>{error}</p>
          </div>
        ) : (
          <div style={{ minHeight: '100vh' }}>
            <Outlet />
          </div>
        )
      ) : (
        <div style={{ minHeight: '100vh', textAlign: 'center', padding: '2rem' }}>
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}