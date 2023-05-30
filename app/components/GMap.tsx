"use client";

import {
  GoogleMap,
  MarkerF,
  PolylineF,
  useLoadScript,
} from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useRef } from "react";
import React from "react";
import Spinner from "./Spinner";

interface MapProps {
  handleMapClick?: (e: google.maps.MapMouseEvent) => void;
  currentMarker?: Coordinates | null;
  finalMarkers?: {
    userMarker: Coordinates;
    gameMarker: Coordinates;
  };
}

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
type MapMap = google.maps.Map;

const GMap = ({ finalMarkers, handleMapClick, currentMarker }: MapProps) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!,
  });

  const mapRef = useRef<MapMap | null>(null);
  const mapInnerContainer = useRef<HTMLDivElement>(null);

  const onLoad = useCallback((map: any) => {
    mapRef.current = map;
    return;
  }, []);

  const center = useMemo<LatLngLiteral>(() => ({ lat: 49, lng: 9 }), []);

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

  useEffect(() => {
    if (!finalMarkers) return;

    const bounds = new window.google.maps.LatLngBounds(finalMarkers.gameMarker);
    bounds.extend(finalMarkers.userMarker);

    mapRef.current?.fitBounds(bounds);
  }, [finalMarkers]);

  useEffect(() => {
    if (!finalMarkers) return;
    mapInnerContainer.current?.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  }, [finalMarkers, mapInnerContainer]);

  const lineSymbol = {
    path: "M 0,0 0,1",
    scale: 2,
  };

  return (
    <div className="h-full w-full" ref={mapInnerContainer}>
      {!isLoaded ? (
        <div className="flex h-full w-full items-center justify-center rounded bg-green-100">
          <Spinner />
        </div>
      ) : (
        <GoogleMap
          onLoad={onLoad}
          mapContainerClassName="w-full h-full rounded"
          center={center}
          zoom={1.3}
          onClick={handleMapClick}
          options={options}
        >
          {currentMarker && !finalMarkers ? (
            <MarkerF
              position={currentMarker}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/micons/yellow-dot.png",
              }}
              title="Your guess"
            />
          ) : null}

          {finalMarkers ? (
            <React.Fragment key={finalMarkers.gameMarker.lat.toString()}>
              <MarkerF
                position={finalMarkers.userMarker}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/micons/yellow-dot.png",
                }}
                title="Your guess"
              />
              <MarkerF
                position={finalMarkers.gameMarker}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/micons/red-dot.png",
                }}
                title="Right location"
              />
              <PolylineF
                path={[finalMarkers.gameMarker, finalMarkers.userMarker]}
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
  );
};

export default GMap;
