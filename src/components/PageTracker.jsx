import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if window.gtag exists (inserted by your script)
    if (window.gtag) {
      window.gtag("config", "G-T8PGZB2SBS", {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]); // Run this every time the location (URL) changes

  return null;
};

export default PageTracker;
