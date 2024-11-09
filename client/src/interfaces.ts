export interface MapsProps {
  token: string;
  geoJsonData?: GeoJSON.FeatureCollection,
  currentUser?:any
}

export interface MainPageHandlerProps{
  token: string;
}

export interface PlaceHolder {
  lng: number;
  lat: number;
}
