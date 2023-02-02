import React from "react";
import CartTotals from "./components/cart/cartTotals";
import Categories from "./components/categories/Categories";
import Header from "./components/header/Header";
import Products from "./components/products/Products";

const App = () => {
  return (
    <>
    <Header />
    <div className="home px-6 flex justify-between gap-10">
        <div className="categories  overflow-auto max-h-[calc(100vh_-_112px)] pb-64">
          <Categories />
        </div>
        <div className="products flex-[8]">
          <Products/>
      </div>
      <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
          <CartTotals />
      </div>
    </div>
  </>
  );
};

export default App;

