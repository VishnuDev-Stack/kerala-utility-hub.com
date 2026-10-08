import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  IMAGES, categoryMeta, categoryOrder, districts, places, placesInDistrict, firstDistrictOf,
} from "../data/data";
import { ArrowRight, ArrowUpRight, MapPin, Search } from "../components/Icons";
import SectionLink from "../components/SectionLink";
import FeedbackForm from "../components/FeedbackForm";

const h2Style = { fontFamily: "var(--font-heading)", fontSize: "clamp(1.75rem,4vw,2.5rem)", fontWeight: 600, textWrap: "balance" };

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  const onSearch = (e) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q").trim();
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  };

  // Arrived from another page via a section link: scroll to that section.
  useEffect(() => {
    const target = location.state?.scrollTo;
    if (target) document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
  }, [location]);

  return (
    <>
      <section className="hero">
        <img src={IMAGES.hero} alt="Kerala backwaters" />
        <div className="hero-overlay" />
        <div className="container">
          <div className="hero-content">
            <p className="eyebrow">14 Districts · {places.length}+ Destinations · 1 Living Atlas</p>
            <h1>Explore Kerala, district by district.</h1>
            <p className="lead">
              Beaches, waterfalls, wildlife sanctuaries, dams and centuries of heritage — with the timings, travel info and facilities you need to actually get there.
            </p>
            <form className="hero-search" role="search" onSubmit={onSearch}>
              <Search />
              <input name="q" type="search" placeholder="Search waterfalls, forts, Munnar…" aria-label="Search destinations" />
              <button type="submit" className="btn btn-primary btn-sm">Search</button>
            </form>
            <div className="hero-actions">
              <SectionLink to="districts" className="btn btn-primary">Browse districts <ArrowRight /></SectionLink>
              <SectionLink to="categories" className="btn btn-ghost">Explore by category</SectionLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="stats">
            <div className="stat"><p className="n">14</p><p className="l">Districts covered</p><p className="s">From Kasaragod to Thiruvananthapuram</p></div>
            <div className="stat"><p className="n">{places.length}+</p><p className="l">Curated destinations</p><p className="s">Beaches, dams, sanctuaries &amp; more</p></div>
            <div className="stat"><p className="n">7</p><p className="l">Categories</p><p className="s">Filter by what you love</p></div>
          </div>
        </div>
      </section>

      <section className="section" id="categories" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div><p className="section-tag">Browse by type</p><h2>Find your kind of place</h2></div>
          </div>
          <div className="cat-grid">
            {categoryOrder.map((k) => {
              const c = categoryMeta[k];
              const n = places.filter((p) => p.category === k).length;
              return (
                <Link key={k} to={`/district/${firstDistrictOf(k)}`} className="cat-tile">
                  <img src={c.image} alt={c.label} loading="lazy" />
                  <div className="ov" />
                  <div className="info"><p className="count">{n} places</p><p className="label">{c.label}</p></div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" id="districts" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div><p className="section-tag">The Living Atlas</p><h2>All 14 districts</h2></div>
            <p>Pick a district to see every destination within it.</p>
          </div>
          <div className="dist-grid">
            {districts.map((d) => (
              <Link key={d.id} to={`/district/${d.id}`} className="dist-card">
                <div className="img-wrap"><img src={d.image} alt={d.name} loading="lazy" /><div className="ov" /></div>
                <div className="meta">
                  <div>
                    <p className="count">{placesInDistrict(d.id).length} places</p>
                    <p className="name">{d.name}</p>
                    <p className="tag">{d.tagline}</p>
                  </div>
                  <span className="arrow"><ArrowUpRight /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="about" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="about-grid">
            <div>
              <p className="section-tag">About</p>
              <h2 style={h2Style}>A living atlas for every traveler in Kerala</h2>
              <p className="about-p">
                Kerala Utility Hub brings together the state's beaches, waterfalls, wildlife sanctuaries, dams, hill stations and heritage sites into one curated guide — organized district by district, so you can plan by where you are or where you're headed.
              </p>
              <p className="about-p">
                Every destination comes with the practical details that actually matter on the road: location, timings, entry fees, nearby facilities, how to reach, and the things you can do there. No clutter, no guesswork — just what you need to explore God's Own Country with confidence.
              </p>
              <div className="about-feats">
                <div><p className="af-t">District-wise</p><p className="af-d">Filter all 14 districts instantly</p></div>
                <div><p className="af-t">7 categories</p><p className="af-d">Beaches to heritage, all covered</p></div>
                <div><p className="af-t">Practical info</p><p className="af-d">Timings, travel &amp; facilities</p></div>
              </div>
            </div>
            <div className="about-img"><img src={IMAGES.hills} alt="Kerala landscape" loading="lazy" /><div className="ov" /></div>
          </div>
        </div>
      </section>

      <section className="section" id="feedback" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="fb-head">
            <p className="section-tag">Feedback</p>
            <h2 style={h2Style}>Share your feedback</h2>
            <p>Spotted something missing, found an error, or have an idea to make this better? We'd love to hear from you.</p>
          </div>
          <div className="fb-wrap"><FeedbackForm /></div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-band">
            <p className="tag">Ready to wander?</p>
            <h2>Start with a district and let Kerala unfold.</h2>
            <p>Each destination comes with location, timings, nearby facilities, travel info and the activities you can do there.</p>
            <Link to={`/district/${districts[0].id}`} className="btn btn-primary" style={{ marginTop: 28 }}>
              <MapPin /> Begin with {districts[0].name}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
