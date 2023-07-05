import { Button, Modal } from "antd";
import { useState } from "react";
import CommentCollapse from "./CommentCollapse";
import { FilePdfOutlined, UserAddOutlined } from "@ant-design/icons";
import "./FileListing.css";
import ShareFileModal from "./ShareFileModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FileListing = ({ file, fetchListings }) => {
  const [showModal, setShowModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);

  const handleShareSuccess = (message) => {
    setShowModal(false);
    toast.success(message);
  };

  const handleShareError = (error) => {
    toast.error(error);
  };

  const handleShareClick = () => {
    setShowModal(true);
  };

  const handlePdfModalClose = () => {
    setShowPdfModal(false);
  };
  const accessToken = localStorage.getItem("access_token");

  const handleFileClick = (filename) => {
    setShowPdfModal(true);
  };

  const shortenFileName = (fileName, maxLength) => {
    if (fileName.length <= maxLength) {
      return fileName;
    } else {
      const truncatedName = fileName.substring(0, maxLength - 3) + "...";
      return truncatedName;
    }
  };

  const filename = file.name;

  return (
    <div className="file-card">
      <div className="file-info">
        <div className="file-icon-info">
          <FilePdfOutlined
            className="pdf-icon"
            size={48}
            onClick={handleFileClick}
          />
          <div className="file-details">
            <p className="file-name" onClick={handleFileClick}>
              {shortenFileName(file.name, 20)}
            </p>
          </div>
          <Button
            type="text"
            className="share-button"
            icon={<UserAddOutlined />}
            onClick={handleShareClick}
          />
        </div>
      </div>
      <div className="pdf-icon-container" onClick={handleFileClick}>
        <img src="pdf-img.png" alt="pdf-img" width="70px" height="70px" />
      </div>
      <div className="file-actions-container"></div>
      {showModal && (
        <Modal
          open={showModal}
          onCancel={() => setShowModal(false)}
          title="Share File"
          footer={null}
        >
          <ShareFileModal
            fileId={file._id}
            file={file}
            fetchListings={fetchListings}
            onShareSuccess={handleShareSuccess}
            onShareError={handleShareError}
          />
        </Modal>
      )}
      <Modal
        open={showPdfModal}
        onCancel={handlePdfModalClose}
        footer={null}
        width={1200}
        destroyOnClose={true}
        centered
      >
        <div className="modal-pdfComment">
          <div>
            <iframe
              src={`http://localhost:8080/uploads/${filename}?token=${accessToken}`}
              className="pdf-iframe"
              style={{ width: "700px", height: "1000px" }}
              title="PDF Viewer"
            />
          </div>

          <div>
            <CommentCollapse
              isCollapseOpen={true}
              file={file}
              fetchListings={fetchListings}
            />
          </div>
        </div>
      </Modal>{" "}
    </div>
  );
};

export default FileListing;
