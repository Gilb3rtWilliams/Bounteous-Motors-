import React, { useState, useEffect } from 'react';

const CarImageSlideshow = ({ images = [], height = "300px", altPrefix = "Car" }) => {
  const [current, setCurrent] = useState(0);

  // Normalize images: ensure it's always an array
  const imageList = React.useMemo(
    () => (Array.isArray(images) ? images : [images]),
    [images]
  );

  useEffect(() => {
    if (imageList.length > 1) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % imageList.length);
      }, 3000); // 3s per slide
      return () => clearInterval(interval);
    }
  }, [imageList]);

  if (!imageList.length || !imageList[0]) {
    return (
      <img
        src="/uploads/no-image.png"
        alt="No image"
        style={{ height, width: '100%', objectFit: 'cover', borderRadius: '8px' }}
      />
    );
  }

  const resolveImageURL = (img) =>
    img.startsWith("http")
      ? img
      : `http://localhost:5000/uploads/${encodeURIComponent(img)}`;

  return (
    <div style={{ position: 'relative', height, width: '100%' }}>
      <img
        src={resolveImageURL(imageList[current])}
        alt={`${altPrefix} ${current + 1}`}
        style={{
          height,
          width: '100%',
          objectFit: 'cover',
          borderRadius: '8px',
          transition: 'opacity 0.5s ease-in-out',
        }}
      />

      {/* Optional navigation dots */}
      {imageList.length > 1 && (
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '6px'
        }}>
          {imageList.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                height: '10px',
                width: '10px',
                borderRadius: '50%',
                backgroundColor: current === i ? 'red' : '#ccc',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarImageSlideshow;
