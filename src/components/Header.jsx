import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Close, Search } from "./Icons";
import Logo from "./Logo";
import SectionLink from "./SectionLink";

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // The mobile menu remembers which page it was opened on, so it closes
  // automatically once the route changes.
  const [openOn, setOpenOn] = useState(null);
  const open = openOn === pathname;
  const close = () => setOpenOn(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Press "/" anywhere (outside a text field) to jump to search.
  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target.tagName;
      if (e.key !== "/" || tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      e.preventDefault();
      navigate("/search");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <header className={`site-header${open ? " menu-open" : ""}`}>
      <div className="container">
        <Link to="/" className="brand" onClick={close}>
          <Logo size={38} />
          <span>
            <span className="brand-name">Kerala Utility Hub</span>
            <span className="brand-sub">Explore God's Own Country</span>
          </span>
        </Link>
        <nav className="nav" id="site-nav" onClick={close}>
          <Link to="/" className={pathname === "/" ? "active" : ""}>Home</Link>
          <SectionLink to="districts">Districts</SectionLink>
          <SectionLink to="categories">Categories</SectionLink>
          <SectionLink to="about">About</SectionLink>
          <SectionLink to="feedback">Feedback</SectionLink>
        </nav>
        <div className="header-actions">
          <Link to="/search" className={`icon-btn${pathname === "/search" ? " active" : ""}`}
            aria-label="Search destinations" title="Search ( / )" onClick={close}>
            <Search />
          </Link>
          <button className="icon-btn menu-toggle" aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open} aria-controls="site-nav" onClick={() => setOpenOn(open ? null : pathname)}>
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
