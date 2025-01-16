"use client";

import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

const MySwal = withReactContent(Swal);

export default function Home() {
  const [access, setAccess] = React.useState<boolean>(false);
  const [location, setLocation] = React.useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });

  React.useEffect(() => {
    MySwal.fire({
      title: <p>By continuing browser will access to your current location</p>,
      confirmButtonText: "Continue",
      showCancelButton: true,
      cancelButtonText: "Cancel",
    }).then((res) => {
      if (!res.isConfirmed) return setAccess(false);
      setAccess(true);

      if (!navigator) return;

      navigator.geolocation.watchPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setLocation({ x: latitude, y: longitude });
        },
        (err) => {
          console.error(err.message);
        },
        {
          maximumAge: 0,
          timeout: 60 * 1000,
          enableHighAccuracy: true,
        }
      );
    });
  }, []);

  return (
    <div className="h-dvh items-center justify-center flex text-3xl text-white">
      {access ? <Map location={location} /> : <p>Not Allowed</p>}
    </div>
  );
}
