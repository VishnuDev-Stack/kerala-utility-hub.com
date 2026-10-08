import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import DistrictRoute from "./pages/District";
import Place from "./pages/Place";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const { pathname, state } = useLocation();
  useEffect(() => {
    if (!state?.scrollTo) window.scrollTo(0, 0);
  }, [pathname, state]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/district/:id" element={<DistrictRoute />} />
        <Route path="/place/:id" element={<Place />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
