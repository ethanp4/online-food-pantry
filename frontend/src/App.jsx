import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { useTranslation } from 'react-i18next';
import "./i18n.js";

import { LoginProvider } from './components/TokenProvider.jsx';
import { CartProvider } from './components/CartProvider.jsx';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import TestLogin from './pages/TestLogin.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Basket from './pages/Basket.jsx';
import OrderConfirmation from './pages/OrderConfirmation.jsx';
import Dashboard from "./pages/Dashboard.jsx";
import OrderManagement from "./pages/orderManagement.jsx";
import PickupRequestManagement from "./pages/PickupRequestManagement.jsx";
import ProductManagement from "./pages/ProductManagement.jsx";
import EditDetails from "./pages/EditDetails.jsx";
import DeliveryPage from "./pages/DeliveryPage.jsx";
import { Profile } from "./pages/Profile.jsx";

function Header() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "fr" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <header>
      <nav className="nav-links">
        <Link to="/" className="link">{t("home")}</Link>
        <Link to="/about" className="link">{t("about")}</Link>
        <Link to="/testLogin" className="link">Test Login</Link>
        <Link to="/signup" className="link">{t("signup")}</Link>
        <Link to="/login" className="link">{t("login")}</Link>
        <Link to="/basket" className="link">{t("basket.title")}</Link>
        <Link to="/order-confirmation" className="link">{t("OrderConfirmation")}</Link>
        <Link to="/profile" className="link">My Profile</Link>
        <Link to="/dashboard" className="link">Dashboard</Link>
        <button onClick={toggleLanguage} className="translate-btn">
          {i18n.language === "en" ? "French" : "English"}
        </button>
      </nav>
    </header>
  );
}

function App() {
  return (
    <LoginProvider>
      <CartProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/testLogin" element={<TestLogin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/details/:id" element={<ProductDetails />} />
            <Route path="/profile" element={<Profile />} />

            {/* Admin */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/products" element={<ProductManagement />} />
            <Route path="/dashboard/orders" element={<OrderManagement />} />
            <Route path="/dashboard/pickup-requests" element={<PickupRequestManagement />} />
            <Route path="/dashboard/products/edit/:productId" element={<EditDetails />} />
            <Route path="/dashboard/delivery" element={<DeliveryPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </LoginProvider>
  );
}

export default App;

  