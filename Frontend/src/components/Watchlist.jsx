import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { carAPI } from '../services/api';
import CarImageSlideshow from './CarImageSlideshow';
import 'react-toastify/dist/ReactToastify.css';
import '../css/Watchlist.css'; // Assuming you have a CSS file for styling

const Watchlist = ({ userId }) => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await carAPI.getWatchlist(userId);
        if (Array.isArray(response)) {
          setWatchlist(response);
        } else {
          setWatchlist([]);
        }
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchWatchlist();
  }, [userId]);

  const handleRemove = async (carId) => {
    try {
      await carAPI.removeFromWatchlist(userId, carId);
      setWatchlist((prev) => prev.filter((car) => car._id !== carId));
      toast.success('Removed from watchlist ✅');
    } catch (error) {
      console.error('Failed to remove from watchlist:', error);
      toast.error('Failed to remove car ❌');
    }
  };

  if (loading) return <p style={{ color: 'white' }}>Loading your watchlist...</p>;
  if (!watchlist.length) return <p style={{ color: 'white' }}>You haven't added any cars to your watchlist yet.</p>;

  return (
    <div className="watchlist-grid">
      {watchlist.map((car) => (
        <div key={car._id} className="watchlist-card">
          <div className="watchlist-image">
            <CarImageSlideshow 
            images={car.images.map(img => `http://localhost:5000${img}`)} 
            height="200px" 
            altPrefix={`${car.year} ${car.model}`} />
          </div>
          <div className="watchlist-details">
            <h3>{`${car.year} ${car.brand} ${car.model}`}</h3>
            <p className="watchlist-price">${car.price.toLocaleString()}</p>
            <div className="watchlist-actions">
              <button className="view-details-btn" onClick={() => navigate(`/car/${car._id}`)}>View Details</button>
              <br></br>
              <button className="remove-btn" onClick={() => handleRemove(car._id)}>
                <FaTrashAlt /> Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Watchlist;
