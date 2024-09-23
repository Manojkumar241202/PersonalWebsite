import SectionTitle from "../../utils/TitleSection";
import "./Contact.css";
import SwipeButton from "../../utils/SwipeButton";
import {useState} from "react";
import Preloader from "../../utils/preloader/Preloader";
import axios from 'axios';
const Contact= () =>{

    const initial_form_values = () => {
        const saved_formValues = sessionStorage.getItem("formValues");
        return saved_formValues ? JSON.parse(saved_formValues) : {
            name: '',
            email: '',
            subject: '',
            message: '',
        };
    };
    const [isVisible, setIsVisible] = useState(false);
  
    const togglePopup = () => {
    
      setIsVisible(!isVisible);
    };

    const [formValues, setFormValues] = useState(initial_form_values());

  const [formErrors, setFormErrors] = useState({
      name: false,
      email: false,
      subject: false,
      message: false,
  });

  const handleFormValidation = () => {
      const { name, email, subject, message } = formValues;

      const errors = {
          name: !name,
          email: !email || !/\S+@\S+\.\S+/.test(email),
          subject: !subject,
          message: !message,
      };

      setFormErrors(errors);

      return !Object.values(errors).some(error => error);
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form submission prevented');
      if (handleFormValidation()) {
          // Trigger the popup or form submission logic

          try {
            console.log(formValues);
            const response = axios
                                .post('/save_message', formValues)
                                .then((response) => console.log(response))
                                .catch((error) => console.error(error));
            console.log(response.data);
          } catch (error) {
            console.error('There was an error!', error);
          }
          togglePopup();

          // Clear the message field
          setFormValues(prevValues => ({
              ...prevValues,
              message: '',
              subject: ''
          }));
      } else {
          // Optionally, scroll to the first invalid input
          const firstInvalidInput = document.querySelector('.form-control:invalid');
          if (firstInvalidInput) {
              firstInvalidInput.scrollIntoView({ behavior: 'smooth' });
          }
      }
  };

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues(prevValues => ({
          ...prevValues,
          [name]: value
      }));
      sessionStorage.setItem("formValues", JSON.stringify(formValues))
  };
    return (
      <div className="contact-page">
        <Preloader/>
          <SectionTitle background_text="CONTACT" grey_text="GET  IN " yellow_text=" TOUCH " />
          <div className="contact_page">
              <div className="details">
                  <h2>DON'T BE SHY!</h2>
                  <p className="friendly_text">Feel free to get in touch with me. I am always open to discussing new projects, creative ideas or opportunities to be part of your visions.</p>
                  <div className="mail">
                      <div className="mail_icon">
                          <i className="fas fa-envelope-open"></i>
                      </div>
                      <div className="mail_me">
                          Mail Me
                          <p className="anchor">manojkumar.p24cse@gmail.com</p>
                      </div>
                  </div>
                  <div className="phone">
                      <div className="phone_icon">
                          <i className="fas fas fa-phone-square"></i>
                      </div>
                      <div className="call_me">
                          Call Me
                          <p className="anchor">+91 63625 00396</p>
                      </div>
                  </div>
              </div>
              <form className="contact-form">
                  <div className="form-row">
                      <div className="input-row">
                          <input type="text" value={formValues.name} name="name" placeholder="Your name" onChange={handleChange}  className={`form-control ${formErrors.name ? 'error' : ''}`} />
                          {formErrors.name && 
                          <div className="error-message">Please enter your name.</div>
                          }
                      </div>
                      <div className="input-row">
                          <input type="email" value={formValues.email} placeholder="Your email" name="email" onChange={handleChange}  className={`form-control ${formErrors.email ? 'error' : ''}`} />
                          {formErrors.email && 
                          <div className="error-message">Please enter a valid email.</div>
                          }
                      </div>
                      <div className="input-row">
                          <input type="text" value={formValues.subject} placeholder="Your subject" name="subject"onChange={handleChange}  className={`form-control ${formErrors.subject ? 'error' : ''}`} />
                          {formErrors.subject && 
                          <div className="error-message">Please enter the subject.</div>
                          }
                      </div>
                  </div>
                  <div className="input-row">
                      <textarea placeholder="Your Message" value={formValues.message} name="message" onChange={handleChange}  className={`form-control message ${formErrors.message ? 'error' : ''}`} rows="6" cols="50" ></textarea>
                      {formErrors.message && 
                      <div className="error-message">Please enter a message.</div>
                      }
                  </div>
                  <div className="send_me_button" type="submit" onClick={handleSubmit} >
                      <SwipeButton button_text="SEND MESSAGE" icon="fas fa-paper-plane" ></SwipeButton>
                  </div>
              </form>
              <div className={`${isVisible ? 'popup--visible' : 'popup'} popup--icon -success js_success-popup`}>
              <div className="popup__background"></div>
              <div className={`popup__content `}>
                  <h3 className="popup__content__title">
                      Successfully Message Sent
                  </h3>
                  <p>We'll get back to you</p>
                  <p>
                      <button className="button button--success" onClick={togglePopup}  data-for="js_success-popup">Ok</button>
                  </p>
              </div>
          </div>
      </div>
      </div>
    )
};

export default Contact;