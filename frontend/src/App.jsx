
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { About } from "./pages/About.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import OrderManagement from "./pages/orderManagement.jsx";
import PickupRequestManagement from "./pages/PickupRequestManagement.jsx";
import ProductManagement from "./pages/ProductManagement.jsx";
import EditDetails from "./pages/EditDetails.jsx";
import DeliveryPage from "./pages/DeliveryPage"; 



import TestLogin from "./pages/TestLogin.jsx";
import { LoginProvider } from "./components/TokenProvider.jsx";
import { useTranslation } from "react-i18next";
import "./i18n.js";
import "./App.css"; // Ensure styles are applied

import { useState } from 'react'
import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { ProductDetails } from './pages/ProductDetails.jsx'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { LoginProvider } from './components/TokenProvider.jsx'
import TestLogin from './pages/TestLogin.jsx'
import { useTranslation } from "react-i18next";
import "./i18n.js"
import { CartProvider } from './components/CartProvider.jsx'
import { Profile } from './pages/Profile.jsx'


function Header() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "fr" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <header>

      <nav className="nav-links">
        <Link to="/" className="link">Home</Link>
        <Link to="/about" className="link">About</Link>
        <Link to="/testLogin" className="link">Test Login</Link>
        <Link to="/dashboard" className="link">Dashboard</Link>
        
      </nav>
      <button onClick={toggleLanguage} className="translate-btn">
        {i18n.language === "en" ? "French" : "English"}
      </button>


      <Link to="/" className='link'>Home </Link>
      <Link to="/about" className='link'>About </Link>
      <Link to="/testLogin" className='link'>Test Login Page </Link>
      <button onClick={toggleLanguage} className='translate-btn'>{i18n.language === "en" ? "French" : "English"}</button>
      <Link to="/profile">My Profile</Link>


    </header>
  );
}

function App() {
  return (

    <LoginProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/testLogin" element={<TestLogin />} />
          <Route path="/details/:id" element={<ProductDetails />} />

         

          {/* Admin Pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/products" element={<ProductManagement />} />
         
          <Route path="/dashboard/orders" element={<OrderManagement />} />
          <Route path="/dashboard/pickup-requests" element={<PickupRequestManagement />} />
          <Route path="/dashboard/products/edit/:productId" element={<EditDetails />} />
          <Route path="/dashboard/delivery" element={<DeliveryPage />} /> 
        </Routes>
      </BrowserRouter>
    </LoginProvider>
  );

    <>
      <LoginProvider>
        <BrowserRouter>
          <Header />
          {/* should add a function that includes the search bar and cart icon like our whimsical design */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="testLogin" element={<TestLogin />} />
            <Route path="/details/:id" element={<ProductDetails />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </LoginProvider>
    </>
  )

}

export default App;
