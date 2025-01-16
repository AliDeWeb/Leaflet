// components/Map.tsx
import React from "react";
import { Icon } from "leaflet";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  location: {
    x: number;
    y: number;
  };
}

const ChangeMapView: React.FC<MapProps> = ({ location }) => {
  const map = useMap();

  React.useEffect(() => {
    if (location.x !== 0 && location.y !== 0) {
      map.setView([location.x, location.y], 13);
    }
  }, [location, map]);

  return null;
};

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
      <Marker position={[location.x, location.y]} icon={customIcon}>
        <Popup>
          <h2>You are here ;)</h2>
        </Popup>
      </Marker>
      <ChangeMapView location={location} />
    </MapContainer>
  );
};

export default Map;
