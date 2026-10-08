// Brand mark: a compass (red band, north pointer) framing a coconut palm over the
// backwaters on Kerala green. Keep in sync with public/favicon.svg.
const RED = "#C62F2F";
const GREEN = "#1F6E46";
const CREAM = "#F8F4EC";

export default function Logo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="Kerala Utility Hub" className="logo">
      <circle cx="32" cy="32" r="32" fill={RED} />
      <circle cx="32" cy="32" r="27.5" fill={GREEN} />
      <circle cx="32" cy="32" r="23" fill="none" stroke={CREAM} strokeWidth="2" />
      <path d="M57 32h4.5M2.5 32H7M32 57v4.5" stroke={CREAM} strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="32,1.5 26.5,13 37.5,13" fill={CREAM} />
      <g fill="none" stroke={CREAM} strokeWidth="3" strokeLinecap="round">
        <path d="M29 45C30.5 37 32.5 30 36 24" />
        <path d="M36 24C31 19.5 25.5 19.5 21.5 23.5" />
        <path d="M36 24C33.5 18 35 14 39.5 12.5" />
        <path d="M36 24C41 19.5 46.5 20 49.5 24" />
        <path d="M36 24C40.5 23 44.5 26.5 45.5 31" />
        <path d="M36 24C31.5 23.5 27 27 26 31.5" />
      </g>
      <circle cx="35" cy="26.8" r="2.2" fill="#E2453A" />
      <g fill="none" stroke={CREAM} strokeWidth="2.5" strokeLinecap="round">
        <path d="M18 46.5q4.67-3 9.33 0t9.33 0t9.33 0" />
        <path d="M25 51.2q3.5-2.2 7 0t7 0" opacity=".6" />
      </g>
    </svg>
  );
}
