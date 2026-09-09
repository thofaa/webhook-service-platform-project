import React from "react";
import ReactDOM from "react-dom/client";
import { AppPortal } from "./AppPortal";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("portal-root")!).render(
  <React.StrictMode>
    <AppPortal />
  </React.StrictMode>,
);
