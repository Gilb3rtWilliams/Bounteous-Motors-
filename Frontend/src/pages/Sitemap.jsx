import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Slideshow from '../components/Slideshow';

const Sitemap = () => {
  return (
    <div className="sitemap-page">
      <Navbar />
      <Slideshow />
      <div style={{ padding: "100px 20px", textAlign: "center" }}>
        <h1>Sitemap</h1>
        <p>Coming Soon</p>
      </div>
      <Footer />
    </div>
  );
};

export default Sitemap;
