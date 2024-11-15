export const viewPortInitData = {
  latitude: 13.000559116337492,
  longitude: 77.52533374173974,
  zoom: 8,
}

export const mapBoxConfig = {
  displayControlsDefault: false,
  controls: {
    point: true,
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
        "circle-radius": 6, // Size of the point
        "circle-color": "#00BFFF", // Color of the point
        "circle-stroke-color": "#1E90FF", // Border color
        "circle-stroke-width": 2, // Border width
      },
    },
  ],
};

export const mapboxPolygonConfig = (id?: string, source?:string) => {
  return {
    id: id || "geojson-layer",
    type: "fill",
    source: source || "geojson-data",
    layout: {},
    paint: {
      "fill-color": "#088",
      "fill-opacity": 0.6,
    },
  };
};

export const mapboxPointConfig = (id?: string, source?:string) => {
  return {
    id: id || "geojson-points",
    type: "circle",
    source: source || "geojson-data",
    paint: {
      "circle-color": "#ff0000",
      "circle-radius": 6,
    },
  };
};

export  function generateRandomString(length:number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

