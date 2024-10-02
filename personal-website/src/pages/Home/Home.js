import React, { useEffect } from 'react';
import "./Home.css";
import nobg_profile from "./nobg_profile-modified.png"
import '@fortawesome/fontawesome-free/css/all.min.css';
import { NavLink } from 'react-router-dom';
import SwipeButton from '../../utils/SwipeButton';
import Preloader from '../../utils/preloader/Preloader';
import axios from 'axios';
const Home = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        if(sessionStorage.getItem("ratings")){
          return;
        }
        const response = await axios.get("/ratings");
        if (response.data.resources) {
          sessionStorage.setItem("ratings", JSON.stringify(response.data));
  
        } else {
          console.error(`No data found in resources backend.`);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    const fetchTitles = async () => {
      try {
        if(sessionStorage.getItem("titles")){
          return;
        }
        const response = await axios.get("/titles");
        if (response.data.resources) {
          sessionStorage.setItem("titles", JSON.stringify(response.data));
  
        } else {
          console.error(`No data found in resources backend.`);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    fetchTitles();
  }, []);
  
  return (
    <div className="home">
      <Preloader/>
      <div className= "bg-skew"></div>
      {/* <img src={require("./profile.jpg")} alt="profile"></img> */}
      <div className= "home-content">
        <div className='profile' style= {{ backgroundImage: `url(${nobg_profile})`}}></div>
        <div className='home-details'>
          <div className='intro'>
            <h1 className='name'>I'M MANOJKUMAR.
              <span>SOFTWARE ENGINEER</span>
            </h1>
          </div>
          <div className='description'>
            <p>A software engineer is a professional who applies principles of computer science, engineering, and mathematics to Their role is critical in the ever-evolving digital landscape, driving innovation and technological advancement.</p>
          </div>
            <NavLink to="/about-me" style={{ textDecoration: 'none',  display: 'flex' }}>
              <SwipeButton button_text="MORE ABOUT ME" icon='fas fa-arrow-right'/>
            </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Home;
