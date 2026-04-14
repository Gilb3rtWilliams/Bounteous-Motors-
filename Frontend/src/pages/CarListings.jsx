import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaCar,
  FaMapMarkerAlt,
  FaHeart,
} from "react-icons/fa";
import { BiGasPump } from "react-icons/bi";
import { BsSpeedometer2 } from "react-icons/bs";
import { carAPI } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/CarListings.css";
import Slideshow from "../components/Slideshow";
import Navbar from "../components/Navbar";
import CarImageSlideshow from "../components/CarImageSlideshow";
import useTypingEffect from "../hooks/useTypingEffect";

const CarListings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortValue, setSortValue] = useState("year-desc");
  const [filters, setFilters] = useState({
    make: "",
    priceRange: "",
    year: "",
    condition: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await carAPI.getAllCars();
        if (!Array.isArray(data)) throw new Error("Invalid data format");
        setCars(
          data.filter((c) =>
            ["approved", "available", "reserved", "sold"].includes(
              c.status?.toLowerCase(),
            ),
          ),
        );
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleFilterChange = (e) =>
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleAddToWatchlist = async (e, carId) => {
    e.stopPropagation();
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      await carAPI.addToWatchlist(user.id, carId);
      toast.success("Added to watchlist", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    } catch {
      toast.error("Failed to add to watchlist", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  const welcomeMessage = useTypingEffect("Available Vehicles", 60);
  const subMessage = useTypingEffect(
    "Find your perfect ride from our premium selection",
    60,
  );

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1949 },
    (_, i) => currentYear - i,
  );

  const filteredCars = cars
    .filter((car) => {
      const s = searchTerm.toLowerCase();
      const matchSearch =
        car.brand.toLowerCase().includes(s) ||
        car.model.toLowerCase().includes(s) ||
        String(car.year).includes(s);

      const matchFilters =
        (!filters.make || car.brand.toLowerCase() === filters.make) &&
        (!filters.year || String(car.year) === filters.year) &&
        (!filters.condition ||
          car.condition?.toLowerCase() === filters.condition) &&
        (!filters.priceRange ||
          (() => {
            const p = car.price;
            if (filters.priceRange === "40000+") return p > 40000;
            const [mn, mx] = filters.priceRange.split("-");
            return p >= +mn && p <= +mx;
          })());

      return matchSearch && matchFilters;
    })
    .sort((a, b) => {
      if (sortValue === "price-asc") return a.price - b.price;
      if (sortValue === "price-desc") return b.price - a.price;
      if (sortValue === "year-asc") return a.year - b.year;
      return b.year - a.year;
    });

  const statusCfg = {
    available: { text: "Available", cls: "badge-available" },
    approved: { text: "Available", cls: "badge-available" },
    reserved: { text: "Reserved", cls: "badge-reserved" },
    sold: { text: "Sold", cls: "badge-sold" },
  };

  if (loading)
    return (
      <div className="cl-loading">
        <div className="cl-spinner" />
        <p>Loading vehicles…</p>
      </div>
    );

  if (error)
    return (
      <div className="cl-error">
        <h2>Unable to load vehicles</h2>
        <p>{error}</p>
      </div>
    );

  return (
    <div className="cl-root">
      <Slideshow />
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────── */}
      <header className="cl-hero">
        <div className="cl-hero-glow" />
        <span className="cl-eyebrow">Bounteous Motors · Inventory</span>
        <h1 className="cl-hero-title">{welcomeMessage}</h1>
        <p className="cl-hero-sub">{subMessage}</p>
        <p className="cl-hero-count">
          <span className="cl-count-num">{filteredCars.length}</span>
          <span className="cl-count-label"> vehicles listed</span>
        </p>
        <div className="cl-search-wrap">
          <FaSearch className="cl-search-icon" />
          <input
            className="cl-search-input"
            type="text"
            placeholder="Search make, model or year…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="cl-search-clear"
              onClick={() => setSearchTerm("")}
            >
              ✕
            </button>
          )}
        </div>
      </header>

      {/* ── TOOLBAR ───────────────────────────────────────── */}
      <div className="cl-toolbar">
        <div className="cl-filters">
          <span className="cl-toolbar-label">
            <FaFilter /> Filters
          </span>
          <select
            name="make"
            value={filters.make}
            onChange={handleFilterChange}
            className="cl-select"
          >
            <option value="">All Makes</option>
            {[
              "toyota",
              "honda",
              "ford",
              "mercedes",
              "audi",
              "volkswagen",
              "jeep",
              "hyundai",
              "kia",
              "mazda",
              "subaru",
              "volvo",
              "lexus",
              "jaguar",
              "land-rover",
              "tesla",
              "ferrari",
              "lamborghini",
              "porsche",
              "mini",
              "infiniti",
              "rolls-royce",
              "cadillac",
              "chevrolet",
              "nissan",
              "aston-martin",
              "bmw",
              "luxgen",
            ].map((m) => (
              <option key={m} value={m}>
                {m
                  .split("-")
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(" ")}
              </option>
            ))}
          </select>
          <select
            name="priceRange"
            value={filters.priceRange}
            onChange={handleFilterChange}
            className="cl-select"
          >
            <option value="">Any Price</option>
            <option value="0-20000">Under $20,000</option>
            <option value="20000-40000">$20,000 – $40,000</option>
            <option value="40000+">$40,000+</option>
          </select>
          <select
            name="year"
            value={filters.year}
            onChange={handleFilterChange}
            className="cl-select"
          >
            <option value="">Any Year</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <select
            name="condition"
            value={filters.condition}
            onChange={handleFilterChange}
            className="cl-select"
          >
            <option value="">Any Condition</option>
            <option value="new">New</option>
            <option value="used">Used</option>
            <option value="certified">Certified Pre-Owned</option>
          </select>
          {Object.values(filters).some(Boolean) && (
            <button
              className="cl-clear-btn"
              onClick={() =>
                setFilters({
                  make: "",
                  priceRange: "",
                  year: "",
                  condition: "",
                })
              }
            >
              Clear all
            </button>
          )}
        </div>
        <div className="cl-sort">
          <FaSortAmountDown className="cl-toolbar-icon" />
          <select
            className="cl-select"
            value={sortValue}
            onChange={(e) => setSortValue(e.target.value)}
          >
            <option value="year-desc">Newest First</option>
            <option value="year-asc">Oldest First</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* ── GRID ──────────────────────────────────────────── */}
      {filteredCars.length === 0 ? (
        <div className="cl-empty">
          <span className="cl-empty-icon">◎</span>
          <h3>No vehicles found</h3>
          <p>Try adjusting your filters or search term</p>
        </div>
      ) : (
        <div className="cl-grid">
          {filteredCars.map((car, i) => {
            const sc = statusCfg[car.status?.toLowerCase()] || {
              text: car.status,
              cls: "",
            };
            return (
              <article
                key={car._id}
                className="cl-card"
                style={{ animationDelay: `${Math.min(i * 0.055, 0.55)}s` }}
              >
                {/* IMAGE — no badges, no buttons floating here */}
                <div className="cl-card-img">
                  <CarImageSlideshow
                    images={car.images.map(
                      (img) => `http://localhost:5000${img}`,
                    )}
                    height="240px"
                    altPrefix={`${car.year} ${car.brand} ${car.model}`}
                  />
                  <div className="cl-img-vignette" />
                </div>

                {/* BODY */}
                <div className="cl-card-body">
                  {/* badges row */}
                  <div className="cl-badge-row">
                    <span className={`cl-badge ${sc.cls}`}>{sc.text}</span>
                    <span
                      className={`cl-badge ${car.listedByAdmin ? "badge-admin" : "badge-seller"}`}
                    >
                      {car.listedByAdmin
                        ? "Posted by an Admin"
                        : "Posted by a Seller"}
                    </span>
                  </div>

                  {/* title + price */}
                  <div className="cl-title-row">
                    <h3 className="cl-car-title">
                      {car.year} {car.brand} <em>{car.model}</em>
                    </h3>
                    <span className="cl-price">
                      ${car.price.toLocaleString()}
                    </span>
                  </div>

                  {/* specs */}
                  <div className="cl-specs">
                    <span className="cl-spec">
                      <FaCar />
                      {car.type || "N/A"}
                    </span>
                    <span className="cl-spec">
                      <BsSpeedometer2 />
                      {(car.mileage || 0).toLocaleString()} mi
                    </span>
                    <span className="cl-spec">
                      <BiGasPump />
                      {car.fuelType || "N/A"}
                    </span>
                    <span className="cl-spec">
                      <FaMapMarkerAlt />
                      {car.location || "Nairobi"}
                    </span>
                  </div>

                  {/* description */}
                  {car.description && (
                    <p className="cl-desc">{car.description}</p>
                  )}

                  {/* buttons */}
                  <div className="cl-actions">
                    <div className="cl-actions-top">
                      <button
                        className="cl-btn-details"
                        onClick={() => navigate(`/car/${car._id}`)}
                      >
                        View Details
                      </button>
                      <button
                        className="cl-btn-order"
                        onClick={() => navigate(`/order/${car._id}`)}
                      >
                        Order Now
                      </button>
                    </div>
                    <button
                      className="cl-btn-watchlist"
                      onClick={(e) => handleAddToWatchlist(e, car._id)}
                    >
                      <FaHeart /> Add to Watchlist
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CarListings;
