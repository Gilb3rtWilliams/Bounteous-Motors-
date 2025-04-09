import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Watchlist.css';

const Watchlist = ({ userId }) => {
  const [watchlistItems, setWatchlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWatchlist();
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchWatchlist = async () => {
    try {
      const response = await fetch(`/api/watchlist/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch watchlist');
      const data = await response.json();
      setWatchlistItems(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const removeFromWatchlist = async (carId) => {
    try {
      const response = await fetch(`/api/watchlist/${userId}/${carId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to remove from watchlist');
      setWatchlistItems(watchlistItems.filter(item => item.id !== carId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="watchlist-loading">Loading watchlist...</div>;
  if (error) return <div className="watchlist-error">{error}</div>;

  return (
    <div className="watchlist-container">
      <h2>My Watchlist</h2>
      {watchlistItems.length === 0 ? (
        <div className="watchlist-empty">
          <p>Your watchlist is empty</p>
          <button onClick={() => navigate('/cars')} className="browse-cars-btn">
            Browse Cars
          </button>
        </div>
      ) : (
        <div className="watchlist-grid">
          {watchlistItems.map((car) => (
            <div key={car.id} className="watchlist-item">
              <img src={car.image} alt={`${car.make} ${car.model}`} className="car-image" />
              <div className="car-details">
                <h3>{car.make} {car.model}</h3>
                <p className="car-price">${car.price.toLocaleString()}</p>
                <div className="car-specs">
                  <span>{car.year}</span>
                  <span>{car.mileage.toLocaleString()} km</span>
                  <span>{car.fuelType}</span>
                </div>
                <div className="action-buttons">
                  <button
                    onClick={() => navigate(`/cars/${car.id}`)}
                    className="view-details-btn"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => removeFromWatchlist(car.id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
