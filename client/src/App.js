import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/auth/Register.jsx";
import BillPage from "./pages/BillPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CustomerPage from "./pages/CustomerPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import StatisticPage from "./pages/StatisticPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import Login from "./pages/auth/Login.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RouteControl>
                <HomePage />
              </RouteControl>
            }
          />
          <Route
            path="/cart"
            element={
              <RouteControl>
                <CartPage />
              </RouteControl>
            }
          />
          <Route
            path="/bills"
            element={
              <RouteControl>
                <BillPage />
              </RouteControl>
            }
          />
          <Route
            path="/customers"
            element={
              <RouteControl>
                <CustomerPage />
              </RouteControl>
            }
          />
          <Route
            path="/statistic"
            element={
              <RouteControl>
                <StatisticPage />
              </RouteControl>
            }
          />
          <Route
            path="/products"
            element={
              <RouteControl>
                <ProductPage />
              </RouteControl>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

export const RouteControl = ({ children }) => {
  if (localStorage.getItem("posUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
