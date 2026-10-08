import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Compass, Menu, Close } from "./Icons";
import SectionLink from "./SectionLink";

export default function Header() {
  const { pathname } = useLocation();
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

  return (
    <header className={`site-header${open ? " menu-open" : ""}`}>
      <div className="container">
        <Link to="/" className="brand" onClick={close}>
          <span className="brand-mark"><Compass /></span>
          <span>
            <span className="brand-name">Kerala Utility Hub</span>
            <span className="brand-sub">Explore God's Own Country</span>
          </span>
        </Link>
        <button className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open} aria-controls="site-nav" onClick={() => setOpenOn(open ? null : pathname)}>
          {open ? <Close /> : <Menu />}
        </button>
        <nav className="nav" id="site-nav" onClick={close}>
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
