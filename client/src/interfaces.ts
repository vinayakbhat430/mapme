export interface MapsProps {
  token: string;
  geoJsonData?: GeoJSON.FeatureCollection
}

export interface MainPageHandlerProps{
  token: string;
}

export interface PlaceHolder {
  lng: number;
  lat: number;
}
