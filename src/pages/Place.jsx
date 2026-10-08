import { Link, useParams } from "react-router-dom";
import { categoryMeta, getDistrict, getPlace, placesInDistrict } from "../data/data";
import {
  Activity, ArrowLeft, Building, Calendar, Clock, Compass, MapPin, Navigation, Palm, Ticket,
} from "../components/Icons";
import PlaceCard from "../components/PlaceCard";
import NotFound from "./NotFound";

export default function Place() {
  const { id } = useParams();
  const p = getPlace(id);
  if (!p) return <NotFound message="Destination not found" />;

  const d = getDistrict(p.district);
  const c = categoryMeta[p.category];
  const related = placesInDistrict(p.district).filter((x) => x.id !== p.id).slice(0, 3);
  const facts = [
    { Icon: MapPin, k: "Location", v: p.location },
    { Icon: Clock, k: "Timings", v: p.timings },
    { Icon: Ticket, k: "Entry", v: p.entryFee },
    { Icon: Calendar, k: "Best time to visit", v: p.bestTime },
  ];

  return (
    <>
      <section className="page-hero tall">
        <img src={c.image} alt={p.name} />
        <div className="ov" />
        <div className="container">
          <div className="c">
            <Link to={`/district/${p.district}`} className="back-link"><ArrowLeft /> {d.name}</Link>
            <span className="cat-badge">{c.label}</span>
            <h1>{p.name}</h1>
            <p className="summary">{p.summary}</p>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="detail-grid">
          <div>
            <div className="detail-eyebrow"><span className="bar" /><span>About this place</span></div>
            <p className="narrative">{p.description}</p>
            <div style={{ marginTop: 40 }}>
              <h3 className="detail-h3"><Activity /> Things to do</h3>
              <div className="chips">{p.activities.map((a) => <span key={a} className="chip">{a}</span>)}</div>
            </div>
            <div className="travel-box">
              <h3 className="detail-h3"><Navigation /> How to reach</h3>
              <p>{p.travelInfo}</p>
            </div>
          </div>

          <aside>
            <div className="dock">
              <div className="dock-section">
                <p className="dock-label">Essential information</p>
                <ul className="fact-list">
                  {facts.map(({ Icon, k, v }) => (
                    <li key={k} className="fact">
                      <span className="ic"><Icon /></span>
                      <div><p className="k">{k}</p><p className="v">{v}</p></div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="dock-section">
                <h4 className="dock-label"><Building /> Nearby facilities</h4>
                <ul className="fac-list">
                  {p.nearbyFacilities.map((f) => <li key={f}><span className="dot" />{f}</li>)}
                </ul>
              </div>
              <div className="dock-section">
                <h4 className="dock-label"><Compass size={14} /> Coordinates</h4>
                <p className="coords">{p.lat.toFixed(4)}° N, {p.lng.toFixed(4)}° E</p>
                <a className="maps-btn" href={`https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`}
                  target="_blank" rel="noopener noreferrer">
                  <MapPin /> Open in Google Maps
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container" style={{ paddingBottom: 64 }}>
          <div className="related-head"><Palm /><h2>More in {d.name}</h2></div>
          <div className="place-grid">{related.map((rp) => <PlaceCard key={rp.id} place={rp} />)}</div>
        </section>
      )}
    </>
  );
}
