import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="search">
        <FaSearch />
      </Link>
      <Link to="/">
        <FaShoppingCart />
      </Link>
    </nav>
  );
};

export default Header;
