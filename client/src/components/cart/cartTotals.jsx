import { Button, message } from "antd";
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { decrease, deleteCart, increase } from "../../redux/cartSlice";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { reset } from "../../redux/cartSlice";


const CartTotals = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="cart flex h-full max-h-[calc(100vh_-_90px)] flex-col">
      <h2 className="bg-blue-600 py-4 text-center font-bold tracking-wide text-white">
  {t("in-basket")}
      </h2>

      <ul className="cart-items flex flex-col gap-y-3 overflow-y-auto px-2 py-2">
        {cart.cartItems.length >0 ? cart.cartItems?.map((item) => (
          <li className="cart-item flex justify-between" key={item._id}>
            <div className="flex items-center">
              <img
                src={item.img}
                alt=""
                className="h-16 w-16 cursor-pointer object-cover"
                onClick={() =>{
                  if (window.confirm("Ürün Silinsin Mi?")) {
                    dispatch(deleteCart(item))
                    message.success("Ürün başarı ile silindi")
                  }
                  
                }}
              />
              <div className="ml-2 flex flex-col">
                <b>{item.title}</b>
                <span>
                  {item.price}₺ x {item.quantity}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-x-1">
              <Button
                type="primary"
                size="small"
                className="flex w-full items-center justify-center !rounded-full"
                icon={<PlusCircleOutlined />}
                onClick={() => dispatch(increase(item))}
              />
              <span className="font-bold">{item.quantity}</span>
              <Button
                type="primary"
                size="small"
                className="flex w-full items-center justify-center !rounded-full"
                icon={<MinusCircleOutlined />}
                onClick={() => {
                  if (item.quantity === 1) {
                    if (window.confirm("Ürün Silinsin Mi?")) {
                      dispatch(decrease(item));
                    }
                  }
                  if (item.quantity > 1) {
                    dispatch(decrease(item));
                  }
                }}
              />
            </div>
          </li>
        )).reverse(): <p>{t("no-product")}.</p>}
      </ul>

      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>{t("subtotal")}</b>
            <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
          </div>
          <div className="flex justify-between p-2">
            <b>KDV %{cart.tax}</b>
            <span className="text-red-700">
              {(cart.total * cart.tax) / 100 > 0
                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                : 0}
              ₺
            </span>
          </div>
        </div>
        <div className="mt-4 border-b">
          <div className="flex justify-between p-2">
            <b className="text-xl text-green-500">{t("grand-total")}</b>
            <span className="text-xl">
              {cart.total + (cart.total * cart.tax) / 100 > 0
                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                : 0}
              ₺
            </span>
          </div>
        </div>
        <div className="py-4 px-2 flex flex-col gap-y-2">
        <Button
            type="primary"
            size="large"
            className="w-full"
            disabled={cart.cartItems.length === 0}
            onClick={()=> navigate("/cart")}
          >
          {t("creat-order")}
          </Button>
          <Button
            type="primary"
            size="large"
            className="w-full"
            disabled={cart.cartItems.length === 0}
            onClick={() => dispatch(reset())}
          >
          {t("clear")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
