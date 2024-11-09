import { NavigationControl, FullscreenControl, ScaleControl, GeolocateControl } from "react-map-gl";

const MapControls = () => (
  <>
    <div className="absolute top-2 left-2 z-10">
      <NavigationControl />
    </div>
    <div className="absolute top-2 left-14 z-10">
      <FullscreenControl />
    </div>
    <div className="absolute bottom-8 left-2 z-10">
      <ScaleControl />
    </div>
    <div className="absolute top-2 right-2 z-10">
      <GeolocateControl />
    </div>
  </>
);

export default MapControls;
