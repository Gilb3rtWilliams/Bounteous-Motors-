import React, { useState, useEffect } from 'react'
import '../css/AdminSlideshow.css'

const AdminSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    '/src/images/slide21.jpg',
    '/src/images/slide22.jpg',
    '/src/images/slide23.jpg',
    '/src/images/slide24.jpg',
    '/src/images/slide25.jpg',
    '/src/images/slide26.jpg',
    '/src/images/slide27.jpg',
    '/src/images/slide28.jpg',
    '/src/images/slide29.jpg',
    '/src/images/slide30.jpg'
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
    <div className="admin-slideshow">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`admin-slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide})` }}
        />
      ))}
      <div className="admin-slide-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`admin-indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminSlideshow