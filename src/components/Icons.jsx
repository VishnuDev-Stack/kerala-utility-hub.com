function Svg({ size = 16, children }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

export const Compass = ({ size = 20 }) => (
  <Svg size={size}><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></Svg>
);
export const ArrowRight = () => <Svg><path d="M5 12h14M12 5l7 7-7 7" /></Svg>;
export const ArrowUpRight = () => <Svg><path d="M7 17 17 7M7 7h10v10" /></Svg>;
export const ArrowLeft = () => <Svg><path d="M19 12H5M12 19l-7-7 7-7" /></Svg>;
export const MapPin = ({ size = 14 }) => (
  <Svg size={size}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></Svg>
);
export const Search = () => <Svg><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></Svg>;
export const Clock = () => <Svg><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></Svg>;
export const Ticket = () => (
  <Svg><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="M13 5v2M13 17v2M13 11v2" /></Svg>
);
export const Calendar = () => <Svg><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18M8 2v4M16 2v4" /></Svg>;
export const Navigation = () => <Svg><polygon points="3 11 22 2 13 21 11 13 3 11" /></Svg>;
export const Activity = () => <Svg><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></Svg>;
export const Building = () => (
  <Svg size={14}><rect width="16" height="20" x="4" y="2" rx="2" /><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" /></Svg>
);
export const Palm = () => (
  <Svg><path d="M12 22V8M5 12c2-3 4-3 7-3s5 0 7 3M12 8c0-2-1-4-3-4M12 8c0-2 1-4 3-4M12 8c-2 0-4-1-4-3M12 8c2 0 4-1 4-3" /></Svg>
);
