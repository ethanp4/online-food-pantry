import { useState } from 'react'
import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { ProductDetails } from './pages/ProductDetails.jsx'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { LoginProvider } from './components/TokenProvider.jsx'
import TestLogin from './pages/TestLogin.jsx'

function Header() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "fr" : "en";
    i18n.changeLanguage(newLang);
  }

  return (
    <header>
      <Link to="/" className='link'>Home </Link>
      <Link to="/about" className='link'>About </Link>
      <Link to="/testLogin" className='link'>Test Login Page </Link>
      <button onClick={null} className='translate-btn'>Eng/Fr</button> {/* place holder */}
    </header>
  );
}

function App() {
  return (
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
          </Routes>
        </BrowserRouter>
      </LoginProvider>
    </>
  )
}

export default App;