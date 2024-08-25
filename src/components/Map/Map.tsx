import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  lat: number;
  lon: number;
  zoom?: number;
}

const MapComponent: React.FC<MapProps> = ({ lat, lon, zoom = 13 }) => {
  useEffect(() => {
    // Check if the map has already been initialized
    let map = L.map('map').setView([lat, lon], zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([lat, lon]).addTo(map)
      .bindPopup('Location here!')
      .openPopup();

    // Cleanup function to remove the map when the component unmounts
    return () => {
      map.remove();
    };
  }, [lat, lon, zoom]);

  return <div id="map" style={{ height: '500px', width: '100%' }}></div>;
};

export default MapComponent;
