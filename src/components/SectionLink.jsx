import { useLocation, useNavigate } from "react-router-dom";

// Links to a section on the home page (#districts, #about…). On the home page it
// smooth-scrolls; elsewhere it navigates home and Home scrolls on arrival.
export default function SectionLink({ to, className, children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onClick = (e) => {
    e.preventDefault();
    if (pathname === "/") {
      document.getElementById(to)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: to } });
    }
  };

  return (
    <a href="#/" onClick={onClick} className={className}>
      {children}
    </a>
  );
}
