import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Header from "../components/header/Header";

import "./App.css"; // Ensure global styles are imported

const App = () => {
  return (
    <div className="app-container" style={{ minHeight: '100%', width: '100%' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;