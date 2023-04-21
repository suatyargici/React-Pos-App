import axios from "axios";
import { useQuery } from "react-query";
import ProductItem from "./ProductItem";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "./Add";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Products = ({ categories, filtered, search }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();
  const getProducts = () => {
    return axios.get(`http://localhost:5000/api/products/get-all`);
  };

  const { data } = useQuery("product", getProducts);
  const { t } = useTranslation();

  console.log(data);

  return (
    <div className="products-wrapper grid grid-cols-card gap-4">
      {filtered
        ?.filter((item) => item.title.toLowerCase().includes(search))?.map((item) => (
          <ProductItem key={item._id} item={item} />
        ))}
      <div
        className="product-item flex min-h-[180px] cursor-pointer select-none items-center justify-center border bg-purple-800 transition-all hover:opacity-90 hover:shadow-lg"
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusOutlined className=" text-white md:text-2xl" />
      </div>
      <div className="product-item flex min-h-[180px] cursor-pointer select-none items-center justify-center border bg-orange-800 transition-all hover:opacity-90 hover:shadow-lg">
        <EditOutlined
          className=" text-white md:text-2xl"
          onClick={() => navigate("/products")}
        />
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
