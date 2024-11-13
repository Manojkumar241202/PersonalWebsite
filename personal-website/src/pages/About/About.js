import React, {useState, useRef, useEffect} from 'react';
import SectionTitle from '../../utils/TitleSection';
import "./About.css";
import SwipeButton from "../../utils/SwipeButton"
import { handleDownload } from '../../utils/handlers/HandleDownload';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import Preloader from '../../utils/preloader/Preloader';
import nobg_profile from "./nobg_profile-modified.png"

const About = () => {
  const experience_grid= useRef(null);

  const [codechef_rating, set_codechef_rating]= useState("loading");
  const [codeforces_rating, set_codeforces_rating]= useState("loading");
  const [leetcode_rating, set_leetcode_rating]= useState("loading");
  const [atcoder_rating, set_atcoder_rating]= useState("loading");




  

  useEffect(() => {
    const fetchRatings = async () => {  // Declare as async
      let ratings = {};
  
      // Check if ratings exist in sessionStorage
      if (sessionStorage.getItem("ratings")) {
        ratings = JSON.parse(sessionStorage.getItem("ratings"));
      } else {
        try {
          const response = await axios.get("/api/ratings");  // Await the API call
          ratings = response.data;  // Store response data
          sessionStorage.setItem("ratings", JSON.stringify(response.data));  // Save to sessionStorage
        } catch (error) {
          console.error('Error fetching ratings:', error);  // Handle errors
          return;  // Exit if there's an error
        }
      }
  
      // Extract and set ratings
      try {
        let rating = ratings["resources"]["codechef.com"]["highest"]["value"];
        let round_off_rating = Math.floor(rating / 100) * 100;
        set_codechef_rating(round_off_rating);
  
        rating = ratings["resources"]["codeforces.com"]["highest"]["value"];
        round_off_rating = Math.floor(rating / 100) * 100;
        set_codeforces_rating(round_off_rating);
  
        rating = ratings["resources"]["leetcode.com"]["highest"]["value"];
        round_off_rating = Math.floor(rating / 100) * 100;
        set_leetcode_rating(round_off_rating);
  
        rating = ratings["resources"]["atcoder.jp"]["highest"]["value"];
        round_off_rating = Math.floor(rating / 100) * 100;
        set_atcoder_rating(round_off_rating);
      } catch (e) {
        console.error('Error processing ratings:', e);  // Handle errors during processing
      }
    };
  
    fetchRatings();  // Call the async function
  }, []);

  const experience_grid_dynamic_columns_style={
    display: 'grid'
  };
  return (
    <div className="about-page">
      <Preloader/>
      <SectionTitle background_text="RESUME" grey_text="ABOUT " yellow_text="ME " />

      <div className="infos">
        <div className="personal_infos">
          <h2>PERSONAL INFOS</h2>
          <div className='about_profile' style= {{ backgroundImage: `url(${nobg_profile})`}}></div>
          <ul>
            <li>First name: <span>Manojkumar</span></li>
            <li>Last Name: <span>Palanisamy</span></li>
            <li>Age: <span>21</span></li>
            <li>Nationality: <span>Indian</span></li>
            <li>Phone: <span>+91 6362500396</span></li>
            <li>Github: <a href="https://github.com/Manojkumar241202"><span>Manojkumar241202</span></a></li>
            <li>Email: <span>manojkumar.p24cse@gmail.com</span></li>
            <li>Linkedin: <a href="https://www.linkedin.com/in/manojkumar-p24/"><span>manojkumar-p24</span></a></li>
          </ul>
          
          <div className="download_button">
            <SwipeButton icon="fa fa-download" button_text={"DOWNLOAD CV"} onClick= {()=>handleDownload("/Manojkumar_resume.pdf")}></SwipeButton>
          </div>
        </div>
        <div className="ratings">
          <ul>
            <li>
              <h3>{codeforces_rating}</h3>
              { typeof codeforces_rating== "number" ? <span>+</span> : <></>}
              <p>RATING IN<br/>CODEFORCES</p>
            </li>
            <li>
            <h3>{codechef_rating}</h3>
            { typeof codechef_rating== "number" ? <span>+</span> : <></>}
              <p>RATING IN <br/>CODECHEF</p></li>
            <li>
            <h3>{leetcode_rating}</h3>
            { typeof leetcode_rating== "number" ? <span>+</span> : <></>}
              <p>RATING IN <br/>LEETCODE</p></li>
            <li>
            <h3>{atcoder_rating}</h3>
            { typeof atcoder_rating== "number" ? <span>+</span> : <></>}
              <p>RATING IN <br/>ATCODER</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="experience" >
        <h2>EXPERIENCE & EDUCATION</h2>
        <ul className="experience-list" ref={experience_grid} style={experience_grid_dynamic_columns_style}>
            <li className="experience-item">
                <div className="icon">
                    <i className="fa fa-briefcase"></i>
                </div>
                <div className="experience-info">
                    <div className="time">
                        JUN 2024 - PRESENT
                    </div>
                    <h5 className="role">
                        SOFTWARE ENGINEER
                        <span> - NFERENCE</span>
                    </h5>
                  <ul className="responsibilities">
                    <li>Developed and maintained the ECG Analyzer project, providing insights into heart-related findings from ECG images, including parameters and disorders.</li>
                    <li>Solely managed ecg_upload_analysis, ecg_context, and nfer_llm apps, specializing in ECG-focused chatbots.</li>
                  </ul>
                </div>
            </li>
            <li className="experience-item">
                <div className="icon">
                    <i className="fa fa-graduation-cap"></i>
                </div>
                <div className="experience-info">
                    <div className="time">
                        OCT 2020 - APR 2024
                    </div>
                    <h5 className="role">
                       BACHELOR OF ENGINEERING (COMPUTER SCIENCE)
                        <span> - SIET</span>
                    </h5>
                  <ul className="responsibilities">
                    <li>Ranked 1st in the college coding portal, won multiple symposium coding events, and secured runner-up in the Smart India Hackathon 2022.</li>
                  </ul>
                </div>
            </li>
            <li className="experience-item">
                <div className="icon">
                    <i className="fa fa-briefcase"></i>
                </div>
                <div className="experience-info">
                    <div className="time">
                        APR 2023 - JUN 2024
                    </div>
                    <h5 className="role">
                        SOFTWARE ENGINEER INTERN
                        <span> - NFERENCE</span>
                    </h5>
                  <ul className="responsibilities">
                    <li>Contributed to the development of a Knowledge Graph (KG) for medical terminology, significantly reducing anomalies in gene data.</li>
                    <li>Assisted in the ecg_context and nfer_llm apps, enhancing the ECG chatbot functionality.</li>
                  </ul>
                </div>
            </li>
            <li className="experience-item">
                <div className="icon">
                    <i className="fa fa-graduation-cap"></i>
                </div>
                <div className="experience-info">
                    <div className="time">
                        JUN 2018 - APR 2020
                    </div>
                    <h5 className="role">
                        SECONDARY SCHOOL
                        <span> - IJMS</span>
                    </h5>
                  <ul className="responsibilities">
                    <li>Scored 99% in Computer Science in the Secondary School Performance.</li>
                  </ul>
                </div>
            </li>
        </ul>
    </div>
    </div>
  );
}

export default About;
