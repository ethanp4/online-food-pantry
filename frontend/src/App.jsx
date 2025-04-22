import { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import { useTranslation } from 'react-i18next';
import "./i18n.js";

import { LoginContext, LoginProvider } from './components/TokenProvider.jsx';
import { CartProvider } from './components/CartProvider.jsx';

import Home from './pages/Home.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Basket from './pages/Basket.jsx';
import OrderConfirmation from './pages/OrderConfirmation.jsx';
import Dashboard from "./pages/Dashboard.jsx";
import OrderManagement from "./pages/orderManagement.jsx";
import PickupRequestManagement from "./pages/PickupRequestManagement.jsx";
import ProductManagement from "./pages/productManagement.jsx";
import EditDetails from "./pages/editDetails.jsx";
import DeliveryPage from "./pages/DeliveryPage.jsx";
import { Profile } from "./pages/Profile.jsx";
import ProfileC from "./pages/profileC.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

function Header() {
  const { t, i18n } = useTranslation();
  const { token, setToken } = useContext(LoginContext)
  const location = useLocation()

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "fr" : "en";
    i18n.changeLanguage(newLang);
  };

  const [ accountType, setAccountType ] = useState("")

  useEffect(() => {
    const fetchAccountType = async () => {
      try {
        const response = await fetch("http://localhost:5001/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          }
        });
        const data = await response.json();
        if (response.ok) {
          setAccountType(data.type);
          console.log("Account type:", data.type);
        }
      } catch (error) {
        console.error("Error fetching account type:", error);
      }
    };

    fetchAccountType();
  }, [token])
  

  if (!token && location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname !== "/reset-password") {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <>
      {token && (
        <header>
          <div className="nav-container">
            <nav className="nav-links">
              <Link to="/" className="link">{t("home")}</Link>
              <Link to="/basket" className="link">{t("basket.title")}</Link>
              { accountType === "admin" && (
                <Link to="/dashboard" className="link">Dashboard</Link>
              )}
              <Link to="/profile" className="link">{t("profile")}</Link>
            </nav>
            <div className="right-actions">
              {/* <button onClick={toggleLanguage} className="translate-btn">
                {i18n.language === "en" ? "Français" : "English"}
              </button> */}
              <a onClick={toggleLanguage}>
                {i18n.language === "en" ? "Français" : "English"}
              </a>
              <a onClick={() => { setToken("") }}>{t("buttons.logout")}</a>
            </div>
          </div>
        </header>
      )}
    </>
  );
}

function App() {
  return (
    <LoginProvider>
      <CartProvider>
        <BrowserRouter>
          <Header /> { /* header component that also redirects to login if token is false */}
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/details/:id" element={<ProductDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-profileC" element={<ProfileC />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Admin */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/products" element={<ProductManagement />} />
            <Route path="/dashboard/orders" element={<OrderManagement />} />
            <Route path="/dashboard/pickup-requests" element={<PickupRequestManagement />} />
            <Route path="/dashboard/products/edit/:id" element={<EditDetails />} />
            <Route path="/dashboard/delivery" element={<DeliveryPage />} />
            <Route path="/reset-password" element={<ResetPassword />} />           
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </LoginProvider>
  );
}

export default App;