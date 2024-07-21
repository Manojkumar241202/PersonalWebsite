import React from 'react';
import "./Home.css";
import "./MoreAboutMe.css";
import nobg_profile from "./nobg_profile-modified.png"
import '@fortawesome/fontawesome-free/css/all.min.css';
import { NavLink } from 'react-router-dom';
const Home = () => {

  return (
    <div className="home">
      <div className= "bg-skew"></div>
      {/* <img src={require("./profile.jpg")} alt="profile"></img> */}
      <div className= "home-content">
        <div className='profile' style= {{ backgroundImage: `url(${nobg_profile})`}}></div>
        <div className='home-details'>
          <div className='intro'>
            <div className='dash'></div>
            <h1 className='name'>I'M MANOJKUMAR.
              <span>SOFTWARE ENGINEER</span>
            </h1>
          </div>
          <div className='description'>
            <p>A software engineer is a professional who applies principles of computer science, engineering, and mathematics to Their role is critical in the ever-evolving digital landscape, driving innovation and technological advancement.</p>
          </div>
          <div className='temp'>
            <NavLink to="/about-me" style={{ textDecoration: 'none' }}>
              <div className='about-me'>
                MORE ABOUT ME
                <i className='fas fa-arrow-right'></i>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
