"use client";

import React, { useState } from 'react'
import FileUpload from './fileUpload';
import Maps from './maps/mapsMain';
import { MainPageHandlerProps } from '@/interfaces';

const MainPageHandler:React.FC<MainPageHandlerProps> = ({token}) => {
    const [fileData,setFileData]= useState(undefined);

    const handleFileUpload = (fileContent: string | ArrayBuffer | null) => {
      if (typeof fileContent === "string") {
        try {
          const geoJsonData = JSON.parse(fileContent);
          setFileData(e=> geoJsonData);
  
          console.log("Parsed GeoJSON Data:", geoJsonData);
  
        } catch (error) {
          console.error("Failed to parse GeoJSON file:", error);
        }
      } else {
        console.error("File content is not a valid string");
      }
    };
  
    if(!token){
      return <div> Unable to load at the moment!</div>
    }
    return (
      <div>
        <FileUpload onFileUpload={handleFileUpload}/>
        <Maps token={token} geoJsonData={fileData}/>
      </div>
    );
}

export default MainPageHandler