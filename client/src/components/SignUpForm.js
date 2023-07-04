import React, { useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";

function SignUpFrame() {
  const style = {
    "background-image": `url("login-img.png")`,
    "background-repeat": "no-repeat",
    "background-size": "cover",
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: "-1",
  };
  return <div style={style}></div>;
}

const SignupForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
      });

      const data = await response.json();
      // Handle the response data

      if (response.ok) {
        console.log("User created successfully");
        navigate("/login");

        // Perform any additional actions upon successful user creation
      } else {
        console.log("Error:", data.error);
        // Handle the error condition appropriately
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle any network or other errors
    }
  };

  return (
    <>
      <SignUpFrame />
      <div className="signup-container">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              {/* <label className="label" htmlFor="username">
              Username
            </label> */}
              <input
                className="input"
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {/* <label className="label" htmlFor="email">
              Email
            </label> */}
              <input
                className="input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* <label className="label" htmlFor="password">
              Password
            </label> */}
              <input
                className="input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="primary" className="button" onClick={handleSubmit}>
              Signup
            </Button>
          </form>
          <div class="content__or-text">
            <span></span>
            <span>OR</span>
            <span></span>
          </div>
          <div class="content__signup-buttons">
            <button>
              <span></span>
              <span>Already have an account ?</span>
            </button>
            <button>
              <Link to="/login">Login</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
