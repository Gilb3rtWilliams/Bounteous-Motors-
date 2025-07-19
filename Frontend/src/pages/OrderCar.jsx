import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/OrderCar.css';
import CustomerSlideshow from '../components/CustomerSlideshow';
import CarImageSlideshow from '../components/CarImageSlideshow';

const OrderCar = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [pickupDate, setPickupDate] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [error, setError] = useState('');
  const [successMsg] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const buyerId = user?.id; // ✅ correct
  const token = user?.token;
  console.log("✅ Extracted buyerId:", buyerId);


  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cars/${carId}`);
        setCar(res.data);
      } catch {
        setError('Error fetching car details');
      }
    };
    fetchCar();
  }, [carId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pickupDate) return setError('Please select a pickup date');

    try {
      const sellerId = car?.seller?._id || car?.admin?._id;
      const payload = {
        carId,
        buyerId,
        sellerId,
        paymentMethod,
        deliveryOption,
        pickupDate,
        paymentAmount: car.price
      };

      console.log("📦 Sending Order Payload:", payload);

      await axios.post('http://localhost:5000/api/orders', payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success('🎉 Order placed successfully!');
      setTimeout(() => {
        navigate('/my-orders');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Order failed');
    }
  };

  return (
    <div className="order-car-container">
      <h1>Order Car</h1>
      <CustomerSlideshow />

      {error && <p className="error-msg">{error}</p>}
      {successMsg && <p className="success-msg">{successMsg}</p>}

      {car ? (
        <div className="order-details">
          <h1>Car Ordered: {`${car.year} ${car.brand} ${car.model}`}</h1>
          <h2><strong>Price:</strong> ${car.price.toLocaleString()}</h2>

          <CarImageSlideshow
            images={car.images.map(img => `http://localhost:5000${img}`)}
            height="300px"
            altPrefix={`${car.year} ${car.brand} ${car.model}`}
          />

          <form onSubmit={handleSubmit} className="order-form">
            <label>
              Delivery Option:
              <select value={deliveryOption} onChange={(e) => setDeliveryOption(e.target.value)}>
                <option value="pickup">Pickup</option>
                <option value="home_delivery">Home Delivery</option>
              </select>
            </label>

            <label>
              Pickup Date:
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                required
              />
            </label>

            <label>
              Payment Method:
              <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <option value="credit_card">Credit Card</option>
                <option value="cash">Cash</option>
              </select>
            </label>

            <button type="submit">Place Order</button>
          </form>
        </div>
      ) : (
        <p>Loading car details...</p>
      )}
    </div>
  );
};

export default OrderCar;
