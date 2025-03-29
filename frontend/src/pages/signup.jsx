 import React from "react";
import "./signup.css";

const signup = () => {
  return (
    <div className="signup-container">
      <div className="signup-window">
        <div className="signup-header">
          <div className="signup-lang">Fr/Eng</div>
          <div className="signup-profile">
            <i className="fas fa-user-circle"></i>
          </div>
        </div>

        <div className="signup-content">
          <div className="signup-title">
            <i className="fas fa-lock"></i>
            <span className="signup-text">sign up</span>
          </div>

          <p className="signup-subtitle">Create an account</p>

          <form className="signup-form">
            <div className="signup-input">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="signup-input">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" />
            </div>
            <div className="signup-input">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <div className="signup-input">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Confirm Password" />
            </div>
            <button type="submit" className="signup-button">Sign up</button>
          </form>

          <div className="signup-or">OR</div>

          <button className="signup-google">sign up with google</button>

          <p className="signup-login-link">
            Already have an account? <span>login</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default signup;
