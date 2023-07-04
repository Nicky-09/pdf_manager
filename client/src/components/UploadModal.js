import React, { useState } from "react";

const UploadModal = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const accessToken = localStorage.getItem("access_token");

      const response = await fetch("http://localhost:8080/file/upload", {
        method: "POST",
        headers: {
          Authorization: `${accessToken}`,
        },
        body: formData,
      });

      const data = await response.json();
      // Handle the response data

      if (response.ok) {
        console.log("File uploaded successfully");
        // Perform any additional actions upon successful file upload
      } else {
        console.log("Error:", data.error);
        // Handle the error condition appropriately
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle any network or other errors
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadModal;
