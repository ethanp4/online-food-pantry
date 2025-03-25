import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { About } from "./pages/About.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EditDetails from "./pages/editDetails.jsx";
import OrderManagement from "./pages/orderManagement.jsx";
import PickupRequestManagement from "./pages/PickupRequestManagement.jsx";
import ProductManagement from "./pages/ProductManagement.jsx";
import TestLogin from "./pages/TestLogin.jsx";
import LoginProvider from "./components/TokenProvider.jsx";
import "./App.css";

function Header() {
  return (
    <header>
      <Link to="/" className="link">Home</Link>
      <Link to="/about" className="link">About</Link>
      <Link to="/testLogin" className="link">Test Login Page</Link>
      <Link to="/dashboard" className="link">Dashboard</Link>
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
        </Routes>
      </BrowserRouter>
    </LoginProvider>
  );
}

export default App;
