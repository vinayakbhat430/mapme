import Map from '../components/maps';
import 'mapbox-gl/dist/mapbox-gl.css'

const token = process.env.ACCESS_TOKEN!;
export default function Home() {
  return (
    <div>
      <Map token={token}></Map>
    </div>
  );
}
