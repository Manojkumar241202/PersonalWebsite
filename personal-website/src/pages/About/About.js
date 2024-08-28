import React, {useState, useRef, useEffect} from 'react';
import SectionTitle from '../../utils/TitleSection';
import "./About.css";
import SwipeButton from "../../utils/SwipeButton"
import { handleDownload } from '../../utils/handlers/HandleDownload';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';

const About = () => {
  const experience_grid= useRef(null);
  const [experience_grid_columns, set_experience_grid_columns] = useState(0);

  const initialize_ratings_form_session= (rating_platform) =>{
    const saved_ratings = sessionStorage.getItem(rating_platform);
    return saved_ratings ? JSON.parse(saved_ratings) : "loading";
  }
  const [codechef_rating, set_codechef_rating]= useState(initialize_ratings_form_session("codechef_ratings"));
  const [codeforces_rating, set_codeforces_rating]= useState(initialize_ratings_form_session("codeforces_ratings"));
  const [leetcode_rating, set_leetcode_rating]= useState(initialize_ratings_form_session("leetcode_ratings"));
  const [atcoder_rating, set_atcoder_rating]= useState(initialize_ratings_form_session("atcoder_ratings"));



  const fetchRatings= (platform, setValue, session_key)=>{
    axios.get("http://localhost:3001/ratings")
    .then(response => {
      const rating= response.data.data["resources"][platform]["highest"]["value"];
      const round_off_rating= Math.floor(rating/100)*100;
      setValue(round_off_rating);
      sessionStorage.setItem(session_key, JSON.stringify(round_off_rating))
      console.log(`${platform}: ` + round_off_rating);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  };
  

  useEffect(()=>{
    fetchRatings("codeforces.com", set_codeforces_rating, "codeforces_ratings");
    fetchRatings("codechef.com", set_codechef_rating, "codechef_ratings");
    fetchRatings("leetcode.com", set_leetcode_rating, "leetcode_ratings");
    fetchRatings("atcoder.jp", set_atcoder_rating, "atcoder_ratings");
  }, []);

  useEffect(() => {
    if (experience_grid.current) {
        // Count the number of children elements
        const count = experience_grid.current.children.length;;

        // Set the number of columns based on the count
        //currently unabling this functionlaity for space
        if (count < 4 && false) {
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
                  <ul className="responsibilities">
                    <li>Developed and maintained backend asynchoronous applications using python, fastapi and langchain.</li>
                    <li>Collaborated with cross-functional teams to define and deliver solutions.</li>
                  </ul>
                  <div className="projects">
                    <h3>Projects:</h3>
                    <ul>
                      <li><strong>ECG ANALYZER:</strong> Provides ecg insights for ecg_image.</li>
                    </ul>
                  </div>
                </div>
            </li>
            <li className="experience-item">
                <div className="icon">
                    <i className="fa fa-briefcase"></i>
                </div>
                <div className="experience-info">
                    <div className="time">
                        APR 2024 - JUN 2024
                    </div>
                    <h5 className="role">
                        SOFTWARE ENGINEER INTERN
                        <span> - NFERENCE</span>
                    </h5>
                  <ul className="responsibilities">
                    <li>Developed and maintained backend applications using python, fastapi and langchain.</li>
                    <li>Collaborated with cross-functional teams to define and deliver solutions.</li>
                  </ul>
                  <div className="projects">
                    <h3>Projects:</h3>
                    <ul>
                      <li><strong>ECG ANALYZER:</strong> Provides ecg insights for ecg_image.</li>
                    </ul>
                  </div>
                </div>
            </li>
        </ul>
    </div>
    </div>
  );
}

export default About;
