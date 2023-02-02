import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartPage from "./pages/CartPage.jsx";
import HomePage from "./pages/HomePage.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
