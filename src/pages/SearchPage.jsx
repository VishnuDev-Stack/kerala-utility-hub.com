import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { categoryMeta, categoryOrder, placesInDistrict } from "../data/data";
import { search, suggestions } from "../data/search";
import { ArrowUpRight, Search } from "../components/Icons";
import PlaceCard from "../components/PlaceCard";

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const [category, setCategory] = useState("all");

  const results = useMemo(() => search(query), [query]);
  const shown = category === "all" ? results.places : results.places.filter((p) => p.category === category);

  const setQuery = (q) => {
    setCategory("all");
    setParams(q ? { q } : {}, { replace: true });
  };

  const pills = [
    { k: "all", label: "All", n: results.places.length },
    ...categoryOrder.map((k) => ({
      k, label: categoryMeta[k].label, n: results.places.filter((p) => p.category === k).length,
    })),
  ].filter((p) => p.k === "all" || p.n > 0);

  return (
    <>
      <section className="search-hero">
        <div className="container">
          <p className="section-tag">Search the atlas</p>
          <h1>Find a place in Kerala</h1>
          <div className="search search-lg">
            <Search />
            <input
              type="search" autoFocus value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Try “waterfall”, “Munnar” or “houseboat”…" aria-label="Search destinations"
            />
          </div>
          {!query && (
            <div className="suggest">
              <span>Popular:</span>
              {suggestions.map((s) => (
                <button key={s} className="chip" onClick={() => setQuery(s)}>{s}</button>
              ))}
            </div>
          )}
        </div>
      </section>

      {query && (
        <section className="section" style={{ paddingTop: 32 }}>
          <div className="container">
            {results.districts.length > 0 && (
              <div className="dist-hits">
                <p className="result-meta">Districts</p>
                <div className="dist-hit-list">
                  {results.districts.map((d) => (
                    <Link key={d.id} to={`/district/${d.id}`} className="dist-hit">
                      <img src={d.image} alt="" />
                      <span><strong>{d.name}</strong><small>{placesInDistrict(d.id).length} places · {d.tagline}</small></span>
                      <ArrowUpRight />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {results.places.length > 0 ? (
              <>
                <div className="filters search-filters">
                  {pills.map((p) => (
                    <button key={p.k} className={`pill${category === p.k ? " active" : ""}`} onClick={() => setCategory(p.k)}>
                      {p.label}<span className="c">{p.n}</span>
                    </button>
                  ))}
                </div>
                <p className="result-meta">
                  {shown.length} destination{shown.length === 1 ? "" : "s"} for “{query}”
                </p>
                <div className="place-grid">{shown.map((p) => <PlaceCard key={p.id} place={p} />)}</div>
              </>
            ) : (
              results.districts.length === 0 && (
                <div className="empty">
                  <h3>No results for “{query}”</h3>
                  <p>Check the spelling, or try a broader word like a district or category.</p>
                  <button className="btn btn-primary btn-sm" onClick={() => setQuery("")}>Clear search</button>
                </div>
              )
            )}
          </div>
        </section>
      )}
    </>
  );
}
