import React, { useEffect, useState } from 'react';
import '../styles/dashboard.css'; // make sure you import the updated css!
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from 'recharts';

const CityOfficialDashboard = () => {
  const [issues, setIssues] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [safetyFeedbacks, setSafetyFeedbacks] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [filters, setFilters] = useState({ search: '', date: '' });

  useEffect(() => {
    if (authenticated) {
      fetch('http://localhost:5000/api/issues')
        .then(res => res.json())
        .then(data => {
          console.log("Issues data:", data); 
          setIssues(data);
          console.log("filtered Issues",filteredIssues);
          setFilteredIssues(data);
          
        })
        .catch(err => console.log(err));

      fetch('http://localhost:5000/api/feedback/safety-feedbacks')
        .then(res => res.json())
        .then(data => setSafetyFeedbacks(data))
        .catch(err => console.log(err));
    }
  }, [authenticated]);

  const handleLogin = () => {
    if (password === 'cityAdminPassword') {
      setAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const issueCountsByTitle = issues.reduce((acc, issue) => {
    let title = issue.title ? issue.title.toLowerCase() : 'untitled';
  
    // Group all pothole-related issues under one category
    if (title.includes("pothole")) {
      title = "Potholes";
    }else if(title.includes("garbage")){
      title = "Garbage Dump";
    } 
    else {
      // Capitalize first letter for cleaner chart labels
      title = issue.title ? issue.title.charAt(0).toUpperCase() + issue.title.slice(1) : "Untitled";
    }
  
    acc[title] = (acc[title] || 0) + 1;
    return acc;
  }, {});
  

  // Format the data for the Pie chart
  const chartData = Object.entries(issueCountsByTitle).map(([title, count]) => ({
    name: title,
    value: count
  }));

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);

    const filtered = issues.filter((issue) => {
      const issueDate = new Date(issue.createdAt);
      const issueDateString = `${issueDate.getFullYear()}-${String(issueDate.getMonth() + 1).padStart(2, '0')}-${String(issueDate.getDate()).padStart(2, '0')}`;

      const matchesDate = updatedFilters.date
        ? issueDateString === updatedFilters.date
        : true;

      const matchesText = updatedFilters.search
        ? (
            issue.title.toLowerCase().includes(updatedFilters.search.toLowerCase()) ||
            issue.location.toLowerCase().includes(updatedFilters.search.toLowerCase())
          )
        : true;

      return matchesDate && matchesText;
    });

    setFilteredIssues(filtered);
  };

  if (!authenticated) {
    return (
      <div className="login-container">
        <h2>City Official Login</h2>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1>City Official Dashboard</h1>

      {/* Filters */}
      <div className="filter-container">
        <input
          type="text"
          name="search"
          placeholder="Search by title or location"
          value={filters.search}
          onChange={handleFilterChange}
        />
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
        />
      </div>

       {/* Issues Distribution Pie Chart */}
       <div className="dashboard-section">
        <h3>Issues Grouped by Title</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index % 4]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>


      {/* Reported Issues */}
      <div className="dashboard-section">
        <h2>Reported Issues</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Location</th>
              <th>Image</th>
              <th>Reported At</th>
            </tr>
          </thead>
          <tbody>
            {filteredIssues.map((issue, index) => (
              <tr key={index}>
                <td>{issue.title}</td>
                <td>{issue.description}</td>
                <td>{issue.location}</td>
                <td>
                  {issue.image && (
                    <a href={issue.image} target="_blank" rel="noopener noreferrer">View</a>
                  )}
                </td>
                <td>{new Date(issue.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
              {/* Bar Chart for Safety Feedback by Issue Type */}
<div className="dashboard-section">
  <h3>Safety Feedback Count by Issue Type</h3>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart
      data={
        Object.entries(
          safetyFeedbacks.reduce((acc, fb) => {
            const type = fb.issueType || "Unknown";
            acc[type] = (acc[type] || 0) + 1;
            return acc;
          }, {})
        ).map(([type, count]) => ({
          issueType: type,
          count: count
        }))
      }
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="issueType" />
      <YAxis allowDecimals={false} />
      <Tooltip />
      <Bar dataKey="count" fill="#00C49F" />
    </BarChart>
  </ResponsiveContainer>
</div>

      {/* Safety Feedbacks */}
      <div className="dashboard-section">
        <h2>Safety Feedback Submissions</h2>
        <table>
          <thead>
            <tr>
              <th>Anonymous</th>
              <th>Location</th>
              <th>Issue Type</th>
              <th>Rating</th>
              <th>Time of Day</th>
              <th>Message</th>
              <th>Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {safetyFeedbacks.map((safety, index) => (
              <tr key={index}>
                <td>{safety.isAnonymous ? 'Yes' : 'No'}</td>
                <td>{safety.location}</td>
                <td>{safety.issueType}</td>
                <td>{safety.rating}</td>
                <td>{safety.timeOfDay}</td>
                <td>{safety.message}</td>
                <td>{new Date(safety.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CityOfficialDashboard;


