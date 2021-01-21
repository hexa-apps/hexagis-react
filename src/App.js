import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup } from "react-leaflet";
// import { EditControl } from "react-leaflet-draw";
import CustomEditControl from "./components/CustomEditControl"
import MarkerClusterGroup from "react-leaflet-markercluster";
import chargerData from "./data/charger.json";
import "./App.css";
import "leaflet-draw/dist/leaflet.draw.css";

function App() {
  const filteredChargerData = chargerData.filter(charger => charger.address.country === "United Kingdom")
  const [mapLayers, setMapLayers] = useState([])

  const _onCreated = (e) => {
    // console.log(e)
    const { layerType, layer } = e;
    if (layerType === "polygon") {
      const { _leaflet_id } = layer;
      setMapLayers((layers) => [...layers, { id: _leaflet_id, latlngs: layer.getLatLngs()[0] }])
    }
    console.log("created")

  }

  const _onEdited = (e) => {
    // console.log(e)
    const { layers: { _layers } } = e;
    Object.values(_layers).map(({ _leaflet_id, editing }) => {
      setMapLayers((layers) =>
        layers.map((a) => a.id === _leaflet_id
          ? { ...a, latlngs: { ...editing.latlngs[0] } }
          : a)
      );
    });
    console.log("edited")
  };

  const _onDeleted = (e) => {
    // console.log(e)
    const { layers: { _layers } } = e;
    Object.values(_layers).map((_leaflet_id) => {
      setMapLayers(layers => layers.filter(l => l.id !== _leaflet_id))
    });
    console.log("deleted")

  }

  return (
    <div>
      <MapContainer center={[51.0, 19.0]} zoom={4} maxZoom={18}>
        <FeatureGroup>
          <CustomEditControl
            position="topleft"
            onCreated={_onCreated}
            onEdited={_onEdited}
            onDeleted={_onDeleted}
            draw={{
              rectangle: false,
              polyline: false,
              circle: false,
              circlemarker: false,
              marker: true
            }}
          />
        </FeatureGroup>
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
      {console.log(JSON.stringify(mapLayers, 0, 2))}
    </div>
  );
}

export default App;
