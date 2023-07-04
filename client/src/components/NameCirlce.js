import React from "react";
import "./NameCircle.css";

// const generateRandomColor = () => {
//   const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
//   return randomColor;
// };

const NameCircle = ({ name }) => {
  const firstLetter = name.charAt(0).toUpperCase();
  // const randomColor = generateRandomColor();

  return <div className="name-circle">{firstLetter}</div>;
};

export default NameCircle;
