import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import chargerData from "./data/charger.json";
import "./App.css";

function App() {
  const filteredChargerData = chargerData.filter(charger => charger.address.country === "United Kingdom")

  return (
    <MapContainer center={[51.0, 19.0]} zoom={4} maxZoom={18}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      <MarkerClusterGroup>
        {filteredChargerData.map((charger) => (
          <Marker key={charger.id} position={[charger.gps.latitude, charger.gps.longitude]} >
            <Popup>
              {charger.name}
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

export default App;
