"use client";

import React, { useEffect, useState } from "react";
import FileUpload from "./fileUpload";
import Maps from "./maps/mapsMain";
import { MainPageHandlerProps } from "@/interfaces";
import Navbar from "./navbar";
import useRequest from "@/hooks/useRequest";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { eventSubject } from "@/hooks/eventSubject";
import { Input } from "./ui/input";

const MainPageHandler: React.FC<MainPageHandlerProps> = ({ token }) => {
  const [fileData, setFileData] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [modelName, setModelName] = useState('');
  const router = useRouter();

  const handleFileUpload = (fileContent: string | ArrayBuffer | null) => {
    if (typeof fileContent === "string") {
      try {
        const geoJsonData = JSON.parse(fileContent);
        setFileData((e) => geoJsonData);

        console.log("Parsed GeoJSON Data:", geoJsonData);
      } catch (error) {
        console.error("Failed to parse GeoJSON file:", error);
      }
    } else {
      console.error("File content is not a valid string");
    }
  };
  // Setup useRequest hook with the registration endpoint
  const { errors, doRequest } = useRequest({
    url: "/api/users/current-user",
    method: "get",
    onSuccess: (d) => {
      console.log(d);
      if (d.currentUser?.email) {
        setCurrentUser(d.currentUser);
      }
    },
    onError: () => router.push("/auth/login"),
  });

  useEffect(() => {
    doRequest();
  }, []);

  if (!token) {
    return <div> Unable to load at the moment!</div>;
  }

  const postData = () => {
    eventSubject.next(modelName);
  };

  return (
    <div>
      <Navbar currentUser={currentUser} />
      {!currentUser && <p>Please Login to continue</p>}
      {currentUser && (
        <div>
          <div className="flex items-center justify-between">
          <div className="w-1/2">
            <FileUpload onFileUpload={handleFileUpload} />
          </div>
          <div className="w-1/2 flex items-center gap-x-4">
            <Input
              className="border border-gray-300 rounded p-2"
              value={modelName}
              onChange={e=> setModelName(e.target.value)}
              placeholder="Enter Model name"
            />
            <Button variant="default" onClick={postData} disabled={modelName === ''}>
              Save All
            </Button>
          </div>
          </div>
          <Maps
            token={token}
            geoJsonData={fileData}
            currentUser={currentUser}
          />
        </div>
      )}
    </div>
  );
};

export default MainPageHandler;
