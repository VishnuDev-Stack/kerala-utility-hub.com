import { categoryMeta, districts, getDistrict, places } from "./data";

const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

// Each place is indexed once with weighted fields; every query word must match
// somewhere, and better-placed matches (name > district/category > details) rank higher.
const placeIndex = places.map((p) => ({
  place: p,
  fields: [
    [norm(p.name), 10],
    [norm(getDistrict(p.district).name), 5],
    [norm(categoryMeta[p.category].label), 5],
    [norm(p.activities.join(" ")), 3],
    [norm(p.location), 2],
    [norm(`${p.summary} ${p.description}`), 1],
  ],
}));

function scoreWords(words, fields) {
  let total = 0;
  for (const w of words) {
    let best = 0;
    for (const [text, weight] of fields) {
      const i = text.indexOf(w);
      if (i === -1) continue;
      const atWordStart = i === 0 || /\W/.test(text[i - 1]);
      best = Math.max(best, weight * (atWordStart ? 2 : 1));
    }
    if (!best) return 0;
    total += best;
  }
  return total;
}

export function search(query) {
  const words = norm(query).split(/\s+/).filter(Boolean);
  if (!words.length) return { places: [], districts: [] };

  const placeHits = placeIndex
    .map(({ place, fields }) => ({ place, score: scoreWords(words, fields) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.place);

  const districtHits = districts.filter(
    (d) => scoreWords(words, [[norm(d.name), 1], [norm(d.tagline), 1], [norm(d.description), 1]]) > 0
  );

  return { places: placeHits, districts: districtHits };
}

export const suggestions = ["Waterfalls", "Munnar", "Houseboat", "Fort", "Trekking", "Beach", "Wildlife", "Tea"];
