import React, { useState, useEffect } from "react";

export default function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const { state } = await navigator.permissions.query({
          name: "geolocation",
        });

        if (state === "granted") {
          fetchLocation();
        } else if (state === "prompt") {
          await navigator.geolocation.getCurrentPosition(
            (position) => {
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);
            },
            (error) => {
              console.error("Error fetching geolocation:", error);
            }
          );
        } else {
          console.error("Location permission denied.");
        }
      } catch (error) {
        console.error("Error requesting location permission:", error);
      }
    };

    requestLocationPermission();
  }, []);

  const fetchLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error("Error fetching geolocation:", error);
      }
    );
  };

  return (
    <div>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
    </div>
  );
}
