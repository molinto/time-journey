import ExpandIcon from "./icons/ExpandIcon";
import CollapseIcon from "./icons/CollapseIcon";
import useClickOutside from "./hooks/useClickOutside";
import React, { useRef, useState } from "react";

interface MapContainerProps {
  children: React.ReactNode;
}

const MapContainer = ({ children }: MapContainerProps) => {
  const [expandMap, setExpandMap] = useState(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const toggleMapSize = () => {
    setExpandMap(!expandMap);
  };

  const collapse = () => setExpandMap(false);

  useClickOutside(mapContainerRef, collapse);
  return (
    <div
      ref={mapContainerRef}
      className={`h-[40vh] transition-all duration-300 lg:absolute lg:bottom-4 lg:right-4 lg:z-20 ${
        expandMap
          ? "h-[75vh] w-[75vw]"
          : "h-[40vh] min-h-[30rem] w-full lg:h-[calc(100%-27rem)] lg:min-h-[10rem] lg:w-[428px]"
      }`}
    >
      <button
        className="absolute left-2 top-2 z-30 hidden lg:block"
        onClick={toggleMapSize}
      >
        <div className="rounded-sm bg-honeydew p-0.5">
          {expandMap ? <CollapseIcon /> : <ExpandIcon />}
        </div>
      </button>
      {children}
    </div>
  );
};

export default MapContainer;
