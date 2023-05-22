import ExpandIcon from "./icons/ExpandIcon";
import CollapseIcon from "./icons/CollapseIcon";
import useClickOutside from "./hooks/useClickOutside";
import { useRef, useState } from "react";

interface MapContainerProps {
  children: React.ReactNode;
  error?: boolean;
}

const MapContainer = ({ children, error }: MapContainerProps) => {
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
      className={`relative mt-auto flex items-center transition-all duration-300 ${
        expandMap ? "h-[70vh] w-[60vw]" : "h-[400px] w-[400px]"
      }
        ${error ? "rounded border-2 border-red-500" : ""}
        `}
    >
      {error && (
        <div className="absolute -top-7 left-2 text-sm text-red-400">
          Please pick a location!
        </div>
      )}
      <button className="absolute left-2 top-2 z-30" onClick={toggleMapSize}>
        <div className="rounded-sm bg-slate-100 p-0.5">
          {expandMap ? <CollapseIcon /> : <ExpandIcon />}
        </div>
      </button>
      {children}
    </div>
  );
};

export default MapContainer;
