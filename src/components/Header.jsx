import { Link, useLocation } from "react-router-dom";
import { Compass } from "./Icons";
import SectionLink from "./SectionLink";

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="brand">
          <span className="brand-mark"><Compass /></span>
          <span>
            <span className="brand-name">Kerala Utility Hub</span>
            <span className="brand-sub">Explore God's Own Country</span>
          </span>
        </Link>
        <nav className="nav">
          <Link to="/" className={pathname === "/" ? "active" : ""}>Home</Link>
          <SectionLink to="districts">Districts</SectionLink>
          <SectionLink to="categories">Categories</SectionLink>
          <SectionLink to="about">About</SectionLink>
          <SectionLink to="feedback">Feedback</SectionLink>
        </nav>
      </div>
    </header>
  );
}
