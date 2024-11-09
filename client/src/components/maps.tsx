"use client";

import React, { useRef, useState } from "react";
import ReactMapGl, {
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
  MapMouseEvent,
  MapRef
} from "react-map-gl";
import { MapsProps, PlaceHolder } from "@/interfaces";

import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from "@turf/turf";
import { mapBoxConfig } from "./mapbox-config";
import { GeoJSONFeature } from "mapbox-gl";

const Maps: React.FC<MapsProps> = ({ token }) => {
  const [newPlace, setNewPlace] = useState<PlaceHolder | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<GeoJSONFeature | null>(null);
  const [roundedArea, setRoundedArea] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const [viewport, setViewport] = useState({
    latitude: 13.000559116337492,
    longitude: 77.52533374173974,
    zoom: 8,
  });

  const mapRef = useRef<MapRef | null>(null);
  const drawRef = useRef<MapboxDraw | null>(null);

  const handleMapLoad = (mapInstance: MapRef) => {
    mapRef.current = mapInstance;
    const map = mapRef.current?.getMap();
    if (map && !drawRef.current) {
      drawRef.current = new MapboxDraw(mapBoxConfig);
      map.addControl(drawRef.current);

      const updateArea = (id:string) => {
        const data = drawRef.current?.getAll();
        if(data && data.features.length > 0){
          const selectedData = data?.features.find(feat => feat.id === id)
          if (selectedData) {
            const area = turf.area(selectedData);
            setRoundedArea(Math.round(area * 100) / 100);
          } else {
            setRoundedArea(null);
          }
        }
      };

      map.on("mousemove", (event) => {
        const features = map.queryRenderedFeatures(event.point, {
          layers: ["gl-draw-polygon-fill.cold"],
        });
        if (features.length > 0) {
          const featureId = features[0].properties?.id
          featureId && updateArea(featureId)
          setHoveredFeature(features[0]);
          setHoverPosition({ x: event.point.x, y: event.point.y });
        } else {
          setHoveredFeature(null);
        }
      });
    }
  };

  const handleDoubleClick = (e: MapMouseEvent) => {
    const { lng, lat } = e.lngLat;
    setNewPlace({ lng, lat });
  };

  const selectPolygonById = (featureId:string) => {
    if (drawRef.current) {
      // Use direct_select mode with the feature ID to select the polygon
      drawRef.current.changeMode("direct_select", { featureId });
    }
  };

  return (
    <div style={{ width: "100vw", height: "80vh", position: "relative" }}>
      <ReactMapGl
        {...viewport}
        mapboxAccessToken={token}
        scrollZoom={true}
        onMove={(event) => setViewport(event.viewState)}
        onDblClick={handleDoubleClick}
        mapStyle="mapbox://styles/vinayakbhat-430-signups/cm34qq8mn00u201pqhw8whe16"
        ref={(instance) => handleMapLoad(instance as MapRef)}
      >
        <div style={{ position: "absolute", top: 10, left: 10, zIndex: 100 }}>
          <NavigationControl />
        </div>
        <div style={{ position: "absolute", top: 10, left: 50, zIndex: 100 }}>
          <FullscreenControl />
        </div>
        <div style={{ position: "absolute", bottom: 30, left: 10, zIndex: 100 }}>
          <ScaleControl />
        </div>
        <div style={{ position: "absolute", top: 10, right: 10, zIndex: 100 }}>
          <GeolocateControl />
        </div>

        {newPlace && (
          <Marker
            latitude={newPlace.lat}
            longitude={newPlace.lng}
            offset={[viewport.zoom, viewport.zoom]}
          />
        )}

        {hoveredFeature && (
          <div
            style={{
              position: "absolute",
              top: hoverPosition.y + 10,
              left: hoverPosition.x + 10,
              backgroundColor: "white",
              padding: "8px",
              borderRadius: "4px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              pointerEvents: "none",
              zIndex: 1000,
            }}
          >
            <p><strong>ID:</strong> {hoveredFeature.properties?.id}</p>
            {roundedArea && <p><strong>Area:</strong> {roundedArea} sq meters</p>}
          </div>
        )}
      </ReactMapGl>
    </div>
  );
};

export default Maps;
