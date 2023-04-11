import React from "react";
import Header from "../components/header/Header";
import Edit from "../components/products/Edit";
import { useQuery } from "react-query";
import axios from "axios";

const ProductPage = () => {
    const getProducts = () => {
        return axios.get(`http://localhost:5000/api/products/get-all`);
      };
    
      const { data } = useQuery("product", getProducts);
  return (
    <>
      <Header />
      <div className="px-6">
        <h1 className="text-4xl font-bold text-center mb-4">Ürünler</h1>
        <Edit data={data} />
      </div>
    </>
  );
};

export default ProductPage;