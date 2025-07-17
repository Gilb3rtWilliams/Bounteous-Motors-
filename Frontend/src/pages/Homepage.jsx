import React from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Slideshow from '../components/Slideshow';
import Footer from '../components/Footer';
import "../css/Homepage.css";
import useTypingEffect from '../hooks/useTypingEffect';

const Homepage = () => {
  const navigate = useNavigate();

  const carLogos = [
    { name: "Aston Martin", image: "/logos/aston-martin.png" },
    { name: "Audi", image: "/logos/audi.png" },
    { name: "Bentley", image: "/logos/bentley.png" },
    { name: "BMW", image: "/logos/bmw.png" },
    { name: "Bugatti", image: "/logos/bugatti.png" },
    { name: "Chevrolet", image: "/logos/chevrolet.png" },
    { name: "Ferrari", image: "/logos/ferrari.png" },
    { name: "Ford", image: "/logos/ford.png" },
    { name: "Honda", image: "/logos/honda.png" },
    { name: "Hyundai", image: "/logos/hyundai.png" },
    { name: "Jaguar", image: "/logos/jaguar.png" },
    { name: "Lamborghini", image: "/logos/lamborghini.png" },
    { name: "Koenigsegg", image: "/logos/koenigsegg.png" },
    { name: "Land Rover", image: "/logos/land-rover.png" },
    { name: "Lexus", image: "/logos/lexus.png" },
    { name: "Maserati", image: "/logos/maserati.png" },
    { name: "Lotus", image: "/logos/lotus.png" },
    { name: "Mercedes-Benz", image: "/logos/mercedes.png" },
    { name: "Cadillac", image: "/logos/cadillac.png" },
    { name: "Nissan", image: "/logos/nissan.png" },
    { name: "Mini", image: "/logos/mini.png" },
    { name: "Peugeot", image: "/logos/peugeot.png" },
    { name: "Porsche", image: "/logos/porsche.png" },
    { name: "Rolls-Royce", image: "/logos/rolls-royce.png" },
    { name: "Subaru", image: "/logos/subaru.png" },
    { name: "Renault", image: "/logos/renault.png" },
    { name: "Tesla", image: "/logos/tesla.png" },
    { name: "Mitsubishi", image: "/logos/mitsubishi.png" },
    { name: "Toyota", image: "/logos/toyota.png" },
    { name: "Volkswagen", image: "/logos/vw.png" },
    { name: "Suzuki", image: "/logos/suzuki.png" },
    { name: "Volvo", image: "/logos/volvo.png" },
    { name: "Jeep", image: "/logos/jeep.png" },
    { name: "Pontiac", image: "/logos/pontiac.png" },
    { name: "Luxgen", image: "/logos/luxgen.png" },
    { name: "Corvette", image: "/logos/corvette.png" },
    { name: "Ford Mustang", image: "/logos/ford-mustang.png" },
    { name: "Roewe", image: "/logos/roewe.png" },
    { name: "Chrysler", image: "/logos/chrysler.png" },
    { name: "McLaren", image: "/logos/mclaren.png" },
    { name: "Lamborghini", image: "/logos/lamborghini.png" },
    { name: "Mazda", image: "/logos/mazda.png" },
    { name: "Jaguar", image: "/logos/jaguar.png" },
    { name: "Alfa Romeo", image: "/logos/alfa-romeo.png" }
  ];

  const bodyStyles = [
    {name: "Sedan/Saloon Car", image: "/logos/sedan.png"},
    {name: "Coupe", image: "/logos/coupe.png"},
    {name: "Sports Car", image: "/logos/sports-car.png"},
    {name: "Station Wagon", image: "/logos/station-wagon.png"},
    {name: "Hatchback", image: "/logos/hatchback.png"},
    {name: "Convertible", image: "/logos/convertible.png"},
    {name: "Sport-Utility Vehicle (SUV)", image: "/logos/suv.png"},
    {name: "Van", image: "/logos/van.png"},
    {name: "Pickup/Truck/Tractors", image: "/logos/pickup.png"},
    {name: "Motorbikes and Motorcycles", image: "/logos/motorbike.png"}
  ];

  const features = [
    {
      title: "Trade-in Services",
      description: "Exchange your current vehicle for a new one with our hassle-free trade-in service"
    },
    {
      title: "Delivery Services",
      description: "We deliver your dream car right to your doorstep"
    },
    {
      title: "Negotiation Services",
      description: "Our expert team helps you get the best deal possible"
    },
    {
      title: "Vehicle Inspection",
      description: "Professional inspection services for peace of mind"
    }
  ];
  const welcomeMessage = useTypingEffect("Welcome to Bounteous Motors", 60);
  const subMessage = useTypingEffect("Your ultimate destination for buying, selling, and trading cars with ease.", 60);

  return (
    <div className="homepage">
      <Slideshow />
      <Navbar />
      
      {/* Welcome Section */}
      <section className="homepage-hero-section">
        <div className="homepage-content">
          <h1 className="typing-header">{welcomeMessage}</h1>
          <p className="typing-subheader">{subMessage}</p>
          <div className="buttons">
            <button onClick={() => navigate('/cars')}>View Listings</button>
            <button onClick={() => navigate('/register')} className="cta-button">Get Started</button>
          </div>
        </div>
      </section>

      {/* Car Logos Section */}
      <section className="logos-section">
        <h2>Our Featured Brands</h2>
        <h3>Explore our selection of top brands: </h3>
        <div className="logo-grid">
          {carLogos.map((logo, index) => (
            <div key={index} className="logo-item">
              <img src={logo.image} alt={logo.name} />
              <p>{logo.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Body Styles Section */}
      <section className="body-styles-section">
        <h2>Explore Vehicle Body Styles</h2>
        <h3>Discover the different body styles available in the market: </h3>
        <div className="styles-grid">
          {bodyStyles.map((style, index) => (
            <div key={index} className="style-item">
              <img src={style.image} alt={style.name} />
              <h3>{style.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* System Features Section */}
      <section className="features-section">
        <h2>Our Services</h2>
        <div className="features-content">
          <ul className="features-list">
            {features.map((feature, index) => (
              <li key={index} className="feature-item">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-section">
        <h2>About Bounteous Motors</h2>
        <div className="about-content">
          <div className="about-main">
            <h3>Your Trusted Automotive Partner Since 2010</h3>
            <p>At Bounteous Motors, we've spent over a decade revolutionizing the automotive marketplace. What started as a small dealership has grown into East Africa's premier destination for buying, selling, and trading premium vehicles.</p>
            
            <div className="about-stats">
              <div className="stat-item">
                <h4>13+</h4>
                <p>Years of Excellence</p>
              </div>
              <div className="stat-item">
                <h4>10,000+</h4>
                <p>Satisfied Customers</p>
              </div>
              <div className="stat-item">
                <h4>35+</h4>
                <p>Expert Staff</p>
              </div>
              <div className="stat-item">
                <h4>98%</h4>
                <p>Customer Satisfaction</p>
              </div>
            </div>

            <div className="about-mission">
              <h3>Our Mission</h3>
              <p>To provide an unparalleled automotive experience through transparency, integrity, and innovation, while making premium vehicles accessible to everyone in East Africa.</p>
            </div>

            <div className="about-values">
              <h3>Our Core Values</h3>
              <div className="values-grid">
                <div className="value-item">
                  <h4>Integrity</h4>
                  <p>We maintain the highest standards of honesty and transparency in every transaction.</p>
                </div>
                <div className="value-item">
                  <h4>Excellence</h4>
                  <p>We strive for perfection in our services, from vehicle inspection to customer support.</p>
                </div>
                <div className="value-item">
                  <h4>Innovation</h4>
                  <p>We continuously adapt and improve our services using cutting-edge technology.</p>
                </div>
                <div className="value-item">
                  <h4>Customer First</h4>
                  <p>Your satisfaction and trust are our top priorities.</p>
                </div>
              </div>
            </div>

            <div className="about-services">
              <h3>Comprehensive Services</h3>
              <div className="services-list">
                <div className="service-detail">
                  <h4>Vehicle Trading</h4>
                  <p>Expert valuation and hassle-free trade-in services for your current vehicle.</p>
                </div>
                <div className="service-detail">
                  <h4>Premium Inventory</h4>
                  <p>Access to a wide range of thoroughly inspected luxury and everyday vehicles.</p>
                </div>
                <div className="service-detail">
                  <h4>Financial Solutions</h4>
                  <p>Flexible financing options and competitive rates through our trusted banking partners.</p>
                </div>
                <div className="service-detail">
                  <h4>After-Sales Support</h4>
                  <p>Dedicated customer service and maintenance support long after your purchase.</p>
                </div>
              </div>
            </div>

            <div className="about-commitment">
              <h3>Our Commitment to Quality</h3>
              <p>Every vehicle in our inventory undergoes a rigorous 150-point inspection process, ensuring you receive only the highest quality vehicles. Our certified technicians meticulously examine each vehicle's mechanical condition, safety features, and aesthetic elements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Advertisement Section */}
      <section className="service-ad-section">
        <h2>Professional Car Services</h2>
        <div className="service-content">
          <div className="service-text">
            <h3>Keep Your Vehicle in Perfect Condition</h3>
            <p>Schedule professional maintenance and repair services with our certified technicians.</p>
            <button className="service-cta">Book Service Now</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Homepage;
