import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import videoSrc from './BGV.mp4'; // Adjust the path if needed
import BackgroundVideo from './BGVJS';

const Home = () => {
  return (
    
      <BackgroundVideo videoSrc={videoSrc}>

      <div className="content">
        <h1 style={{ color: 'white' }}>Pizzeria Admin Portal</h1>
      </div>
        <br /><br /><br /><br />    
      <div className="content2">
        <h3 style={{color: 'red'}}>Select Admin Panel</h3>
        <Link to="/counter"><button>Counter Admin</button></Link>
        <Link to="/kitchen"><button>Kitchen Admin</button></Link>
        <Link to="/analyst"><button>Business Analyst</button></Link>
      </div>

      </BackgroundVideo>
    
  );
};

export default Home;
