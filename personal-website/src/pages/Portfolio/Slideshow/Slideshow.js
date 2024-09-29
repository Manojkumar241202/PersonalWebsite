import React, { useEffect, useState } from 'react';
import './Slideshow.css';
import './CBPGridGallery.js';  // Import your cbpGridGallery.js file

const SlideshowGallery = ({current_index=0}) => {
  const [itemIndex, setItemIndex] = useState(current_index); 
  useEffect(() => {
    // Ensure gallery is initialized after the component is mounted
    const initializeGallery = () => {
      const gridGalleryElement = document.getElementById('grid-gallery');
      if (window.CBPGridGallery && gridGalleryElement) {
        const gallery = new window.CBPGridGallery(gridGalleryElement);
        gallery._openSlideshow(current_index);  // Open the slideshow on the first item if desired
      }
    };

    initializeGallery();
    return ()=>{
        console.log("current_index: " + current_index);

    }
  }, [current_index]);

  return (
    <div className="portfolio portfolio-row">
      <div id="grid-gallery" className="grid-gallery">
        <section className="slideshow">
          <ul>
            <li>
              <figure>
                <figcaption>
                  <h3 className="m-0">CODEFORCES PROFILE</h3>
                  <ol className="more-info">
                    <li><i className="fas fa-user"></i> <strong>Username: </strong> Manojkumar2412</li>
                    <li><i className="fas fa-trophy"></i> <strong>Max rating: </strong> 1537</li>
                    <li><i className="fas fa-chart-line"></i> <strong>Current rating: </strong> 1447</li>
                    <li><i className="fas fa-star"></i> <strong>Title: </strong> Specialist</li>
                  </ol>
                </figcaption>
                <img
                  decoding="async"
                  src="/assets/portfolio/codeforces_logo.png"
                  alt="codeforces"
                />
              </figure>
            </li>
            <li>
              <figure>
                <figcaption>
                  <h3 className="m-0">CODECHEF PROFILE</h3>
                  <ol className="more-info">
                    <li><i className="fas fa-user"></i> <strong>Username: </strong> manojkumar2412</li>
                    <li><i className="fas fa-trophy"></i> <strong>Max rating: </strong> 1875 </li>
                    <li><i className="fas fa-chart-line"></i> <strong>Current rating: </strong> 1817</li>
                    <li><i className="fas fa-star"></i> <strong>Title: </strong> Four-Star</li>
                  </ol>
                </figcaption>
                <img
                  decoding="async"
                  src="/assets/portfolio/codechef_logo.png"
                  alt="codechef"
                />
              </figure>
            </li>
            <li>
              <figure>
                <figcaption>
                <h3 className="m-0">LEETCODE PROFILE</h3>
                  <ol className="more-info">
                    <li><i className="fas fa-user"></i> <strong>Username: </strong> manojkumar2412</li>
                    <li><i className="fas fa-trophy"></i> <strong>Max rating: </strong> 2056</li>
                    <li><i className="fas fa-chart-line"></i> <strong>Current rating: </strong> 1946</li>
                    <li><i className="fas fa-star"></i> <strong>Title: </strong> Guardian</li>
                  </ol>
                </figcaption>
                <img
                  decoding="async"
                  src="/assets/portfolio/leetcode_logo.png"
                  alt="Project"
                />
              </figure>
            </li>
            <li>
              <figure>
                <figcaption>
                  <h3 className="m-0">ATCODER PROFILE</h3>
                  <ol className="more-info">
                    <li><i className="fas fa-user"></i> <strong>Username: </strong> manojkumar2412</li>
                    <li><i className="fas fa-trophy"></i> <strong>Max rating: </strong> 862</li>
                    <li><i className="fas fa-chart-line"></i> <strong>Current rating: </strong> 862</li>
                    <li><i className="fas fa-star"></i> <strong>Title: </strong> 6-kyu</li>
                  </ol>
                </figcaption>
                <img
                  decoding="async"
                  src="/assets/portfolio/atcoder_logo.png"
                  alt="Project"
                />
              </figure>
            </li>
            <li>
              <figure className="project-figure">
              <figcaption>
                    <h3 className="m-0">AGROCULTURE PROJECT</h3>
                    <ol className="more-info project-details">
                        <li><i className="fas fa-leaf"></i> <strong>Focus: </strong> Eliminating Intermediaries in Agriculture</li>
                        <li><i className="fas fa-calendar-alt"></i> <strong>Timeline: </strong> AUG 2022 - NOV 2022</li>
                        <li><i className="fas fa-bullseye"></i> <strong>Goal: </strong>Direct Trading of Vegetables and Fruits</li>
                        <li><i className="fas fa-code"></i> <strong>Tech: </strong> React, Node.js</li>
                    </ol>
                </figcaption>
                <img
                  decoding="async"
                  src="/assets/portfolio/github_logo.png"
                  alt="Agroculture"
                />
              </figure>
            </li>
            <li>
            <figure className="project-figure">
              <figcaption>
                    <h3 className="m-0">GPT-CLONE PROJECT</h3>
                    <ol className="more-info project-details">
                        <li><i className="fas fa-leaf"></i> <strong>Focus: </strong> AI-Powered Chatbot with PDF Information Retrieval</li>
                        <li><i className="fas fa-calendar-alt"></i> <strong>Timeline: </strong>SEP 2023 - OCT 2023</li>
                        <li><i className="fas fa-bullseye"></i> <strong>Goal: </strong> Enable users to interactively retrieve information from uploaded PDFs</li>
                        <li><i className="fas fa-code"></i> <strong>Tech: </strong> Langchain, Python, OpenAI, RAG, Chroma (Vector DB)</li>
                    </ol>
                </figcaption>
                <img
                  decoding="async"
                  src="/assets/portfolio/chatbot_logo.png"
                  alt="voting_management"
                />
              </figure>
            </li>
          </ul>
          <nav>
            <span className="icon nav-prev">
              <img
                decoding="async"
                src="https://tunis-wp.ibthemespro.com/wp-content/plugins/tunis-toolkit/elementor-addons/../assets/img/left-arrow.png"
                alt="previous"
              />
            </span>
            <span className="icon nav-next">
              <img
                decoding="async"
                src="https://tunis-wp.ibthemespro.com/wp-content/plugins/tunis-toolkit/elementor-addons/../assets/img/right-arrow.png"
                alt="next"
              />
            </span>
            <span className="nav-close">
              <img
                decoding="async"
                src="https://tunis-wp.ibthemespro.com/wp-content/plugins/tunis-toolkit/elementor-addons/../assets/img/close-button.png"
                alt="close"
              />
            </span>
          </nav>
        </section>
      </div>
    </div>
  );
};

export default SlideshowGallery;
