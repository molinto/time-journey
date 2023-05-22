"use client";

import {
  GoogleMap,
  MarkerF,
  PolylineF,
  useLoadScript,
} from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import Spinner from "./Spinner";

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

  const onLoad = React.useCallback(
    function callback(map: google.maps.Map) {
      if (!finalMarkers) return;

      const bounds = new window.google.maps.LatLngBounds(
        finalMarkers.rightMarker
      );
      bounds.extend(finalMarkers.userMarker);

      map.fitBounds(bounds);
    },
    [finalMarkers]
  );

  const lineSymbol = {
    path: "M 0,0 0,1",
    scale: 2,
  };

  return (
    <>
      {!isLoaded ? (
        <div className="flex h-full w-full items-center justify-center rounded bg-green-100">
          <Spinner />
        </div>
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
    </>
  );
};

export default GMap;
