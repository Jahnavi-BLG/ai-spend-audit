import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuditPage from "./pages/AuditPage";

function App() {
  return (
    // BrowserRouter wraps our entire application to enable routing
    <BrowserRouter>
      <Routes>
        {/* The main route '/' renders our Home component */}
        <Route path="/" element={<Home />} />
        
        {/* The dynamic route '/audit/:id' renders the shared AuditPage */}
        <Route path="/audit/:id" element={<AuditPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;