import React, { useEffect, useState } from "react";
import Listings from "./Listings";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
import { url } from "../config";
import UploadModal from "./UploadModal";

function HomeFrame() {
  const style = {
    backgroundImage: `url("home-i.png")`,
    backgroundRepeat: "repeat",
    backgroundSize: "cover",
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

  useEffect(() => {
    console.log("call");
    const isLoggedIn = localStorage.getItem("success");
    if (!isLoggedIn) {
      navigate("/signup");
    }
  }, []);

  const handleUpload = async () => {
    setIsModalOpen(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const accessToken = localStorage.getItem("access_token");

      const response = await fetch(`${url}/file/upload`, {
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
        toast.error("Error:", data.message);
        // Handle the error condition appropriately
      }
    } catch (error) {
      toast.error("Error:", error);
      // Handle any network or other errors
    }
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
      <UploadModal
        file={file}
        setFile={setFile}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleUpload={handleUpload}
      />
      <Listings
        onUpload={() => setIsModalOpen(true)}
        handleUpload={handleUpload}
        onLogout={handleLogout}
        file={file}
        setFile={setFile}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};
