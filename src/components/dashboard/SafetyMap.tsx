"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapPoint } from "@/types";

// Fix Leaflet icon issue in Next.js
const fixLeafletIcons = () => {
  // @ts-expect-error - Leaflet internal property not in typedefs
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
};

const SafetyMap: React.FC = () => {
  const [points, setPoints] = useState<MapPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fixLeafletIcons();
    async function fetchMapping() {
      try {
        const response = await fetch("/api/data?dataset=mapping&limit=500");
        if (response.ok) {
          const data = await response.json();
          setPoints(data);
        }
      } catch (err) {
        console.error("Failed to fetch map data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMapping();
  }, []);

  if (loading) {
    return (
      <div className="h-full min-h-[400px] w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-2 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-[var(--text-secondary)] uppercase tracking-widest font-mono">
            Loading Geospatial Data
          </span>
        </div>
      </div>
    );
  }

  const getMarkerColor = (severity: string) => {
    switch (severity) {
      case "high": return "var(--accent-danger)";
      case "medium": return "var(--accent-warning)";
      case "low": return "var(--accent-primary)";
      default: return "#71717a";
    }
  };

  return (
    <div className="h-full min-h-[400px] w-full relative rounded-lg overflow-hidden border border-[var(--border)] animate-panel">
      <MapContainer
        center={[32.3668, -86.2999]}
        zoom={12}
        scrollWheelZoom={false}
        className="h-full w-full z-0"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {points.map((point, idx) => (
          <CircleMarker
            key={idx}
            center={[point.lat, point.lng]}
            radius={severityToRadius(point.severity)}
            pathOptions={{
              fillColor: getMarkerColor(point.severity),
              fillOpacity: 0.4,
              color: getMarkerColor(point.severity),
              weight: 1,
              opacity: 0.6,
              className: point.severity === "high" ? "marker-pulse-critical" : ""
            }}
          >
            <Popup className="custom-leaflet-popup">
              <div className="bg-[var(--bg-secondary)] text-[var(--text-primary)] p-1 rounded min-w-[120px]">
                <div className="text-[10px] uppercase font-bold text-[var(--text-secondary)] mb-1">
                  Incident Report
                </div>
                <div className="text-sm font-bold border-b border-[var(--border)] pb-1 mb-1">
                  {point.type}
                </div>
                <div className="text-xs text-[var(--text-secondary)]">
                  {point.label}
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
        
        <ZoomControl position="bottomright" />
      </MapContainer>
      
      {/* Legend Overlay */}
      <div className="absolute top-4 right-4 z-[1000] bg-[var(--bg-secondary)]/80 backdrop-blur-md border border-[var(--border)] p-2 rounded-md shadow-lg pointer-events-none">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--accent-danger)]" />
            <span className="text-[9px] text-[var(--text-primary)] uppercase font-bold">Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--accent-warning)]" />
            <span className="text-[9px] text-[var(--text-primary)] uppercase font-bold">Caution</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
            <span className="text-[9px] text-[var(--text-primary)] uppercase font-bold">Normal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function severityToRadius(severity: string) {
  switch (severity) {
    case "high": return 8;
    case "medium": return 6;
    case "low": return 4;
    default: return 5;
  }
}

export default SafetyMap;
