import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Importing necessary hooks
import './styles.css';
import videoSrc from './bgv4.mp4'; // Adjust the path if needed
import BackgroundVideo from './BGVJS';

const BusinessHome = () => {
  const navigate = useNavigate(); // Using useNavigate hook for navigation
  const location = useLocation(); // Using useLocation hook if you need to get the current path or state

  // Functions to handle button clicks for navigation
  const handleTrendsClick = () => {
    navigate('/trends'); // Navigate to Trends page
  };

  const handlePercentageSalesClick = () => {
    navigate('/percentage-sales'); // Navigate to Percentage Sales page
  };

  const handleBestWorstSalesClick = () => {
    navigate('/best-worst-sales'); // Navigate to Best & Worst Sales page
  };

  const handleNotepadClick = () => {
    navigate('/notepad'); // Navigate to Notepad page
  };

  return (
    <BackgroundVideo videoSrc={videoSrc}>
    <div className="business-home">
      <h2 style={{color:'white'}}>Business Analyst Options</h2>
      <div className="button-container">
        <button onClick={handleTrendsClick}>Trends</button>
        <button onClick={handlePercentageSalesClick}>Percentage Sales</button>
        <button onClick={handleBestWorstSalesClick}>Best & Worst Sales</button>
        <button onClick={handleNotepadClick}>Notepad</button>
      </div>
    </div>
    </BackgroundVideo>
  );
};

export default BusinessHome;
