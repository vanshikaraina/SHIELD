//home.js

// import React from 'react';

// // import { Link } from 'react-router-dom';
// import '../styles/home.css';
// const Home = () => {
//   return (
//     <div className="home">
//       {/* Main Hero Section */}
//       <div className="hero">
//         <h1>Welcome to S.H.I.E.L.D</h1>
//         <h4>Secure Help & Information for Every Local District</h4>
//         <p>Report issues and ensure the safety of your community.</p>
//         <div className="home-buttons">
//           <button>
//             <a href="/report-issue">Report an Issue</a>
//           </button>
//           <button>
//             <a href="/safety-feedback">Give Safety Feedback</a>
//           </button>
//         </div>
//       </div>
//       {/* <div className="sensitiveIssues">
//         <h2>For Sensitive Issues</h2>
//         <p>Some issues may require extra privacy and confidentiality. You can report them here safely and securely.</p>
//         <button>
//           <Link to="/sensitive-issues"><button>Submit Sensitive Issue</button></Link>
//         </button>
//       </div> */}
  
//     </div>
//   );
// };
// export default Home;


// import React from 'react';
// // import SensitiveIssues from './SensitiveIssues';
// import {useState, useEffect, Link } from 'react-router-dom';
// import '../styles/home.css';

// const Home = () => {
//   return (
//     <div className="home">
//       {/* Main Hero Section */}
//       <div className="hero">
//         <h1>Welcome to S.H.I.E.L.D</h1>
//         <h4>Secure Help & Information for Every Local District</h4>
//         <p>Report issues and ensure the safety of your community.</p>
//         <div className="home-buttons">
//           <button>
//             <a href="/report-issue">Report an Issue</a>
//           </button>
//           <button>
//             <a href="/safety-feedback">Give Safety Feedback</a>
//           </button>
//         </div>
//       </div>

//       <div className="sensitiveIssues">
//         <h2>For Sensitive Issues</h2>
//         <p>Some issues may require extra privacy and confidentiality. You can report them here safely and securely.</p>
//         <Link to="/sensitive-issues"><button>Submit Sensitive Issue</button></Link>
//       </div>

//     {/* <SensitiveIssues /> */}

//     </div>
//   );
// };

// export default Home;



// import React from 'react';
// // import SensitiveIssues from './SensitiveIssues';
// import {useState, useEffect, Link } from 'react-router-dom';
// import '../styles/home.css';

// const Home = () => {
//   return (
//     <div className="home">
//       {/* Main Hero Section */}
//       <div className="hero">
//         <h1>Welcome to S.H.I.E.L.D</h1>
//         <h4>Secure Help & Information for Every Local District</h4>
//         <p>Report issues and ensure the safety of your community.</p>
//         <div className="home-buttons">
//           <button>
//             <a href="/report-issue">Report an Issue</a>
//           </button>
//           <button>
//             <a href="/safety-feedback">Give Safety Feedback</a>
//           </button>
//         </div>
//       </div>

//       <div className="sensitiveIssues">
//         <h2>For Sensitive Issues</h2>
//         <p>Some issues may require extra privacy and confidentiality. You can report them here safely and securely.</p>
//         <Link to="/sensitive-issues"><button>Submit Sensitive Issue</button></Link>
//       </div>

//     {/* <SensitiveIssues /> */}

//     </div>
//   );
// };

// export default Home;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/home.css';


const sliderImages = [
  '/images/slide1.jpg',
  // '/images/slide2.jpg',
  '/images/slide3.jpg',
  '/images/slide4.jpg',
  '/images/slide5.jpg',
  // '/images/slide6.jpg',
  // '/images/slide7.jpg',
];

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % sliderImages.length);
    }, 3000); // change image every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      {/* Hero Slider Section */}
      <div
        className="hero-slider"
        style={{
          backgroundImage: `url(${sliderImages[currentImage]})`,

          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          width: '100%',
          // height: 'calc(100vh - 100px)',  // Reduced height by 200px
          // width: 'calc(100% - 100px)',    // Reduced width by 200px
        }}
      >
        <div className="hero-overlay">
          <h1>Welcome to Safestreets</h1>
          <h4>Secure Help & Information for Every Local District</h4>
          <p>Report issues and ensure the safety of your community.</p>
          <div className="home-buttons">
            <button>
              <Link to="/report-issue">Report an Issue</Link>
            </button>
            <button>
              <Link to="/safety-feedback">Give Safety Feedback</Link>
            </button>
          </div>
        </div>
      </div>

      {/* Sensitive Issues Section */}
      <div className="sensitiveIssues">
        <h2>For Sensitive Issues</h2>
        <p>Some issues may require extra privacy and confidentiality. You can report them here safely and securely.</p>
        <Link to="/sensitive-issues">
          <button>Submit Sensitive Issue</button>
        </Link>
      </div>

