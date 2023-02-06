import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BillPage from "./pages/BillPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CustomerPage from "./pages/CustomerPage.jsx";
import HomePage from "./pages/HomePage.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/bills" element={<BillPage />} />
          <Route path="/customers" element={<CustomerPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
