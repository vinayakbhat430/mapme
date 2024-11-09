import 'mapbox-gl/dist/mapbox-gl.css';
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import Maps from '@/components/maps';
import FileUpload from '@/components/fileUpload';
import { useState } from 'react';
import MainPageHandler from '@/components/mainPageHandler';

const token = process.env.ACCESS_TOKEN;

export default function Home() {
  if(!token){
    return <div>Unable to process request at the moment!</div>
  }
  return <MainPageHandler token={token}/>
}

