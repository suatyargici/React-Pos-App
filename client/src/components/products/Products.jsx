import axios from "axios";
import { useQuery } from "react-query";
import ProductItem from "./ProductItem";

const Products = () => {
  const getProducts = () => {
    return axios.get(`http://localhost:5000/api/products/get-all`);
  };

  const { data } = useQuery("product", getProducts);

  return (
    <div className="products-wrapper grid grid-cols-card gap-4">
      {data?.data.map((item) => (
        <ProductItem key={item.id} item={item}/>
      ))}
    </div>
  );
};

export default Products;
