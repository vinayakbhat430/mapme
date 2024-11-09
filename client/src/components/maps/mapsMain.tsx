"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactMapGl, { Marker, MapRef, MapMouseEvent } from "react-map-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from "@turf/turf";
import { MapsProps, PlaceHolder } from "@/interfaces";
import {
  mapBoxConfig,
  mapboxPointConfig,
  mapboxPolygonConfig,
} from "./mapbox-config";
import { GeoJSONFeature } from "mapbox-gl";
import MapControls from "./mapControls";
import FeatureTooltip from "./featureTooltip";
import FeatureSelector from "./featureSelector";
import FeatureNameEditor from "./featureNameEditor";
import useRequest from "@/hooks/useRequest";
import { eventSubject } from "@/hooks/eventSubject";

const Maps: React.FC<MapsProps> = ({ token, geoJsonData, currentUser }) => {
  const [newPlace, setNewPlace] = useState<PlaceHolder | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<GeoJSONFeature | null>(
    null
  );
  const [roundedArea, setRoundedArea] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [viewport, setViewport] = useState({
    latitude: 13.000559116337492,
    longitude: 77.52533374173974,
    zoom: 8,
  });
  const [featureIds, setFeatureIds] = useState<string[]>([]);
  const [selectedFeatureId, setSelectedFeatureId] = useState<string | null>(
    null
  );
  const [featureNames, setFeatureNames] = useState<Record<string, string>>({});
  const [newFeatureName, setNewFeatureName] = useState<string>("");
  const [pointId, setPointId] = useState("");

  const mapRef = useRef<MapRef | null>(null);
  const drawRef = useRef<MapboxDraw | null>(null);

  const handleMapLoad = (mapInstance: MapRef) => {
    mapRef.current = mapInstance;
    const map = mapRef.current?.getMap();
    if (map && !drawRef.current) {
      drawRef.current = new MapboxDraw(mapBoxConfig);
      map.addControl(drawRef.current);

      const updateArea = (id: string) => {
        const data = drawRef.current?.getAll();
        if (data && data.features.length > 0) {
          const selectedData = data?.features.find((feat) => feat.id === id);
          if (selectedData && selectedData.geometry.type === "Polygon") {
            const area = turf.area(selectedData);
            setRoundedArea(Math.round(area * 100) / 100);
          } else {
            setRoundedArea(null);
          }
        }
      };

      map.on("load", () => {
        if (geoJsonData) {
          map.addSource("geojson-data", {
            type: "geojson",
            data: geoJsonData,
          });
          map.addLayer(mapboxPolygonConfig as any);
          map.addLayer(mapboxPointConfig as any);
        }
      });

      map.on("draw.create", () => {
        const allFeatures = drawRef.current?.getAll().features || [];
        const newFeatureIds =
          allFeatures
            .map((feat) => feat.id?.toString())
            .filter((id) => id !== undefined) || [];
        setFeatureIds(newFeatureIds);
      });

      map.on("mousemove", (event) => {
        if (!map || !drawRef.current) return;

        // Check if the layer exists
        const layerExists = map.getLayer("gl-draw-polygon-fill.cold");
        if (!layerExists) {
          console.warn("Layer 'gl-draw-polygon-fill.cold' does not exist");
          return; // Exit the function if the layer is not found
        }
        const features = map.queryRenderedFeatures(event.point, {
          layers: ["gl-draw-polygon-fill.cold", "gl-draw-point.cold"],
        });
        if (features.length > 0) {
          const featureId = features[0].properties?.id;
          featureId && updateArea(featureId);
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

  const handleSelectChange = (selectedOption: string) => {
    setNewFeatureName(featureNames[selectedOption] || "");
    selectFeatureById(selectedOption);
    setSelectedFeatureId(selectedOption);
  };

  const handleNameSubmit = () => {
    if (selectedFeatureId && newFeatureName.trim()) {
      setFeatureNames((prev) => ({
        ...prev,
        [selectedFeatureId]: newFeatureName,
      }));
    }
  };

  const selectFeatureById = (featureId: string) => {
    if (drawRef.current) {
      const feature = drawRef.current.get(featureId);
      if (feature && feature.geometry.type === "Polygon") {
        drawRef.current.changeMode("direct_select", { featureId });
      } else if (feature && feature.geometry.type === "Point") {
        setPointId(featureId);
      }
    }
  };

  const { errors, doRequest } = useRequest({
    url: "/api/anymodel",
    method: "post",
    onSuccess: () => console.log("success"),
  });

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (map && geoJsonData) {
      map.addSource("geojson-data", {
        type: "geojson",
        data: geoJsonData,
      });
    }

    const subscription = eventSubject.subscribe((message) => {
      if (currentUser) {
        doRequest({
          userId: currentUser["id"],
          modelName: message,
          featureNames: featureNames,
          features: drawRef.current?.getAll().features,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [geoJsonData, currentUser, featureNames]);

  return (
    <div>
      <div
        style={{ width: "100vw", height: "60vh", position: "relative" }}
        className="flex items-center justify-center"
      >
        <ReactMapGl
          {...viewport}
          mapboxAccessToken={token}
          scrollZoom
          onMove={(event) => setViewport(event.viewState)}
          onDblClick={handleDoubleClick}
          mapStyle="mapbox://styles/vinayakbhat-430-signups/cm34qq8mn00u201pqhw8whe16"
          ref={(instance) => handleMapLoad(instance as MapRef)}
        >
          <MapControls />
          {newPlace && (
            <Marker latitude={newPlace.lat} longitude={newPlace.lng} />
          )}
          {featureIds.map((featureId) => {
            const feature = drawRef.current?.get(featureId);
            if (feature && feature.geometry.type === "Point") {
              const [lng, lat] = feature.geometry.coordinates;
              return (
                pointId === featureId && (
                  <Marker key={featureId} longitude={lng} latitude={lat} />
                )
              );
            }
            return null;
          })}
          {hoveredFeature && (
            <FeatureTooltip
              feature={hoveredFeature}
              area={roundedArea}
              position={hoverPosition}
              name={featureNames}
            />
          )}
        </ReactMapGl>
      </div>
      <div className="flex items-center gap-x-6 py-8">
        <FeatureSelector
          featureOptions={featureIds}
          onSelectChange={handleSelectChange}
        />
        {selectedFeatureId && (
          <FeatureNameEditor
            featureName={newFeatureName}
            onNameChange={(e) => setNewFeatureName(e.target.value)}
            onSubmit={handleNameSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default Maps;
