import { useState, useEffect } from 'react';
import '../css/Slideshow.css';

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    '/src/images/slide1.jpg',
    '/src/images/slide2.jpg',
    '/src/images/slide3.jpg',
    '/src/images/slide4.jpg',
    '/src/images/slide5.jpg',
    '/src/images/slide6.jpg',
    '/src/images/slide7.jpg',
    '/src/images/slide8.jpg',
    '/src/images/slide9.jpg',
    '/src/images/slide10.jpg'
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
    <div className="slideshow">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide})` }}
        />
      ))}
      <div className="slide-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
