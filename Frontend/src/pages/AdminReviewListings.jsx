import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import Swal from 'sweetalert2';
import { useAuth } from '../hooks/useAuth';
import '../css/AdminReviewListings.css';
import AdminSlideshow from '../components/AdminSlideshow';
import { FaCheck, FaTimes, FaEye } from 'react-icons/fa';

const AdminReviewListings = () => {
  const { user, logout } = useAuth();
  const [pendingCars, setPendingCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingCars = async () => {
      try {
        const response = await axiosInstance.get('/cars/pending/review', {
          headers: { Authorization: `Bearer ${user?.token}` }
        });
        setPendingCars(response.data);
      } catch (error) {
        console.error('Error fetching pending cars:', error);
        Swal.fire('Error', 'Could not fetch pending listings.', 'error');
        if (error.response?.status === 401) logout();
      } finally {
        setLoading(false);
      }
    };

    fetchPendingCars();
  }, [user, logout]);

  const handleApprove = async (carId) => {
    try {
      await axiosInstance.put(`/cars/${carId}/approve`, {}, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      Swal.fire('Approved!', 'Car listing approved.', 'success');
      setPendingCars(prev => prev.filter(car => car._id !== carId));
    } catch {
      Swal.fire('Error', 'Approval failed.', 'error');
    }
  };

  const handleReject = async (carId) => {
    const { value: reason } = await Swal.fire({
      title: 'Reject Listing',
      input: 'text',
      inputLabel: 'Rejection Reason (optional)',
      inputPlaceholder: 'Enter a reason for rejection',
      showCancelButton: true
    });

    if (reason !== undefined) {
      try {
        await axiosInstance.put(`/cars/${carId}/reject`, { reason }, {
          headers: { Authorization: `Bearer ${user?.token}` }
        });
        Swal.fire('Rejected', 'Car listing has been rejected.', 'info');
        setPendingCars(prev => prev.filter(car => car._id !== carId));
      } catch {
        Swal.fire('Error', 'Rejection failed.', 'error');
      }
    }
  };

  if (loading) {
    return <div className="admin-review-loading">Loading pending reviews...</div>;
  }

  return (
    <div className="admin-review-container">
      <h1>Review Pending Car Listings</h1>
      <AdminSlideshow />
      {pendingCars.length === 0 ? (
        <p className="no-pending">No pending listings at the moment.</p>
      ) : (
        <div className="review-grid">
          {pendingCars.map(car => (
            <div key={car._id} className="review-card">
              <div className="review-header">
                <h3>{car.brand} {car.model} ({car.year})</h3>
                <p><strong>Seller:</strong> {car.seller?.name}</p>
              </div>

              <div className="review-body">
                <p><strong>Price:</strong> ${car.price}</p>
                <p><strong>Mileage:</strong> {car.mileage} miles</p>
                <p><strong>Condition:</strong> {car.condition}</p>
                <p><strong>Description:</strong> {car.description}</p>

                {car.images?.length > 0 && (
                  <div className="review-images">
                    {car.images.map((img, i) => (
                      <img
                        key={i}
                        src={`http://localhost:5000${img}`}
                        alt={`car-${i}`}
                        className="car-thumbnail"
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="review-actions">
                <button className="approve-btn" onClick={() => handleApprove(car._id)}><FaCheck /> Approve</button>
                <button className="reject-btn" onClick={() => handleReject(car._id)}><FaTimes /> Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminReviewListings;
