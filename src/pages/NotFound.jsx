import { Link } from "react-router-dom";

export default function NotFound({ message = "Page not found" }) {
  return (
    <div className="container" style={{ padding: "128px 0", textAlign: "center" }}>
      <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.875rem", marginBottom: 12 }}>{message}</h1>
      <Link to="/" className="btn btn-primary btn-sm">Back to home</Link>
    </div>
  );
}
