"use client";

import {
  GoogleMap,
  MarkerF,
  PolylineF,
  useLoadScript,
} from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ExpandIcon from "./icons/ExpandIcon";
import CollapseIcon from "./icons/CollapseIcon";
import useClickOutside from "./hooks/useClickOutside";
import React from "react";

interface MapProps {
  handleMapClick?: (e: google.maps.MapMouseEvent) => void;
  currentMarker?: Coordinates | null;
  finalMarkers?: {
    userMarker: Coordinates;
    rightMarker: Coordinates;
  };
}

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

const GMap = ({ finalMarkers, handleMapClick, currentMarker }: MapProps) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!,
  });

  const mapRef = useRef<GoogleMap>(null);

  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 18.52043, lng: 73.856743 }),
    []
  );
  const options = useMemo<MapOptions>(
    () => ({
      mapId: "4e2d8b82f27a9603",
      disableDefaultUI: true,
      clickableIcons: false,
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
    }),
    []
  );
  const [expandMap, setExpandMap] = useState(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);

  const onLoad = React.useCallback(
    function callback(map: google.maps.Map) {
      console.log(finalMarkers);
      if (!finalMarkers) return;
      const bounds = new window.google.maps.LatLngBounds(
        finalMarkers.rightMarker
      );
      bounds.extend(finalMarkers.userMarker);

      console.log(bounds);
      map.fitBounds(bounds);
    },
    [finalMarkers]
  );

  const toggleMapSize = () => {
    setExpandMap(!expandMap);
  };

  const collapse = () => setExpandMap(false);

  useClickOutside(mapContainerRef, collapse);

  const lineSymbol = {
    path: "M 0,0 0,1",
    strokOpacity: 1,

    scale: 2,
  };

  return (
    <div className="w-full bg-red-200 ">
      <div
        ref={mapContainerRef}
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
          <div className="">Loading...</div>
        ) : (
          <GoogleMap
            ref={mapRef}
            onLoad={onLoad}
            mapContainerClassName="w-full h-full rounded"
            center={center}
            zoom={1.3}
            onClick={handleMapClick}
            options={options}
          >
            {currentMarker ? (
              <MarkerF
                position={currentMarker}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/blue.png",
                }}
              />
            ) : null}

            {finalMarkers ? (
              <React.Fragment key={finalMarkers.rightMarker.lat.toString()}>
                <MarkerF
                  position={finalMarkers.userMarker}
                  icon={{
                    url: "http://maps.google.com/mapfiles/ms/icons/blue.png",
                  }}
                />
                <MarkerF
                  position={finalMarkers.rightMarker}
                  icon={{
                    url: "http://maps.google.com/mapfiles/ms/icons/red.png",
                  }}
                />
                <PolylineF
                  path={[finalMarkers.rightMarker, finalMarkers.userMarker]}
                  options={{
                    strokeWeight: 0,
                    strokeColor: "red",
                    icons: [
                      {
                        icon: lineSymbol,
                        offset: "0",
                        repeat: "10px",
                      },
                    ],
                  }}
                />
              </React.Fragment>
            ) : null}
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default GMap;
