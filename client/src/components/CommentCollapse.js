import { SendOutlined } from "@ant-design/icons";
import { Button, Collapse } from "antd";
import Input from "rc-input";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "./CommentCollapse.css";
import NameCircle from "./NameCirlce";
import { toast } from "react-toastify";

const { Panel } = Collapse;

const CommentCollapse = ({ isCollapseOpen, file, fetchListings }) => {
  const [commentInput, setCommentInput] = useState("");

  const handleCommentChange = (e) => {
    setCommentInput(e.target.value);
  };

  useEffect(() => {}, []);

  const handleSendComment = async () => {
    const accessToken = localStorage.getItem("access_token");
    try {
      const response = await fetch("http://localhost:8080/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify({ fileId: file._id, comment: commentInput }),
      });

      const data = await response.json();
      if (response.ok) {
        // console.log("Comment added successfully");
        fetchListings();
        setCommentInput("");

        // Perform any additional actions upon successful comment submission
      } else {
        toast.error("Error:", data.message);
        // Handle the error condition appropriately
      }
    } catch (error) {
      toast.error("Error:", error);
      // Handle any network or other errors
    }
  };

  const handleSendOnEnter = (e) => {
    if (e.key === "Enter") {
      handleSendComment();
    }
  };

  return (
    <div className="comment-container">
      <Collapse bordered={false} ghost activeKey={isCollapseOpen ? "1" : ""}>
        <Panel key="1" showArrow={false}>
          {file?.comments?.map((comment, index) => (
            <div key={index} className="comment-container">
              <div className="comment-box">
                <div className="user-detail-comment">
                  <NameCircle name={comment.username} />
                  <div className="userna">
                    <span className="share-username">{comment.username}</span>
                    {"  "}
                    <div className="access-detail">
                      {" "}
                      <span className="comment-time">
                        {moment(comment.createdAt).fromNow()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="comment-text">
                  {" "}
                  <span className="share-email">{comment.text}</span>
                </div>
              </div>
            </div>
          ))}
          <div className="comment-input">
            <Input
              fullWidth
              value={commentInput}
              onChange={handleCommentChange}
              placeholder="Enter a comment"
              onKeyDown={handleSendOnEnter}
            />
            <Button
              type="text"
              onClick={handleSendComment}
              icon={<SendOutlined />}
            />
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default CommentCollapse;
