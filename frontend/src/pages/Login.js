import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/form.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
          credentials: 'include',  // Ensure session cookie is sent
        });

        const data = await response.json();

        if (response.ok) {
          // ✅ Set login flag in localStorage
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userEmail', email); // optional, useful if you want to show user's name later
          
          navigate(from, { replace: true });
          window.location.reload(); // Ensures navbar updates
        } else {
          alert(data.message || 'Login failed');
        }
      } catch (err) {
        alert('Server error, please try again');
      }
    } else {
      alert('Please fill in both fields.');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
      <div className="form-footer">
        <p>
          Don't have an account?{' '}
          <span onClick={() => navigate('/signup')} className="link-text">Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
