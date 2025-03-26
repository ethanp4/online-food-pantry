 import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock authentication (replace with API call)
    if (email === 'test@example.com' && password === 'password123') {
      navigate('/'); // Redirect to home
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login Page</h2> {/* Add Heading */}
        <p>Enter your credentials to login</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="icon">👤</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <span className="icon">🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Login</button>
        </form>
        <p>OR</p>
        <button className="google-btn">Sign in with Google</button>
        <p><a href="/forgot-password">Forgot password?</a></p>
        <p><a href="/signup">Don't have an account? Signup</a></p>
      </div>
    </div>
  );
};

export default login; 