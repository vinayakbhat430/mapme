import 'mapbox-gl/dist/mapbox-gl.css';
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import MainPageHandler from '@/components/mainPageHandler';


const token = process.env.ACCESS_TOKEN;

export default async function Home() {
  if(!token){
    return <div>Unable to process request at the moment!</div>
  }
  return <div>
    <MainPageHandler token={token}/>
  </div>
}



