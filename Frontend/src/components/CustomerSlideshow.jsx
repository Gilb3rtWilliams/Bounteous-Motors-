import React, { useState, useEffect } from 'react'
import '../css/CustomerSlideshow.css'

const CustomerSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    '/src/images/slide11.jpg',
    '/src/images/slide12.jpg',
    '/src/images/slide13.jpg',
    '/src/images/slide14.jpg',
    '/src/images/slide15.jpg',
    '/src/images/slide16.jpg',
    '/src/images/slide17.jpg',
    '/src/images/slide18.jpg',
    '/src/images/slide19.jpg',
    '/src/images/slide20.jpg'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]); // Added slides.length as dependency

  return (
    <div className="customer-slideshow">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`customer-slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide})` }}
        />
      ))}
      <div className="customer-slide-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`customer-indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomerSlideshow