import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { City } from '../types';
import L from 'leaflet';

// Fix for default marker icon issue with webpack
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import WeatherInfo from './WeatherInfo';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;


interface MapProps {
  selectedCity: City | null;
}


const ChangeView: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const Map: React.FC<MapProps> = ({ selectedCity }) => {
  const position: [number, number] = selectedCity
    ? [selectedCity.latitude, selectedCity.longitude]
    : [20, 0];

  return (
    <MapContainer
      center={position}
      zoom={selectedCity ? 9 : 2}
      className="w-full h-full z-10"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // @ts-ignore
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {selectedCity && (
        <>
          <ChangeView center={position} zoom={9} />
          <Marker position={position}>
            <Popup>
              <WeatherInfo city={selectedCity} />
            </Popup>
          </Marker>
        </>
      )}
    </MapContainer>
  );
};

export default Map;