import React, {useState, useRef, useEffect} from 'react';
import SectionTitle from '../../utils/TitleSection';
import "./About.css";
import SwipeButton from "../../utils/SwipeButton"
import { handleDownload } from '../../utils/handlers/HandleDownload';
import '@fortawesome/fontawesome-free/css/all.min.css';

const About = () => {
  const experience_grid= useRef(null);
  const [experience_grid_columns, set_experience_grid_columns] = useState(0);

  useEffect(() => {
    if (experience_grid.current) {
        // Count the number of children elements
        const count = experience_grid.current.children.length;;

        // Set the number of columns based on the count
        if (count < 4) {
          set_experience_grid_columns(1);
        } else {
          set_experience_grid_columns(2);
        }
    }
  }, []);

  const experience_grid_dynamic_columns_style={
    display: 'grid',
    gridTemplateColumns: `repeat(${experience_grid_columns}, 1fr)`,
  };
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
          <ul>
            <li>
              <h3>1400</h3>
              <span>+</span>
              <p>RATING IN<br/>CODEFORCES</p>
            </li>
            <li>
              <h3>1800</h3>
              <span>+</span>
              <p>RATING IN <br/>CODECHEF</p></li>
            <li>
              <h3>1900</h3>
              <span>+</span>
              <p>RATING IN <br/>LEETCODE</p></li>
            <li>
              <h3>800</h3>
              <span>+</span>
              <p>RATING IN <br/>ATCODER</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="experience" >
        <h2>EXPERIENCE</h2>
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
                </div>
            </li>
        </ul>
    </div>
    </div>
  );
}

export default About;
