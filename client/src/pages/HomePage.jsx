import { useEffect, useState } from "react";
import CartTotals from "../components/cart/cartTotals";
import Categories from "../components/categories/Categories";
import Header from "../components/header/Header";
import Products from "../components/products/Products";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query"


const HomePage = () => {
  const [categories, setCategories] = useState([]);


  const getCategories =()=>{
    return axios.get(`http://localhost:5000/api/categories/get-all`)
}

  const { data } = useQuery("category",getCategories);
  
  console.log('data :>> ', data);
  return (
    <>
      <Header />
      <div className="home flex flex-col justify-between gap-10 px-6 pb-24 md:flex-row md:pb-0 h-screen">
        <div className="categories max-h-[calc(100vh_-_112px)] overflow-auto md:pb-10">
          <Categories data={data?.data} />
        </div>
        <div className="products max-h-[calc(100vh_-_112px)] flex-[8] overflow-y-auto pb-10">
          <Products 
          categories={data?.data.map((item) => {
            return { ...item, value: item.title };
          })
        }
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
