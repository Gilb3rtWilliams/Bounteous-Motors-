import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Slideshow from '../components/Slideshow';
import '../css/About.css';
import useTypingEffect from '../hooks/useTypingEffect'; // Import the custom hook

const About = () => {
  const milestones = [
    { year: 2010, event: "Founded as a small dealership in Nairobi" },
    { year: 2012, event: "Expanded operations to Tanzania" },
    { year: 2014, event: "Launched online vehicle marketplace" },
    { year: 2015, event: "Reached 1,000 successful transactions" },
    { year: 2017, event: "Opened state-of-the-art showroom in Mombasa" },
    { year: 2018, event: "Expanded to Uganda and Rwanda" },
    { year: 2020, event: "Introduced AI-powered vehicle matching system" },
    { year: 2022, event: "Achieved 10,000+ satisfied customers" },
    { year: 2023, event: "Launched premium vehicle inspection service" },
    { year: 2024, event: "Expanded to 5 more countries in East Africa" }
  ];

  const teamMembers = [
    {
      name: "John Kamau",
      position: "CEO & Founder",
      bio: "20+ years in automotive industry, visionary leader pioneering digital transformation in African automotive market"
    },
    {
      name: "Sarah Omondi",
      position: "Chief Operations Officer",
      bio: "Former executive at Toyota East Africa, expertise in supply chain and dealer operations"
    },
    {
      name: "Michael Rugamba",
      position: "Head of Technology",
      bio: "Tech veteran with experience at major African startups, leading our digital innovation"
    },
    {
      name: "Amina Hassan",
      position: "Customer Experience Director",
      bio: "Dedicated to creating exceptional customer journeys and building lasting relationships"
    }
  ];

  const certifications = [
    "ISO 9001:2015 Quality Management",
    "East African Motor Industry Certification",
    "African Automotive Association Member",
    "Certified Vehicle Inspector Program",
    "International Automotive Task Force Certification"
  ];

  const welcomeMessage = useTypingEffect("About Bounteous Motors", 60);
  const subMessage = useTypingEffect("Discover our journey, mission, and commitment to excellence in the automotive industry.", 60);

  return (
    <div className="about-page">
      <Slideshow />
      <Navbar />
      <div className="about-content">
        <section className="hero-section">
          <h1 className="typing-header">{welcomeMessage}</h1>
          <p className="typing-subheader">{subMessage}</p>
        </section>

        <section className="company-overview">
          <h2>Our Story</h2>
          <div className="overview-content">
            <div className="overview-text">
              <p>Founded in 2010, Bounteous Motors has grown from a modest dealership in Nairobi to East Africa's leading automotive marketplace. Our journey is marked by continuous innovation, unwavering commitment to quality, and a deep understanding of the African automotive market.</p>
              <p>Today, we serve customers across seven countries, offering a comprehensive range of services from vehicle trading to premium maintenance solutions. Our success is built on the trust of over 10,000 satisfied customers and partnerships with leading automotive brands worldwide.</p>
            </div>
            <div className="overview-stats">
              <div className="stat">
                <h3>7+</h3>
                <p>Countries Served</p>
              </div>
              <div className="stat">
                <h3>15K+</h3>
                <p>Vehicles Sold</p>
              </div>
              <div className="stat">
                <h3>98%</h3>
                <p>Customer Satisfaction</p>
              </div>
              <div className="stat">
                <h3>250+</h3>
                <p>Brand Partners</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mission-vision">
          <div className="mission-content">
            <div className="mission-box">
              <h2>Our Mission</h2>
              <p>To revolutionize the African automotive marketplace by providing unparalleled access to quality vehicles through innovative technology and exceptional service.</p>
            </div>
            <div className="vision-box">
              <h2>Our Vision</h2>
              <p>To be the most trusted and comprehensive automotive platform in Africa, setting new standards for quality, transparency, and customer satisfaction in the industry.</p>
            </div>
          </div>
        </section>

        <section className="milestones-section">
          <h2>Our Journey</h2>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{milestone.year}</div>
                <div className="timeline-content">
                  <p>{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="leadership-section">
          <h2>Our Leadership Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member">
                <div className="member-photo">
                  <img src={`/images/team/${member.name.toLowerCase().replace(' ', '-')}.jpg`} alt={member.name} />
                </div>
                <h3>{member.name}</h3>
                <h4>{member.position}</h4>
                <p>{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="quality-assurance">
          <h2>Quality Assurance</h2>
          <div className="quality-content">
            <div className="inspection-process">
              <h3>150-Point Inspection Process</h3>
              <p>Every vehicle undergoes our rigorous 150-point inspection process, covering:</p>
              <ul>
                <li>Mechanical Components & Performance</li>
                <li>Safety Systems & Features</li>
                <li>Electrical Systems & Electronics</li>
                <li>Interior & Exterior Condition</li>
                <li>Documentation & History Verification</li>
              </ul>
            </div>
            <div className="certifications">
              <h3>Our Certifications</h3>
              <ul>
                {certifications.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="technology-innovation">
          <h2>Technology & Innovation</h2>
          <div className="tech-features">
            <div className="tech-item">
              <h3>AI-Powered Vehicle Matching</h3>
              <p>Our advanced algorithms analyze thousands of data points to match you with your perfect vehicle based on preferences, budget, and market conditions.</p>
            </div>
            <div className="tech-item">
              <h3>Virtual Showroom</h3>
              <p>Experience detailed 360° views and virtual tours of vehicles from the comfort of your home.</p>
            </div>
            <div className="tech-item">
              <h3>Smart Price Analysis</h3>
              <p>Real-time market analysis and price comparison tools ensure you get the best value for your money.</p>
            </div>
            <div className="tech-item">
              <h3>Digital Documentation</h3>
              <p>Streamlined, paperless processes for all transactions and vehicle documentation.</p>
            </div>
          </div>
        </section>

        <section className="community-impact">
          <h2>Community Impact</h2>
          <div className="impact-content">
            <div className="impact-initiatives">
              <h3>Our Initiatives</h3>
              <ul>
                <li>Youth Automotive Training Program</li>
                <li>Environmental Sustainability Projects</li>
                <li>Road Safety Awareness Campaigns</li>
                <li>Local Business Partnership Program</li>
              </ul>
            </div>
            <div className="impact-stats">
              <div className="impact-stat">
                <h3>500+</h3>
                <p>Youth Trained</p>
              </div>
              <div className="impact-stat">
                <h3>20+</h3>
                <p>Community Programs</p>
              </div>
              <div className="impact-stat">
                <h3>100+</h3>
                <p>Local Partners</p>
              </div>
            </div>
          </div>
        </section>

        <section className="future-vision">
          <h2>Looking Ahead</h2>
          <div className="vision-content">
            <p>As we continue to grow and evolve, our commitment to innovation and excellence remains unwavering. Our future initiatives include:</p>
            <ul>
              <li>Expanding our presence to 15 African countries by 2026</li>
              <li>Launching an electric vehicle ecosystem</li>
              <li>Introducing blockchain-based vehicle history tracking</li>
              <li>Developing an autonomous vehicle testing facility</li>
              <li>Creating a pan-African automotive training academy</li>
            </ul>
          </div>
        </section>

        <section className="contact-cta">
          <h2>Join Our Journey</h2>
          <p>Whether you're looking to buy, sell, or simply learn more about our services, we're here to help.</p>
          <div className="cta-buttons">
            <button className="primary-btn">Contact Us</button>
            <button className="secondary-btn">View Listings</button>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;
