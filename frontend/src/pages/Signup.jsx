import './Signup.css';
import React, { useContext, useReducer, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { LoginContext } from "../components/TokenProvider";
import GenericModal from "../components/GenericModal";
import "./Signup.css";

const initialSignupState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  type: "user"
};

const initialModalState = {
  title: "",
  desc: "",
  redirect: ""
};

function formReducer(state, action) {
  switch (action.type) {
    case "updateField":
      return {
        ...state,
        [action.field]: action.value
      };
    case "reset":
      return initialSignupState;
    default:
      return state;
  }
}

const Signup = () => {
  const { t } = useTranslation();
  const modal = useRef();
  const { token, setToken } = useContext(LoginContext);
  const [modalState, setModalState] = useState(initialModalState);
  const [formState, setFormState] = useReducer(formReducer, initialSignupState);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      type: "updateField",
      field: name,
      value: value
    });
  };

  const tryRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`
        },
        body: JSON.stringify(formState)
      });

      const data = await response.json();
      if (response.ok) {
        setToken(data.accessToken);
        setModalState({
          title: t("signupSuccess"),
          desc: `Welcome: ${data.user.username}`
        });
      } else {
        setModalState({
          title: t("signupFailed"),
          desc: data.message
        });
      }
    } catch (error) {
      setModalState({
        title: t("signupFailed"),
        desc: error.message
      });
    } finally {
      modal.current.showModal();
    }
  };

  return (
    <div className="signup-container">
      <GenericModal ref={modal} {...modalState} />
      <div className="signup-window">
        <div className="signup-header">
          <div className="signup-profile">
            <i className="fas fa-user-circle"></i>
          </div>
        </div>

        <div className="signup-content">
          <div className="signup-title">
            <i className="fas fa-lock"></i>
            <span className="signup-text">{t("signup")}</span>
          </div>

          <p className="signup-subtitle">{t("signupSubtitle")}</p>

          <form className="signup-form" onSubmit={tryRegister}>
            <div className="signup-input">
              <i className="fas fa-user"></i>
              <input
                name="username"
                type="text"
                placeholder={t("username")}
                value={formState.username}
                onChange={handleFormChange}
              />
            </div>
            <div className="signup-input">
              <i className="fas fa-envelope"></i>
              <input
                name="email"
                type="email"
                placeholder={t("email")}
                value={formState.email}
                onChange={handleFormChange}
              />
            </div>
            <div className="signup-input">
              <i className="fas fa-lock"></i>
              <input
                name="password"
                type="password"
                placeholder={t("password")}
                value={formState.password}
                onChange={handleFormChange}
              />
            </div>
            <div className="signup-input">
              <i className="fas fa-lock"></i>
              <input
                name="confirmPassword"
                type="password"
                placeholder={t("confirmPassword")}
                value={formState.confirmPassword}
                onChange={handleFormChange}
              />
            </div>
            <button type="submit" className="signup-button">
              {t("signup")}
            </button>
          </form>

          <div className="signup-or">{t("or")}</div>
          <button className="signup-google">{t("signupWithGoogle")}</button>

          <p className="signup-login-link">
            {t("alreadyHaveAccount")} <a href="/login">{t("login")}</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
