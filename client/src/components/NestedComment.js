import { Button, Input } from "antd";
import React, { useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import { url } from "../config";
import { toast } from "react-toastify";

const NestedComment = ({
  commentId,
  fileId,
  fetchListings,
  commentBoxOpen,
  setCommentBoxOpen,
}) => {
  const [commentNestedInput, setCommentNestedInput] = useState("");

  const handleSendNestedComment = async () => {
    const accessToken = localStorage.getItem("access_token");
    try {
      const response = await fetch(`${url}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify({
          fileId: fileId,
          comment: commentNestedInput,
          parentCommentId: commentId,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("nested comment ssuccess");
        fetchListings();
        setCommentNestedInput("");

        setCommentBoxOpen(false);
      } else {
        // Handle error condition if needed
        toast.error("Error:", data.message);
      }
    } catch (error) {
      toast.error("Error:", error);
    }
  };

  const handleSendOnEnter = (e) => {
    if (e.key === "Enter") {
      handleSendNestedComment();
    }
  };

  const handleNestedCommentChange = (e) => {
    setCommentNestedInput(e.target.value);
  };

  return (
    <div className="comment-input">
      <Input
        fullWidth
        value={commentNestedInput}
        onChange={handleNestedCommentChange}
        placeholder="Enter a nested comment"
        onKeyDown={handleSendOnEnter}
      />
      <Button
        type="text"
        onClick={handleSendNestedComment}
        icon={<SendOutlined />}
      />
    </div>
  );
};

export default NestedComment;
