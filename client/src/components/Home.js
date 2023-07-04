import React, { useState } from "react";
import { Modal, Button, Upload } from "antd";
import Listings from "./Listings";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function HomeFrame() {
  const style = {
    "background-image": `url("home-i.png")`,
    "background-repeat": "repeat",
    "background-size": "cover",
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: "-1",
  };
  return <div style={style}></div>;
}

export const Home = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    // Process the uploaded file
    // ...
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setFile(file);
    // Process the dropped file
    // ...
  };

  const handleUpload = async () => {
    setIsModalOpen(true);
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
        toast.success("File uploaded successfully");
        setFile(null);
        setIsModalOpen(false);

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
  console.log(file);
  const closeModal = () => {
    setIsModalOpen(false);
    setFile(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    // setLoggedIn(false);
    navigate("/login");
  };

  return (
    <div>
      <ToastContainer />
      <HomeFrame />
      <Navbar onUpload={() => setIsModalOpen(true)} onLogout={handleLogout} />
      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        title="File Upload"
        footer={[
          <Button key="upload" type="primary" onClick={handleUpload}>
            Uploadd
          </Button>,
          <Button key="close" onClick={closeModal}>
            Close
          </Button>,
        ]}
      >
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput").click()}
          style={{
            width: "100%",
            height: "200px",
            border: "2px dashed gray",
            borderRadius: "4px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          <input
            type="file"
            id="fileInput"
            multiple
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <p>Drag and drop files here or click to upload</p>
        </div>
        {file && (
          <div>
            <h3>Selected File:</h3>
            <p>{file.name}</p>
          </div>
        )}
      </Modal>
      <Listings
        onUpload={() => setIsModalOpen(true)}
        handleUpload={handleUpload}
      />
    </div>
  );
};
