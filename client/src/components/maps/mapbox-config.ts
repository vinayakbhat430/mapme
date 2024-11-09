export const mapBoxConfig = {
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true,
    },
    styles: [
      {
        id: "gl-draw-polygon-fill",
        type: "fill",
        filter: ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
        paint: {
          "fill-color": "#FFA500", // Polygon fill color
          "fill-opacity": 0.4,
        },
      },
      {
        id: "gl-draw-polygon-stroke-active",
        type: "line",
        filter: ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
        paint: {
          "line-color": "#FF4500", // Polygon outline color
          "line-width": 2,
        },
      },
      {
        id: "gl-draw-point",
        type: "circle",
        filter: ["all", ["==", "$type", "Point"], ["!=", "mode", "static"]],
        paint: {
          "circle-radius": 6,              // Size of the point
          "circle-color": "#00BFFF",       // Color of the point
          "circle-stroke-color": "#1E90FF",// Border color
          "circle-stroke-width": 2,        // Border width
        },
      },
    ],
  }


export const mapboxPolygonConfig = {
  id: "geojson-layer",
  type: "fill",
  source: "geojson-data",
  layout: {},
  paint: {
    "fill-color": "#088",
    "fill-opacity": 0.6,
  },
}

export const mapboxPointConfig = {
  id: "geojson-points",
  type: "circle",
  source: "geojson-data",
  paint: {
    "circle-color": "#ff0000",
    "circle-radius": 6,
  },
}