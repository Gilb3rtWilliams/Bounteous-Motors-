import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Slideshow from '../components/Slideshow';
import '../css/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="contact-page">
      <Slideshow />
      <Navbar />
      <div className="contact-content">
        <section className="contact-hero">
          <h1>Contact Us</h1>
          <p>We're here to help and answer any questions you might have</p>
        </section>

        <div className="contact-container">
          <section className="contact-info">
            <div className="info-card">
              <h3>Visit Us</h3>
              <p>Roaster, Thika Rd</p>
              <p>Nairobi, Kenya</p>
            </div>

            <div className="info-card">
              <h3>Contact Info</h3>
              <p>📞 +254 702 974693/
                <br/>    +254 700 065150</p>
              <p>✉️ info@bunteousmotors.com</p>
              <p>⏰ Mon-Fri: 9:00 AM - 6:00 PM</p>
            </div>

            <div className="info-card">
              <h3>Follow Us</h3>
              <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
              </div>
            </div>
          </section>

          <section className="contact-form-section">
            <div className="form-container">
              <h2>Send Us a Message</h2>
              {submitted ? (
                <div className="success-message">
                  Thank you for your message! We'll get back to you soon.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your Phone"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message"
                      required
                      rows="5"
                    ></textarea>
                  </div>
                  <button type="submit" className="submit-btn">Send Message</button>
                </form>
              )}
            </div>
          </section>
        </div>

        <section className="map-section">
          <h2>Our Location</h2>
          <p>Roaster, Thika Rd</p>
          <p>Nairobi</p>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.918999389286!2d36.89260867408045!3d-1.2165405355520091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1588ace34285%3A0x49efca3d5fe6f91c!2sBounteousMotors!5e0!3m2!1sen!2ske!4v1744144095215!5m2!1sen!2ske"
              width="100%"
              height="300"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
