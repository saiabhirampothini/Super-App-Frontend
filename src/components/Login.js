import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { oauthRoute } from "../utils/APIRoutes";
import { loginRoute } from "../utils/APIRoutes";
import '../styles/Login.css';

const Login = () => {
  const Navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [emailOrPhone, setemailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    // try {
    //   await axios.post("http://localhost:5000/api/oauth/auth/google");
    // } catch (err) {}
    window.location.href = oauthRoute;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        loginRoute,
        {
          emailOrPhone,
          password,
        },
        {
          withCredentials: true,
        }
      );
      const userData = { emailOrPhone };
      // console.log(userData);
      login(userData);
      // Perform any additional actions, e.g., saving tokens or redirecting
      console.log("Success:", userData);
      Navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="body-login">
      <div className="login-container">
        <h2 className="text-center">Sign In With</h2>
        <div className="d-flex justify-content-between mb-4">
          <button
            className="btn btn-secondary social-btn"
            onClick={handleGoogleLogin}
          >
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="Google logo"
            />{" "}
            Google
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="emailOrPhone">Email / phone</label>
            <input
              type="text"
              className="form-control"
              id="emailOrPhone"
              placeholder="Enter Email or Phone number"
              value={emailOrPhone}
              onChange={(e) => setemailOrPhone(e.target.value)}
            />
          </div>
          <div className="form-group password-group">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="input-group-append">
                <span className="input-group-text" onClick={togglePasswordVisibility}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>
            </div>
          
            {/* <small className="form-text text-right">
              <a href="#">Forgot?</a>
            </small> */}
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Sign In
          </button>
        </form>
        <div className="text-center mt-3">
          <small>
            Not a member? <a href="/register">Sign up now</a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
