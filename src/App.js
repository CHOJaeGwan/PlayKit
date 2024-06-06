import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ItemList from "./pages/ItemList";
import "./assets/styles/global.css"; // global.css를 임포트합니다.
import ItemDetail from "./pages/ItemDetail";
import Finish from "./pages/Finish";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<ItemList />} />
        <Route path="/item-detail" element={<ItemDetail />} />
        <Route path="/finish" element={<Finish />} />
      </Routes>
    </Router>
  );
}

export default App;
