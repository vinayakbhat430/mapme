import Map from '../components/maps';
import 'mapbox-gl/dist/mapbox-gl.css';
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import HandleFileUpload from '@/components/handleFileUpload';

const token = process.env.ACCESS_TOKEN!;
export default function Home() {
  
  
  return (
    <div>
      <HandleFileUpload/>
      <Map token={token}></Map>
    </div>
  );
}
