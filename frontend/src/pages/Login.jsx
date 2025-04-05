import './Login.css';
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LoginContext } from "../components/TokenProvider";

const Login = () => {
  const { t } = useTranslation();
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
        setError(data.message || t("loginError"));
      }
    } catch (err) {
      setError(err.message || t("loginError"));
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{t("loginTitle")}</h2>
        <p>{t("loginSubtitle")}</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="icon">👤</span>
            <input
              type="text"
              placeholder={t("email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <span className="icon">🔒</span>
            <input
              type="password"
              placeholder={t("password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">{t("login")}</button>
        </form>
        <p>{t("or")}</p>
        <button className="google-btn">{t("loginWithGoogle")}</button>
        <p>
          <a href="/forgot-password">{t("forgotPassword")}</a>
        </p>
        <p>
          <a href="/signup">
            {t("noAccount")} {t("signup")}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
