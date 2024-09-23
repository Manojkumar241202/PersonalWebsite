import React from 'react';
import './Preloader.css';

const Preloader = () => {
  const preload=  () => {
    setTimeout(() => {
      const preloader = document.querySelector('.cs_preloader');
      if (preloader) {
        preloader.style.opacity = 0;
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 700);
      }
    }, 150);
  };

  return (
    <div id="preloader" className="preloader cs_preloader">
      {preload()}
      <div className="black_wall"></div>
      <div className="loader"></div>
    </div>
    
  );
};

export default Preloader;