<div className="focus-section">
  <h2>Our Focus</h2>
  <div className="focus-container">
    <div className="focus-box">
      <h3>Main Issue 1: Community Safety</h3>
      <ul>
        <li>Reporting street harassment</li>
        <li>Unsafe areas</li>
        <li>Neighborhood crime</li>
      </ul>
    </div>
    <div className="focus-box">
      <h3>Main Issue 2: Public Infrastructure</h3>
      <ul>
        <li>Ill-maintained roads</li>
        <li>Potholes and broken sidewalks</li>
        <li>Streetlights and signage</li>
      </ul>
    </div>
    <div className="focus-box">
      <h3>Main Issue 3: Environmental Concerns</h3>
      <ul>
        <li>Illegal dumping</li>
        <li>Street cleaning</li>
        <li>Pollution in public spaces</li>
      </ul>
    </div>
  </div>
</div>


       {/* Police Section */}
       <div className="police-section">
       
   
        <div className="police-content">
        <h2><i className="fas fa-shield-alt"></i> Police Assistance</h2>
        <p>
          Your safety is our priority. The local police are committed to ensuring a secure environment for everyone in the community. 
          If you ever need assistance, please don’t hesitate to reach out.
        </p>
      </div>
      
        <div className="police-image">
          <img
            src="https://wallpapers.com/images/hd/indian-police-honor-guard-v37tf0vqrttw3oag.jpg"
            alt="Indian Police"
          />
        </div>
      </div>

<h2 className='justtitle'>Start Being Aware✨</h2>

{/* Ill-Maintained Roads Section */}
<div className="info-section">
  <div className="info-text">
    <h2>Ill-Maintained Roads</h2>
    <p>
      Broken roads, potholes, and damaged sidewalks pose serious risks to pedestrians and drivers alike. 
      Reporting these issues helps create a safer, more accessible environment for everyone in the community.
    </p>
  </div>
  <div className="info-image">
    <img src="https://media.istockphoto.com/id/506325423/vector/barrier-at-sinkhole-in-street.jpg?s=612x612&w=0&k=20&c=6VIvWRx7dAcRaGErVjp-gMvvCo8dudfbWFlHRP5S6ts=" alt="Broken Roads" />
  </div>
</div>

      {/* Harassment Info Section */}
<div className="info-section">
  <div className="info-text">
    <h2>Harassment</h2>
    <p>
      Harassment can take many forms and may cause emotional, mental, or even physical harm. 
      It’s important to report such incidents promptly and securely. Your voice matters, and we are here to support you in ensuring a safer community.
    </p>
  </div>
  <div className="info-image">
    <img src="https://png.pngtree.com/png-clipart/20221010/original/pngtree-stop-bullying-with-two-kids-a-kid-in-the-middle-png-image_8671809.png" alt="Harassment Awareness" />
  </div>
</div>

{/* Vandalism Section */}
<div className="info-section">
  <div className="info-text">
    <h2>Vandalism</h2>
    <p>
      Acts of vandalism, such as graffiti, property destruction, and defacement, harm the beauty and safety of our neighborhoods. 
      Reporting vandalism helps maintain the integrity of our community spaces and discourages further damage.
    </p>
  </div>
  <div className="info-image">
    <img src="https://s3u.tmimgcdn.com/800x0/u11195131/be64842d99de83f3280bf2664db80a4d.jpg" alt="Vandalism Awareness" />
  </div>
</div>

{/* Clean Roads Section */}
<div className="info-section">
  <div className="info-text">
    <h2>Clean Roads Initiative</h2>
    <p>
      Keeping our streets clean promotes a healthier environment and boosts community pride. 
      Reporting trash accumulation, illegal dumping, and unsanitary conditions helps ensure cleaner and safer neighborhoods for everyone.
    </p>
  </div>
  <div className="info-image">
    <img src="https://thumbs.dreamstime.com/b/cartoon-street-cleaner-sweeper-kids-professions-cartoon-street-cleaner-sweeper-sweeping-out-autumn-leaves-design-children-s-106643649.jpg" alt="Clean Roads Initiative" />
  </div>
</div>
{/* Safety Tips Section */}
<div className="info-section safety-tips">
  <div className="info-text">
    <h2>Safety Tips</h2>
    <p>
      Staying informed and alert is key to a safer community. 
      Here are some quick safety tips you can follow to protect yourself and others:
    </p>
    <ul className="safety-tips-list">
      <li>🚶‍♂ Stay aware of your surroundings at all times.</li>
      <li>📞 Always have emergency contact numbers handy.</li>
      <li>🚦 Follow traffic rules and only cross roads at designated crossings.</li>
      <li>🧍 Avoid isolated or poorly lit areas, especially at night.</li>
      <li>🗣 Report any suspicious activity immediately to authorities.</li>
      <li>👥 Encourage community watch programs for collective safety.</li>
    </ul>
  </div>
  <div className="info-image">
    <img src="https://img.freepik.com/free-vector/public-safety-concept-illustration_114360-7582.jpg" alt="Community Safety Tips" />
  </div>
</div>



    </div>
  );
};

export default Home;