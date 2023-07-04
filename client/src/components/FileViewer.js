import { useState } from "react";
// import "./styles.css";

const FileViewer = ({ filename }) => {
  const [showModal, setShowModal] = useState(false);

  const handleFileClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const accessToken = localStorage.getItem("access_token");

  return (
    <div>
      <button onClick={handleFileClick}>Open PDF</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>
              Close
            </button>
            <iframe
              src={`http://localhost:8080/uploads/file-1688402026959-14471161-Junior%20Software%20Engineer%20-%20Assignment%20-%20Updated%20(2).pdf?token=${accessToken}`}
              className="pdf-iframe"
              style={{ width: "600px", height: "1000px" }}
              title="PDF Viewer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FileViewer;
