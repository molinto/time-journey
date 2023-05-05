"use client";

import {
  GoogleMap,
  Marker,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { useMemo, useState } from "react";
import ExpandIcon from "./icons/ExpandIcon";
import CollapseIcon from "./icons/CollapseIcon";

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!,
  });
  const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);
  const [expandMap, setExpandMap] = useState(false);
  const [userMarker, setUserMarker] =
    useState<google.maps.LatLngLiteral | null>(null);
  const toggleMapSize = () => {
    setExpandMap(!expandMap);
  };

  const handlMapClick = (e: google.maps.MapMouseEvent) => {
    // console.log(e.latLng?.toString());
    if (!e.latLng) return;
    setUserMarker({
      lat: e.latLng?.lat(),
      lng: e.latLng?.lng(),
    });
    console.log(userMarker);
  };

  return (
    <div className="relative bg-red-200">
      <button className="absolute left-2 top-2 z-30" onClick={toggleMapSize}>
        <div className="rounded-sm bg-slate-100 p-0.5">
          {expandMap ? <CollapseIcon /> : <ExpandIcon />}
        </div>
      </button>
      <div
        className={`transition-all duration-300 ${
          expandMap ? "h-[800px] w-[800px]" : "h-[400px] w-[400px]"
        }`}
      >
        {/* {userMarker ? userMarker.lat.toString() : ""} */}
        {/* <div className="h-full w-full bg-green-300"></div> */}
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            mapContainerClassName="w-full h-full"
            center={center}
            zoom={1}
            onClick={handlMapClick}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              zoomControl: false,
              fullscreenControl: false,
              draggableCursor: "crosshair",
              draggingCursor: null,
            }}
          >
            {userMarker ? <MarkerF position={userMarker} /> : null}
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default Map;
