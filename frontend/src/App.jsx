import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {Home }  from './pages/Home.jsx';
import { About } from './pages/About.jsx';

import ProductDetails from './pages/ProductDetails.jsx';
import Dashboard from './pages/Dashboard.jsx';

import  ProductManagement  from './pages/productManagement.jsx';
import EditDetails from './pages/editDetails.jsx';

import  OrderManagement  from './pages/orderManagement.jsx';
import  PickupRequestManagement  from './pages/PickupRequestManagement.jsx';
import TestLogin from './pages/TestLogin.jsx';
import  LoginProvider from './components/TokenProvider.jsx';
import './App.css';

function Header() {
  return (
    <header>
      <Link to="/" className='link'>Home </Link>
      <Link to="/about" className='link'>About </Link>
      <Link to="/testLogin" className='link'>Test Login Page </Link>
      <Link to="/details/1" className='link'>Product details</Link> {/* for testing purposes -  will delete after */}
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
            <Route path="/testLogin" element={<TestLogin />} />
            <Route path="/details/:id" element={<ProductDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/product-management" element={<ProductManagement />} />
            <Route path="/edit-details/:id" element={<EditDetails />} />
            

            <Route path="/order-management" element={<OrderManagement />} />
            <Route path="/pickup-request-management" element={<PickupRequestManagement />} />
          </Routes>
        </BrowserRouter>
      </LoginProvider>
    </>
  );
}

export default App;