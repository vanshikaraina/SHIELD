import React, { useState } from 'react';
import '../styles/issueReporting.css';

const IssueReporting = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    image: null
  });
  const [lastSubmittedId, setLastSubmittedId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Step 1: Check if user is authenticated
      const authCheck = await fetch('http://localhost:5000/api/auth/check-login', {
        method: 'GET',
        credentials: 'include' // send cookies!
      });
      const authResult = await authCheck.json();
  
      if (!authCheck.ok || !authResult.loggedIn) {
        alert('Please log in to report an issue.');
        window.location.href = '/login'; // redirect to login
        return;
      }
  
      // Step 2: Proceed to submit issue if logged in
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('location', formData.location);
      if (formData.image) {
        data.append('image', formData.image);
      }
  
      const response = await fetch('http://localhost:5000/api/issues', {
        method: 'POST',
        body: data,
        credentials: 'include' // VERY IMPORTANT
      });
  
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setLastSubmittedId(result.issueId);
        setShowConfirmation(true);
        setFormData({ title: '', description: '', location: '', image: null });
      } else {
        alert('Failed to submit issue: ' + result.message);
      }
  
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };
  

  const handleEdit = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/issues/${lastSubmittedId}`);
      const issue = await res.json();
      setFormData({
        title: issue.title,
        description: issue.description,
        location: issue.location,
        image: null
      });
      setShowConfirmation(false);
    } catch (err) {
      alert('Error fetching issue: ' + err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/issues/${lastSubmittedId}`, {
        method: 'DELETE'
      });
      const result = await res.json();
      alert(result.message);
      setShowConfirmation(false);
    } catch (err) {
      alert('Error deleting issue: ' + err.message);
    }
  };

  return (
    <div className="issue-reporting-page">
      <div className="issue-reporting-form-container">
        <h2>Report an Issue</h2>
        <form onSubmit={handleSubmit} className="issue-form" encType="multipart/form-data">
          <label>Issue Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="E.g. Street Light Not Working"
          />

          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Provide detailed description of the issue"
          />

          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="E.g. Main Street, Sector 21"
          />

          <label>Upload Image (optional)</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />

          <button type="submit" className="submit-btn">Submit Issue</button>
        </form>

        {showConfirmation && (
          <div className="confirmation-box">
            <p>Are you satisfied with your complaint?</p>
            <div className="confirmation-actions">
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
              <button onClick={() => setShowConfirmation(false)}>Dismiss</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueReporting;