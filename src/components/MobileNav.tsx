import { Link, useLocation } from "react-router-dom";
import { Circle as Home, Search, Bookmark, User, Mic } from "lucide-react";

const MobileNav = () => {
  const location = useLocation();

  return (
    <nav className="mobile-nav md:hidden">
      <Link
        to="/"
        className={`mobile-nav-item ${
        location.pathname === "/" ? "text-primary" : ""}`
        }>

        <Home className="mobile-nav-icon" />
        <span>Home</span>
      </Link>
      <Link
        to="/search"
        className={`mobile-nav-item ${
        location.pathname === "/search" ? "text-primary" : ""}`
        }>

        <Search className="mobile-nav-icon" />
        <span>Search</span>
      </Link>
      <button className="mobile-nav-item">
        <Mic className="mobile-nav-icon" />
        <span>Voice</span>
      </button>
      <Link
        to="/bookmarks"
        className={`mobile-nav-item ${
        location.pathname === "/bookmarks" ? "text-primary" : ""}`
        }>

        <Bookmark className="mobile-nav-icon" />
        <span>Saved</span>
      </Link>
      <Link
        to="/profile"
        className={`mobile-nav-item ${
        location.pathname === "/profile" ? "text-primary" : ""}`
        }>

        <User className="mobile-nav-icon" />
        <span>Profile</span>
      </Link>
    </nav>);

};

export default MobileNav;