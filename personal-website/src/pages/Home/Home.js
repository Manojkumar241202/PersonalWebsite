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
        const response = await axios.get("/api/ratings");
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
        const response = await axios.get("/api/titles");
        if (response.data) {
          sessionStorage.setItem("titles", JSON.stringify(response.data));
  
        } else {
          console.error(`No data found in resources backend.`);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchResume = async () => {
      let response = {};
      try {
        if (sessionStorage.getItem(`resumeURL`)){
          response= JSON.parse(sessionStorage.getItem(`resumeURL`));
        }
        else{
          response = await axios.get('/api/resume');
          response= response.data;
          sessionStorage.setItem(`resumeURL`,JSON.stringify(response));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchResume();
    fetchData();
    fetchTitles();
  }, []);
  
  return (
    <div className="home">
      <Preloader/>
      <div className= "bg-skew"></div>
      <div className= "home-content">
        <div className='profile' style= {{ backgroundImage: `url(${nobg_profile})`}}></div>
        <div className='home-details'>
          <div className='intro'>
            <h1 className='name'>I'M MANOJKUMAR.
              <span>SOFTWARE ENGINEER</span>
            </h1>
          </div>
          <div className='description'>
            <p>My journey into the tech world began in my third year of college, where I started an internship at nference. After completing my final year, I transitioned into a full-time role as a software engineer. Enthusiastic about learning new things, especially algorithms, and enjoying coding contests on CodeChef, Codeforces, and LeetCode.</p>
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
