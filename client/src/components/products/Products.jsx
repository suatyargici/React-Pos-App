import axios from "axios";
import { useQuery } from "react-query";
import ProductItem from "./ProductItem";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "./Add";
import { useState } from "react";

const Products = ({ categories }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const getProducts = () => {
    return axios.get(`http://localhost:5000/api/products/get-all`);
  };

  const { data } = useQuery("product", getProducts);

  console.log(data)

  return (
    <div className="products-wrapper grid grid-cols-card gap-4">
      {data?.data.map((item) => (
        <ProductItem key={item._id} item={item}/>
      ))}
         <div
        className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-purple-800 flex justify-center items-center hover:opacity-90"
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusOutlined className="text-white md:text-2xl" />
      </div>
      <div className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-orange-800 flex justify-center items-center hover:opacity-90">
        <EditOutlined className="text-white md:text-2xl" />
      </div>
      <Add
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        categories={categories}
/>
    </div>
  );
};

export default Products;
