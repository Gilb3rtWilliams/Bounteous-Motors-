import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CarListings from "./pages/CarListings";
import CarDetails from "./pages/CarDetails";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import SellCar from "./pages/SellCar";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import AdminProfile from "./pages/AdminProfile";
import AddCarListing from "./pages/AddCarListing";
import PostCar from "./pages/PostCar";
import AdminReviewListings from './pages/AdminReviewListings';
import ViewNotifications from './pages/ViewNotifications';
import AdminNotifications from './pages/AdminNotifications';
import './css/App.css';
import OrderCar from "./pages/OrderCar";
import ManageOrders from './pages/ManageOrders';
import MyOrders from './pages/MyOrders';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main>
        <ToastContainer position="top-right" autoClose={2500} hideProgressBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cars" element={<CarListings />} />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/sell" element={<SellCar />} />
          <Route
            path="/order/:carId"
            element={
              <ProtectedRoute requiredRole="customer">
                <OrderCar />
              </ProtectedRoute>
            } />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route
            path="/admin/notifications"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminNotifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manage-orders"
            element={
              <ProtectedRoute requiredRole="admin">
                <ManageOrders />
              </ProtectedRoute>
            } />
            <Route
            path="/my-orders"
            element={
              <ProtectedRoute requiredRole="customer">
                <MyOrders />
              </ProtectedRoute>
            } />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute requiredRole="customer">
                <ViewNotifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post-car"
            element={
              <ProtectedRoute requiredRole="customer">
                <PostCar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-car"
            element={
              <ProtectedRoute requiredRole="admin">
                <AddCarListing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/review-listings"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminReviewListings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="customer">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-profile"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute requiredRole="customer">
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
