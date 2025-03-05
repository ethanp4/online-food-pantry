import { useState } from 'react'
import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'

function Header() {
  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </header>
  )
}

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState("No data")
  fetch("http://localhost:5000/test").then(response => response.json()).then(data => setData(data.message));

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
