// components/Map.tsx
import React from "react";
import { Icon } from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  location: {
    x: number;
    y: number;
  };
}

const Map: React.FC<MapProps> = ({ location }) => {
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/14831/14831599.png",
    iconSize: [38, 38],
  });

  return (
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
  );
};

export default Map;
