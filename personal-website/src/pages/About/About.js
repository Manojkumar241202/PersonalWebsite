import React from 'react';
import SectionTitle from '../../utils/TitleSection';
import "./About.css";
import SwipeButton from "../../utils/SwipeButton"
import { handleDownload } from '../../utils/handlers/HandleDownload';

const About = () => {
  return (
    <div className="about-page">
      <SectionTitle background_text="RESUME" grey_text="ABOUT " yellow_text="ME " />

      <div className="infos">
        <div className="personal_infos">
          <h2>PERSONAL INFOS</h2>
          <ul>
            <li>First name: <span>Manojkumar</span></li>
            <li>Last Name: <span>Palanisamy</span></li>
            <li>Age: <span>21</span></li>
            <li>Nationality: <span>Indian</span></li>
            <li>Address: <span>temp</span></li>
            <li>Phone: <span>+91 6362500396</span></li>
            <li>Email: <span>manojkumar.p24cse@gmail.com</span></li>
            <li>Linkedin: <a href="https://www.linkedin.com/in/manojkumar-p24/"><span>manojkumar-p24</span></a></li>
          </ul>
          
          <div className="download_button">
            <SwipeButton icon="fa fa-download" button_text={"DOWNLOAD CV"} onClick= {()=>handleDownload("/Manojkumar_resume.pdf")}></SwipeButton>
          </div>
        </div>
        <div className="ratings">
          <h2>Ratings</h2>
        </div>
      </div>
      
    </div>
  );
}

export default About;
