import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Router from "@/router/Router";
import ThemeProvider from "./lib/ThemeProvider";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </ThemeProvider>
);
