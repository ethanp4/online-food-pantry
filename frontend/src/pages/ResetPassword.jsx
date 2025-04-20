import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css" 

const ResetPassword = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // Step 1: verify, Step 2: reset
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleVerification = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch("http://localhost:5001/password-reset-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();

      if (res.ok) {
        setStep(2);
        setMessage("User verified. You may now reset your password.");
      } else {
        setError(data.message || "Username not found.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch("http://localhost:5001/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Password reset successfully. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(data.message || "Password reset failed.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-box">
        <h2>Reset Password</h2>
  
        {step === 1 && (
          <form onSubmit={handleVerification}>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <button type="submit">Verify Username</button>
          </form>
        )}
  
        {step === 2 && (
          <form onSubmit={handleResetPassword}>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit">Reset Password</button>
          </form>
        )}
  
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default ResetPassword