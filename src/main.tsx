import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initGtag } from "@/components/analytics/gtag-init";

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || "G-BFJ0ZJMBTW";

if (import.meta.env.PROD && typeof window !== "undefined") {
  initGtag(measurementId);
}

createRoot(document.getElementById("root")!).render(<App />);
