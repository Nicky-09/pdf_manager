import { Button, Modal } from "antd";
import React from "react";

const UploadModal = ({
  file,
  setFile,
  isModalOpen,
  setIsModalOpen,
  handleUpload,
}) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    // Process the uploaded file
    // ...
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFile(null);
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
  return (
    <div>
      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        title="File Upload"
        footer={[
          <Button key="upload" type="primary" onClick={handleUpload}>
            Upload
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
            style={{ display: "none" }}
            accept="application/pdf"
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
    </div>
  );
};

export default UploadModal;
