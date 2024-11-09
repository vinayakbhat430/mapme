"use client";

import React from "react";
import FileUpload from "./fileUpload";

const HandleFileUpload = () => {
  const handleFileUpload = (fileContent: string | ArrayBuffer | null) => {
    if (typeof fileContent === "string") {
      try {
        // Parse the string content as JSON
        const geoJsonData = JSON.parse(fileContent);

        // Process the parsed GeoJSON data as needed
        console.log("Parsed GeoJSON Data:", geoJsonData);

        // Perform any further actions, like updating state or calling API
      } catch (error) {
        console.error("Failed to parse GeoJSON file:", error);
      }
    } else {
      console.error("File content is not a valid string");
    }
  };
  return   <FileUpload onFileUpload={handleFileUpload}/> ;
};

export default HandleFileUpload;
