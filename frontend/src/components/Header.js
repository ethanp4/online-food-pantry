import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to="/" className='link'>Home</Link>
      <Link to="/login" className='link'>Login</Link>
    </header>
  )
}