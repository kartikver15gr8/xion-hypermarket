"use client";
import React, { useState } from "react";
import { Widget } from "@uploadcare/react-widget";

const uploadcarekey = process.env.NEXT_PUBLIC_UPLOADCARE_KEY || "";
const UploadForm: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleFileUpload = (fileInfo: any) => {
    if (fileInfo) {
      // Get the uploaded file's URL
      const url = fileInfo.cdnUrl;
      setImageUrl(url);
      console.log("Uploaded Image URL:", url); // Log or save this URL to your database
    }
  };

  return (
    <div>
      <h1>Upload an Image</h1>
      <Widget publicKey={uploadcarekey} onChange={handleFileUpload} />
      {imageUrl && (
        <div>
          <h2>Uploaded Image:</h2>
          <img src={imageUrl} alt="Uploaded" width="300" />
          <p>Image URL: {imageUrl}</p>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
