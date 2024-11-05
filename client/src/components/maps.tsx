"use client";

import React from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import { useState } from "react";
import { MapMouseEvent } from "mapbox-gl";
import { MapsProps, PlaceHolder } from "@/interfaces";

//token here refers to Mapbox GL token, which is needed for the display of map
const Maps: React.FC<MapsProps> = ({ token }) => {
  const [newPlace, setNewPlace] = useState<PlaceHolder | null>(null);

  //Initial View port params (We can use anything within the limits of latitude and longitude)!
  const [viewport, setViewport] = useState({
    latitude: 13.000559116337492,
    longitude: 77.52533374173974,
    zoom: 8,
  });

  //On double click on screen event will be triggered, lngLat contains the selected coordinates.
  const handleDoubleClick = (e: MapMouseEvent) => {
    const { lng, lat } = e.lngLat;
    setNewPlace((e) => ({ lng, lat }));
    console.log(newPlace);
  };
  return (
    <div style={{ width: "100vw", height: "80vh" }}>
      <ReactMapGl
        {...viewport}
        mapboxAccessToken={token}
        scrollZoom={true}
        onMove={(event) => setViewport(event.viewState)}
        onDblClick={handleDoubleClick}
        mapStyle={
          "mapbox://styles/vinayakbhat-430-signups/cm34qq8mn00u201pqhw8whe16"
        }
      >
        {newPlace && (
          <div>
            <Marker
              latitude={newPlace?.lat}
              longitude={newPlace?.lng}
              offset={[viewport.zoom, viewport.zoom]}
            ></Marker>
          </div>
        )}
      </ReactMapGl>
    </div>
  );
};

export default Maps;
