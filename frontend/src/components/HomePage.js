import React from 'react';
import './homePage.css';

const HomePage = () => {
  return (
    <div>
      <div id='landing-header'>
        <h1>Welcome to Image Gallery</h1>
        <a href='/images' className='btn btn-lg btn-success'>
          View All Images
        </a>
      </div>
      <div className='slideshow'>
      </div>
    </div>
  );
};

export default HomePage;
