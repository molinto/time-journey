import { useLoadScript } from "@react-google-maps/api";
import GMap from "./GMap";

const MapContainer = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!,
  });
  return !isLoaded ? <div className="">Loading</div> : <GMap />;
};

export default MapContainer;
