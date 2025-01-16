"use client";

import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

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

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/14831/14831599.png",
    iconSize: [38, 38],
  });

  React.useEffect(() => {
    MySwal.fire({
      title: <p>Hello World</p>,
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
          timeout: 6000,
          enableHighAccuracy: true,
        }
      );
    });
  }, []);

  React.useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <div className="h-dvh items-center justify-center flex text-3xl text-white">
      {access ? (
        <MapContainer
          center={[36.2688, 50.0041]}
          zoom={13}
          style={{ height: "100vh", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[location.x, location.y]} icon={customIcon} />
        </MapContainer>
      ) : (
        <p>Not Allowed</p>
      )}
    </div>
  );
}
