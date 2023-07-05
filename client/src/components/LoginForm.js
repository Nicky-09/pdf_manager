import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { url } from "../config";
import { ToastContainer, toast } from "react-toastify";

function LoginFrame() {
  const style = {
    backgroundImage: `url("login-img.png")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: "-1",
  };
  return <div style={style}></div>;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/login`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      const accessToken = data.token;
      localStorage.setItem("access_token", accessToken); // Handle the response data

      if (response.ok) {
        toast.success("Login successful");

        navigate("/home");
        // Perform any additional actions upon successful login
      } else {
        toast.error(data.message);
        // console.log(message);
        // Handle the error condition appropriately
      }
    } catch (error) {
      toast.error(error);
      // Handle any network or other errors
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <>
      <ToastContainer />
      <LoginFrame />
      <div className="login-container">
        <div className="form-container">
          <form onSubmit={handleSubmit} className="content_form">
            {/* <h2>Login</h2> */}
            <div className="input-container">
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
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  I am not a robot
                </label>
              </div>
            </div>
            <Button
              type="primary"
              disabled={!isChecked}
              className="button"
              onClick={handleSubmit}
            >
              Log In
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
              <span>Don't have an account ?</span>
            </button>
            <button>
              <Link to="/signup">Create New Account</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
