//navbar.js

// import React, { useEffect, useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import '../styles/navbar.css';

// const Navbar = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check login status when Navbar loads
//     const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
//     setIsLoggedIn(loggedIn);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('isLoggedIn');  // Clear login status
//     setIsLoggedIn(false);  // Update UI
//     navigate('/login');    // Redirect to login page
//   };

//   return (
//     <nav className="navbar">
//       <div className="nav-left logo">
//         <NavLink to="/">SHIELD</NavLink>
//       </div>

//       <ul className="nav-center">
//         <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink></li>
//         <li><NavLink to="/report-issue" className={({ isActive }) => (isActive ? 'active' : '')}>Issue Reporting</NavLink></li>
//         <li><NavLink to="/safety-feedback" className={({ isActive }) => (isActive ? 'active' : '')}>Feedback</NavLink></li>
//         <li><NavLink to="/emergency-resources" className={({ isActive }) => (isActive ? 'active' : '')}>Emergency Resources</NavLink></li>
//         <li><NavLink to="/sensitive-issues" className={({ isActive }) => (isActive ? 'active' : '')}>Report Sensitive Issue</NavLink></li>
//       </ul>

//       <ul className="nav-right">
//         {isLoggedIn ? (
//           <li>
//             <button onClick={handleLogout} className="logout-btn">Logout</button>
//           </li>
//         ) : (
//           <>
//             <li>
//               <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>Login</NavLink>
//             </li>
//             <li>
//               <NavLink to="/signup" className={({ isActive }) => (isActive ? 'active' : '')}>Signup</NavLink>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-left logo">
        <NavLink to="/">SafeStreets</NavLink>
      </div>

      <ul className="nav-center">
        <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
        <li><NavLink to="/report-issue" className={({ isActive }) => isActive ? 'active' : ''}>Issue Reporting</NavLink></li>
        <li><NavLink to="/safety-feedback" className={({ isActive }) => isActive ? 'active' : ''}>Feedback</NavLink></li>
        <li><NavLink to="/emergency-resources" className={({ isActive }) => isActive ? 'active' : ''}>Emergency Resources</NavLink></li>
        <li><NavLink to="/sensitive-issues" className={({ isActive }) => isActive ? 'active' : ''}>Report Sensitive Issue</NavLink></li>
      </ul>

      <ul className="nav-right">
        {isLoggedIn ? (
          <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
        ) : (
          <>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/signup">Signup</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;