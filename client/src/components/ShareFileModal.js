import React, { useEffect, useState } from "react";

import { Button, Input } from "antd";
import "./FileListing.css";
import NameCircle from "./NameCirlce";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShareFileModal = ({ fileId, file, fetchListings }) => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleShare = async () => {
    const accessToken = localStorage.getItem("access_token");
    try {
      const response = await fetch("http://localhost:8080/access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify({ fileId, email }),
      });

      const data = await response.json();
      if (response.ok) {
        setEmail("");
        fetchListings();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred while sharing the file.");
    }
  };

  // useEffect(() => {
  //   handleShare();
  //   console.log("first");
  // }, [email]);

  return (
    <div className="share-container">
      <ToastContainer />
      <div className="share-input-button">
        <Input
          //   className="add_people-input"
          type="email"
          value={email}
          placeholder="Add people"
          onChange={handleEmailChange}
          style={{ padding: "0.3rem" }}
        />
        <Button onClick={handleShare} type="primary">
          Share
        </Button>
      </div>

      <div className="userinfo-container">
        <h3>People with access</h3>
        {file?.user?.map((el, index) => (
          <div key={index} className="comment-container">
            <div className="access">
              <div className="user-detail">
                <NameCircle name={el.username} />
                <div className="username-mail">
                  <span className="share-username">{el.username}</span>

                  <div className="access-detail">
                    <span className="share-email">{el.email}</span>
                  </div>
                </div>
              </div>
              <div>
                <span className="status">
                  {el.isAdmin ? "Owner" : "Viewer"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShareFileModal;
