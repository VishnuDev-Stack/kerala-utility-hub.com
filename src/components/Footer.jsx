import { Link } from "react-router-dom";
import { districts } from "../data/data";
import { Compass } from "./Icons";
import SectionLink from "./SectionLink";

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="foot-grid">
          <div>
            <div className="foot-brand">
              <span className="brand-mark"><Compass /></span>
              <span className="brand-name">Kerala Utility Hub</span>
            </div>
            <p className="foot-about">
              A curated atlas of Kerala's destinations — beaches, waterfalls, wildlife, dams and heritage — organized district by district.
            </p>
          </div>
          <div>
            <h4 className="foot-h">Districts</h4>
            <div className="foot-links">
              {districts.slice(0, 8).map((d) => (
                <Link key={d.id} to={`/district/${d.id}`}>{d.name}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="foot-h">Explore</h4>
            <ul className="foot-list">
              <li><SectionLink to="categories">Browse by category</SectionLink></li>
              <li><SectionLink to="districts">All 14 districts</SectionLink></li>
              <li>
                <a href="#/" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                  Back to top
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <p>© {YEAR} Kerala Utility Hub</p>
          <p>Curated · Built-in Content</p>
        </div>
      </div>
    </footer>
  );
}
