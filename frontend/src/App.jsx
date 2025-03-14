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
      <Link to="/">Home </Link>
      <Link to="/about">About </Link>
      <Link to="/testLogin">Test Login Page </Link>
      <Link to="/productDetails">Product details</Link>
    </header>
  )
}

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState("No data")
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
            <Route path="/productDetails" element={<ProductDetails />} />
          </Routes>
        </BrowserRouter>
      </LoginProvider>
    </>
  )
}

export default App
