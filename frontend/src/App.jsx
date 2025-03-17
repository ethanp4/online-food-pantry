import { useState } from 'react'
import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { ProductDetails } from './pages/ProductDetails.jsx'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { LoginProvider } from './components/TokenProvider.jsx'
import TestLogin from './pages/TestLogin.jsx'

function Header() {
  return (
    <header>
      <Link to="/" className='link'>Home </Link>
      <Link to="/about" className='link'>About </Link>
      <Link to="/testLogin" className='link'>Test Login Page </Link>
      <Link to="/details/1" className='link'>Product details</Link> {/* for testing purposes -  will delete after */}
    </header>
  )
}

function App() {
  // fetch("http://localhost:5001/test").then(response => response.json()).then(data => setData(data.message));

  return (
    <>
      <LoginProvider>
        <BrowserRouter>
          <Header />
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

export default App
