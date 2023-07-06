import { Button } from "antd";
import React from "react";
import UploadModal from "./UploadModal";
import { useNavigate } from "react-router-dom";
import "./NoDoc.css";

const NoDoc = ({ file, setFile, isModalOpen, setIsModalOpen }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("success");
    // setLoggedIn(false);
    navigate("/login");
  };
  return (
    <div className="no-doc">
      <div className="nodoc-content">
        Upload your first pdf document and collabarate
        <Button onClick={() => setIsModalOpen(true)}>Upload a new File</Button>
        <UploadModal
          file={file}
          setFile={setFile}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
      <Button onClick={handleLogout} className="navbar-button">
        Logout
      </Button>
    </div>
  );
};

export default NoDoc;
