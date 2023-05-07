"use client";

import {
  GoogleMap,
  Marker,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { useMemo, useRef, useState } from "react";
import ExpandIcon from "./icons/ExpandIcon";
import CollapseIcon from "./icons/CollapseIcon";
import useClickOutside from "./hooks/useClickOutside";

interface MapProps {
  handleMapClick: (e: google.maps.MapMouseEvent) => void;
  userMarker: Coordinates | null;
}

const Map = ({ handleMapClick, userMarker }: MapProps) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!,
  });
  const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);
  const [expandMap, setExpandMap] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const toggleMapSize = () => {
    setExpandMap(!expandMap);
  };

  const collapse = () => setExpandMap(false);

  useClickOutside(mapRef, collapse);

  return (
    <div className="w-full bg-red-200 ">
      <div
        ref={mapRef}
        className={`absolute bottom-4 right-4 flex items-center transition-all duration-300 ${
          expandMap ? "h-[70vh] w-[60vw]" : "h-[400px] w-[400px]"
        }`}
      >
        <button className="absolute left-2 top-2 z-30" onClick={toggleMapSize}>
          <div className="rounded-sm bg-slate-100 p-0.5">
            {expandMap ? <CollapseIcon /> : <ExpandIcon />}
          </div>
        </button>
        {/* <div className="h-full w-full bg-green-300"></div> */}
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            mapContainerClassName="w-full h-full rounded"
            center={center}
            zoom={1.3}
            onClick={handleMapClick}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              zoomControl: false,
              fullscreenControl: false,
              draggableCursor: "crosshair",
              minZoom: 1.5,
              draggingCursor: null,
              restriction: {
                latLngBounds: {
                  north: 85,
                  south: -85,
                  west: -180,
                  east: 180,
                },
              },
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
