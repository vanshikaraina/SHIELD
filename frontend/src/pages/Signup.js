import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Updated import
import '../styles/form.css';  // Using the same CSS file as Login

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword && username && email) {
      try {
        const response = await fetch('http://localhost:5000/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password })
        });
        const data = await response.json();

        if (response.ok) {
          navigate('/safety-feedback');
        } else {
          alert(data.message || 'Signup failed');
        }
      } catch (err) {
        alert('Server error, please try again');
      }
    } else {
      alert('Please fill in all fields and ensure the passwords match.');
    }
  };

  return (
    <div className="form-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn">Sign Up</button>
      </form>

      <div className="form-footer">
        <p>
          Already have an account? <span onClick={() => navigate('/login')} className="link-text">Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
