import { useEffect, useState } from "react";
import CartTotals from "../components/cart/cartTotals";
import Categories from "../components/categories/Categories";
import Header from "../components/header/Header";
import Products from "../components/products/Products";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

const HomePage = () => {
  const getCategories = () => {
    return axios.get(`http://localhost:5000/api/categories/get-all`);
  };

  const { data } = useQuery("category", getCategories);
  const getProducts = () => {
    return axios.get(`http://localhost:5000/api/products/get-all`);
  };

  const { data: product } = useQuery("product", getProducts);

  const [categories, setCategories] = useState(data?.data);
  const [products, setProducts] = useState(product?.data);
  const [filtered, setFiltered] = useState();
  const [search, setSearch] = useState("");
console.log('search :>> ', search);
  return (
    <>
      <Header setSearch={setSearch} />
      <div className="home flex h-screen flex-col justify-between gap-10 px-6 pb-24 md:flex-row md:pb-0">
        <div className="categories max-h-[calc(100vh_-_112px)] overflow-auto md:pb-10">
          <Categories data={data?.data} setFiltered={setFiltered} />
        </div>
        <div className="products max-h-[calc(100vh_-_112px)] flex-[8] overflow-y-auto pb-10">
          <Products
            categories={categories?.data.map((item) => {
              return { ...item, value: item.title };
            })}
            filtered={filtered}
            search={search}
          />
        </div>
        <div className="cart-wrapper min-w-[300px] border md:-mr-[24px] md:-mt-[24px]">
          <CartTotals />
        </div>
      </div>
    </>
  );
};

export default HomePage;
