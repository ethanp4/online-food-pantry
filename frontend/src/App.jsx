import { useState } from 'react';
import { Home } from './pages/Home.jsx';
import { About } from './pages/About.jsx';
import { ProductDetails } from './pages/ProductDetails.jsx';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { LoginProvider } from './components/TokenProvider.jsx';
import TestLogin from './pages/TestLogin.jsx';
import { CartProvider } from './components/CartProvider.jsx';
import { useTranslation } from 'react-i18next';
import "./i18n.js";



// ✅ Default imports (no curly braces)
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Basket from "./pages/Basket.jsx";
import OrderConfirmation from "./pages/OrderConfirmation.jsx";

function Header() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "fr" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <header>
      <Link to="/" className='link'>{t("home")}</Link>
      <Link to="/about" className='link'>{t("about")}</Link>
      <Link to="/testLogin" className='link'>Test Login Page</Link>
      <Link to="/signup" className='link'>{t("signup")}</Link>
      <Link to="/login" className='link'>{t("login")}</Link>
      <Link to="/basket" className='link'>{t("basket.title")}</Link>
      <Link to="/order-confirmation" className='link'>{t("OrderConfirmation")}</Link>
      <button onClick={toggleLanguage} className='translate-btn'>
        {i18n.language === "en" ? "French" : "English"}
      </button>
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
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/testLogin" element={<TestLogin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/details/:id" element={<ProductDetails />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </LoginProvider>
  );
}

export default App;
