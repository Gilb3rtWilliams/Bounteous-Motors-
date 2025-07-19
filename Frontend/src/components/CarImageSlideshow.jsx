import React, { useState } from 'react';
import '../css/CarImageSlideshow.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CarImageSlideshow = ({ images, height = "300px", altPrefix = "Car Image" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="slideshow-container" style={{ height }}>
      {images.length > 0 && (
        <>
          <img
            src={images[currentIndex]}
            alt={`${altPrefix} ${currentIndex + 1}`}
            className="slideshow-image"
          />
          {images.length > 1 && (
            <>
              <button className="slideshow-btn left" onClick={prevImage}>
                <FaChevronLeft />
              </button>
              <button className="slideshow-btn right" onClick={nextImage}>
                <FaChevronRight />
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CarImageSlideshow;
