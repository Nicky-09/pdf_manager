import { Skeleton } from "antd";
import React from "react";
import "./Shimmer.css";

const Shimmer = () => {
  return (
    <>
      {/* <Skeleton.Input active size block /> */}
      <div className="shimmer-container">
        {Array(10)
          .fill()
          .map((_, index) => (
            <div key={index} className="shimmer-image-container">
              <Skeleton.Image active />
            </div>
          ))}
      </div>
    </>
  );
};

export default Shimmer;
