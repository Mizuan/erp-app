import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-gray-800 text-white p-4">
    <Link to="/" className="font-bold text-xl">
      React Vite App
    </Link>
  </nav>
);

export default Navbar;
