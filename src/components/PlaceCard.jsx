import { Link } from "react-router-dom";
import { categoryMeta, getDistrict } from "../data/data";
import { ArrowUpRight, MapPin } from "./Icons";

export default function PlaceCard({ place }) {
  const c = categoryMeta[place.category];
  const dist = getDistrict(place.district);

  return (
    <Link to={`/place/${place.id}`} className="place-card">
      <div className="img-wrap">
        <img src={c.image} alt={place.name} loading="lazy" />
        <div className="ov" />
        <span className="cat-chip">{c.label}</span>
        <div className="title-row">
          <h3>{place.name}</h3>
          <span className="go"><ArrowUpRight /></span>
        </div>
      </div>
      <div className="body">
        <p className="summary">{place.summary}</p>
        <div className="loc"><MapPin /> {dist.name}</div>
      </div>
    </Link>
  );
}
