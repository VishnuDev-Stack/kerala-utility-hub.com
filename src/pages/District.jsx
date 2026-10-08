import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { categoryMeta, categoryOrder, getDistrict, placesInDistrict } from "../data/data";
import { ArrowLeft, MapPin, Search } from "../components/Icons";
import PlaceCard from "../components/PlaceCard";
import NotFound from "./NotFound";

export default function DistrictRoute() {
  const { id } = useParams();
  // key resets search/filter state when moving between districts
  return <District key={id} id={id} />;
}

function District({ id }) {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const d = getDistrict(id);
  if (!d) return <NotFound message="District not found" />;

  const all = placesInDistrict(id);
  const q = query.toLowerCase().trim();
  const filtered = all.filter((p) => {
    const catOk = category === "all" || p.category === category;
    const qOk = !q || p.name.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q);
    return catOk && qOk;
  });

  const pills = ["all", ...categoryOrder]
    .map((k) => ({
      k,
      label: k === "all" ? "All" : categoryMeta[k].label,
      n: k === "all" ? all.length : all.filter((p) => p.category === k).length,
    }))
    .filter((p) => p.n > 0);

  const reset = () => { setCategory("all"); setQuery(""); };

  return (
    <>
      <section className="page-hero">
        <img src={d.image} alt={d.name} />
        <div className="ov" />
        <div className="container">
          <div className="c">
            <Link to="/" className="back-link"><ArrowLeft /> All districts</Link>
            <p className="pin"><MapPin /> Kerala · {all.length} destinations</p>
            <h1>{d.name}</h1>
            <p className="tagline">{d.tagline}</p>
            <p className="desc">{d.description}</p>
          </div>
        </div>
      </section>

      <div className="controls">
        <div className="container">
          <div className="search">
            <Search />
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destinations in this district…" />
          </div>
          <div className="filters">
            {pills.map((p) => (
              <button key={p.k} className={`pill${category === p.k ? " active" : ""}`} onClick={() => setCategory(p.k)}>
                {p.label}<span className="c">{p.n}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          <p className="result-meta">Showing {filtered.length} of {all.length}</p>
          <div className="place-grid">
            {filtered.length ? (
              filtered.map((p) => <PlaceCard key={p.id} place={p} />)
            ) : (
              <div className="empty">
                <h3>No matches here</h3>
                <p>Try a different category or clear your search.</p>
                <button className="btn btn-primary btn-sm" onClick={reset}>Reset filters</button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
