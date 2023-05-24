import ExpandIcon from "./icons/ExpandIcon";
import CollapseIcon from "./icons/CollapseIcon";
import useClickOutside from "./hooks/useClickOutside";
import { useRef, useState } from "react";

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
      className={`h-[40vh] w-full transition-all duration-300 lg:absolute lg:bottom-4 lg:right-4 lg:z-20 ${
        expandMap
          ? "h-[calc(100vh-80px)] w-[70vw]"
          : "h-[40vh] min-h-[30rem] w-full lg:h-1/2 lg:min-h-[10rem] lg:w-[428px]"
      }`}
    >
      <button
        className="absolute left-2 top-2 z-30 hidden lg:block"
        onClick={toggleMapSize}
      >
        <div className="rounded-sm bg-slate-100 p-0.5">
          {expandMap ? <CollapseIcon /> : <ExpandIcon />}
        </div>
      </button>
      {children}
    </div>
  );
};

export default MapContainer;
