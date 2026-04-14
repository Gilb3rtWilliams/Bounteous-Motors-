import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Slideshow from '../components/Slideshow';
import Footer from '../components/Footer';
import "../css/Homepage.css";
import useTypingEffect from '../hooks/useTypingEffect';
import { FaStar, FaRegStar, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const Homepage = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);

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
    { name: "Mazda", image: "/logos/mazda.png" },
    { name: "Alfa Romeo", image: "/logos/alfa-romeo.png" },
  ];

  const bodyStyles = [
    { name: "Sedan / Saloon", image: "/logos/sedan.png" },
    { name: "Coupe", image: "/logos/coupe.png" },
    { name: "Sports Car", image: "/logos/sports-car.png" },
    { name: "Station Wagon", image: "/logos/station-wagon.png" },
    { name: "Hatchback", image: "/logos/hatchback.png" },
    { name: "Convertible", image: "/logos/convertible.png" },
    { name: "SUV", image: "/logos/suv.png" },
    { name: "Van", image: "/logos/van.png" },
    { name: "Pickup / Truck", image: "/logos/pickup.png" },
    { name: "Motorbikes", image: "/logos/motorbike.png" },
  ];

  const features = [
    {
      icon: "⇄",
      title: "Trade-in Services",
      description: "Exchange your current vehicle for a new one with our hassle-free trade-in service.",
    },
    {
      icon: "⟶",
      title: "Delivery Services",
      description: "We deliver your dream car right to your doorstep, anywhere in East Africa.",
    },
    {
      icon: "◈",
      title: "Negotiation Services",
      description: "Our expert team helps you get the best deal possible on every transaction.",
    },
    {
      icon: "✓",
      title: "Vehicle Inspection",
      description: "Professional 150-point inspection services for complete peace of mind.",
    },
  ];

  const welcomeMessage = useTypingEffect("Welcome to Bounteous Motors", 60);
  const subMessage = useTypingEffect(
    "Your ultimate destination for buying, selling, and trading cars with ease.",
    60
  );

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/reviews/published");
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="homepage">
      {/* Background slideshow sits behind everything */}
      <Slideshow />
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-glow" />
        <div className="hero-content glass-panel">
          <span className="hero-eyebrow">East Africa's Premier Automotive Destination</span>
          <h1 className="typing-header">{welcomeMessage}</h1>
          <p className="typing-subheader">{subMessage}</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate('/cars')}>
              Browse Inventory
            </button>
            <button className="btn-ghost" onClick={() => navigate('/register')}>
              Get Started
            </button>
          </div>
        </div>

        {/* Stat strip anchored at hero bottom */}
        <div className="hero-stats glass-panel-dark">
          <div className="stat-block">
            <span className="stat-num">13+</span>
            <span className="stat-lbl">Years of Excellence</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-block">
            <span className="stat-num">10,000+</span>
            <span className="stat-lbl">Satisfied Customers</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-block">
            <span className="stat-num">35+</span>
            <span className="stat-lbl">Expert Staff</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-block">
            <span className="stat-num">98%</span>
            <span className="stat-lbl">Customer Satisfaction</span>
          </div>
        </div>
      </section>

      {/* ── FEATURED BRANDS ──────────────────────────────── */}
      <section className="brands-section">
        <div className="section-header">
          <span className="section-tag">Inventory</span>
          <h2>Our Featured Brands</h2>
          <p>Explore our curated selection of the world's top automotive marques</p>
        </div>
        <div className="logo-grid">
          {carLogos.map((logo, index) => (
            <div key={index} className="logo-item glass-card">
              <img src={logo.image} alt={logo.name} />
              <p>{logo.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BODY STYLES ──────────────────────────────────── */}
      <section className="body-styles-section">
        <div className="section-header">
          <span className="section-tag">Categories</span>
          <h2>Explore Vehicle Body Styles</h2>
          <p>Find the body style that suits your lifestyle perfectly</p>
        </div>
        <div className="styles-grid">
          {bodyStyles.map((style, index) => (
            <div key={index} className="style-item glass-card">
              <div className="style-img-wrap">
                <img src={style.image} alt={style.name} />
              </div>
              <h3>{style.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────── */}
      <section className="services-section">
        <div className="section-header">
          <span className="section-tag">What We Offer</span>
          <h2>Our Services</h2>
          <p>A full suite of automotive services designed around you</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card glass-card">
              <div className="feature-icon-wrap">
                <span className="feature-icon">{feature.icon}</span>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────── */}
      <section className="about-section">
        <div className="section-header">
          <span className="section-tag">Our Story</span>
          <h2>About Bounteous Motors</h2>
        </div>

        <div className="about-intro glass-panel-dark">
          <h3>Your Trusted Automotive Partner Since 2010</h3>
          <p>
            At Bounteous Motors, we've spent over a decade revolutionizing the automotive
            marketplace. What started as a small dealership has grown into East Africa's
            premier destination for buying, selling, and trading premium vehicles.
          </p>
        </div>

        <div className="about-mission glass-card">
          <h3>Our Mission</h3>
          <p>
            To provide an unparalleled automotive experience through transparency, integrity,
            and innovation, while making premium vehicles accessible to everyone in East Africa.
          </p>
        </div>

        <div className="values-grid">
          {[
            { title: "Integrity", desc: "The highest standards of honesty and transparency in every transaction." },
            { title: "Excellence", desc: "Perfection in our services, from vehicle inspection to customer support." },
            { title: "Innovation", desc: "Continuously adapting our services using cutting-edge technology." },
            { title: "Customer First", desc: "Your satisfaction and trust are our top priorities, always." },
          ].map((v, i) => (
            <div key={i} className="value-card glass-card">
              <div className="value-number">0{i + 1}</div>
              <h4>{v.title}</h4>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="comprehensive-services">
          <h3>Comprehensive Services</h3>
          <div className="comp-services-grid">
            {[
              { title: "Vehicle Trading", desc: "Expert valuation and hassle-free trade-in services for your current vehicle." },
              { title: "Premium Inventory", desc: "Access to a wide range of thoroughly inspected luxury and everyday vehicles." },
              { title: "Financial Solutions", desc: "Flexible financing options and competitive rates through our trusted banking partners." },
              { title: "After-Sales Support", desc: "Dedicated customer service and maintenance support long after your purchase." },
            ].map((s, i) => (
              <div key={i} className="comp-service-item glass-card">
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="commitment-block glass-panel-dark">
          <h3>Our Commitment to Quality</h3>
          <p>
            Every vehicle in our inventory undergoes a rigorous 150-point inspection process,
            ensuring you receive only the highest quality vehicles. Our certified technicians
            meticulously examine each vehicle's mechanical condition, safety features, and
            aesthetic elements.
          </p>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────── */}
      <section className="reviews-section">
        <div className="section-header">
          <span className="section-tag">Testimonials</span>
          <h2>What Our Customers Say</h2>
        </div>
        <div className="reviews-grid">
          {reviews.slice(0, 3).map((review) => (
            <div key={review._id} className="review-card glass-card">
              <div className="review-top">
                <FaQuoteLeft className="quote-icon" />
                <div className="stars-container">
                  {[1, 2, 3, 4, 5].map((star) =>
                    star <= review.rating
                      ? <FaStar key={star} />
                      : <FaRegStar key={star} />
                  )}
                </div>
              </div>
              <p className="review-text">"{review.comment}"</p>
              <div className="review-footer">
                <span className="reviewer-name">— {review.customer?.name || "Anonymous"}</span>
                <span className="review-date">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="see-all-reviews">
          <button className="btn-primary" onClick={() => navigate('/reviews')}>
            See All Reviews
          </button>
        </div>
      </section>

      {/* ── SERVICE CTA ──────────────────────────────────── */}
      <section className="service-cta-section">
        <div className="service-cta-content glass-panel">
          <span className="section-tag">Book a Service</span>
          <h2>Professional Car Services</h2>
          <h3>Keep Your Vehicle in Perfect Condition</h3>
          <p>
            Schedule professional maintenance and repair services with our certified
            technicians. We keep your investment running at its best.
          </p>
          <button className="btn-primary">Book Service Now</button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Homepage;
