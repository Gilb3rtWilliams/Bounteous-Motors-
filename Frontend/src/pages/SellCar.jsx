import React from 'react'
import Navbar from '../components/Navbar';
import Slideshow from '../components/Slideshow';
import Footer from '../components/Footer';

const SellCar = () => {
  return (
    <div className="sellcar-page">
      <Navbar />
      <Slideshow />
      <div style={{ padding: "100px 20px", textAlign: "center" }}>
        <h1>Sell A Car</h1>
        <p>Coming Soon</p>
      </div>
      <Footer />
    </div>
  );
};

export default SellCar