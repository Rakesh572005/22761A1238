import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<h2>Enter /p, /f, /e, or /r in URL</h2>} />
      <Route path="/:category" element={<App />} />
    </Routes>
  </BrowserRouter>
);
