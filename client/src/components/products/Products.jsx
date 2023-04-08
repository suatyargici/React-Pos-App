import axios from "axios";
import { useQuery } from "react-query";

const Products = () => {

  const getProducts =()=>{
    return axios.get(`http://localhost:5000/api/products/get-all`)
}
  
  const {data} = useQuery("product",getProducts)

  return (
    <div className="products-wrapper grid grid-cols-card gap-4">
      {
        data?.data.map((item)=>(

          <div className="product-item border hover:shadow-lg cursor-pointer transition-all select-none" key={item.id}>
          <div className="product-img">
            <img
              src={item?.img}
              alt=""
              className="h-28 object-cover w-full border-b"
            />
          </div>
          <div className="product-info flex flex-col p-3">
            <span className="font-bold">{item?.title}</span>
            <span>{item?.price}₺</span>
          </div>
        </div>
        )
        )
      }

      
    </div>
  );
};

export default Products;