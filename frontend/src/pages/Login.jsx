import './Login.css';
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LoginContext } from "../components/TokenProvider";

const Login = () => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const { setToken } = useContext(LoginContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.accessToken);
        navigate("/");
      } else {
        setError(data.message || t("login.error"));
      }
    } catch (err) {
      setError(err.message || t("login.error"));
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "fr" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <p onClick={toggleLanguage} className='translateTxtLogin'>
          {i18n.language === "en" ? "Français" : "English"}
        </p>
        <h2>{t("login.title")}</h2>
        <p>{t("login.subtitle")}</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="icon">👤</span>
            <input
              type="text"
              placeholder={t("profiledetails.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <span className="icon">🔒</span>
            <input
              type="password"
              placeholder={t("profiledetails.password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">{t("buttons.login")}</button>
        </form>
        <p>{t("login.or")}</p>
        <button className="google-btn">{t("buttons.google")}</button>
        <p>
          <a href="/forgot-password">{t("login.forget")}</a>
        </p>
        <p>
          <a href="/signup">
            {t("login.noAccount")} {t("login.signup")}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
