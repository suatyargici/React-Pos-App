import { Badge, Input, message } from "antd";
import { useTranslation, initReactI18next } from "react-i18next";
import { CiLight } from "react-icons/ci";
import { MdOutlineDarkMode } from "react-icons/md";
import Hamburger from "hamburger-react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { SlBasket } from "react-icons/sl";
import Switch from "../Switch";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MobileMenu from "./MobilMenu";
const Header = ({ setSearch }) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState(false);
  const [close, setClose] = useState(false);

  const pathname = useLocation();
  var setTheme = document.body;
  useEffect(() => {
    if (status) {
      setTheme.classList.add("dark");
      localStorage.setItem("PageTheme", JSON.stringify("DARK"));
    } else {
      setTheme.classList.remove("dark");
      localStorage.setItem("PageTheme", JSON.stringify("LIGHT"));
    }
  }, [status]);

  useEffect(() => {
    let GetTheme = JSON.parse(localStorage.getItem("PageTheme"));
    console.log(GetTheme);
    if (GetTheme === "DARK") {
      setTheme.classList.add("dark");
    } else {
      setTheme.classList.remove("dark");
    }
  }, []);

  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const logOut = () => {
    if (window.confirm("Çıkış yapmak istediğinize emin misiniz?")) {
      localStorage.removeItem("posUser");
      navigate("/login");
      message.success("Çıkış işlemi başarılı.");
    }
  };

  return (
    <div className="mb-6 border-b">
      <header className=" flex items-center justify-between gap-10 py-4 px-6">
        <div className="logo">
          <Link to="/">
            <h2 className="text-2xl font-bold md:text-4xl">YARGISOFT</h2>
          </Link>
        </div>
        <Switch status={true} />
        <div
          onClick={() => setStatus(!status)}
          className="dark-mode hover:dark-mode flex  items-center justify-center max-[1280px]:hidden"
        >
          {status ? (
            <CiLight
              size={30}
              style={{
                cursor: "pointer",
              }}
            />
          ) : (
            <MdOutlineDarkMode
              size={30}
              style={{
                cursor: "pointer",
              }}
            />
          )}
        </div>
        <span className="max-[1280px]:hidden">{t("welcome")}</span>
        <div
          className="header-search flex flex-1 justify-center"
          onClick={() => {
            pathname !== "/" && navigate("/");
          }}
        >
          <Input
            size="large"
            placeholder="Ürün Ara..."
            prefix={<SearchOutlined />}
            className="max-w-[800px] rounded-full  max-[1280px]:hidden"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
        <div className="menu-links fixed bottom-0 left-0 z-50 flex w-screen items-center justify-between gap-7 border-t bg-white px-4 py-1 max-[1280px]:hidden md:static md:w-auto md:border-t-0 md:bg-transparent md:px-0">
          <Link
            to={"/"}
            className={`menu-link ${pathname === "/" && "text-[#40a9ff]"}`}
          >
            <HomeOutlined className="text-xl md:text-2xl" />
            <span className="text-[10px] md:text-xs">{t("home-page")}</span>
          </Link>

          <Link
            to={"/cart"}
            className={`menu-link relative ${
              pathname === "/cart" && "text-[#40a9ff]"
            }`}
          >
            <SlBasket className="text-xl md:text-2xl" />
            <span className="text-[10px] md:text-xs">{t("basket")}</span>
            {cart.cartItems.length > 0 && (
              <div className="absolute bottom-[34px] left-4 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-sm text-white">
                <span> {cart.cartItems.length}</span>
              </div>
            )}
          </Link>

          <Link
            to={"/bills"}
            className={`menu-link ${
              pathname === "/bills" && "!text-[#40a9ff]"
            }`}
          >
            <CopyOutlined className="text-xl md:text-2xl" />
            <span className="text-[10px] md:text-xs">{t("bills")}</span>
          </Link>
          <Link
            to={"/customers"}
            className={`menu-link ${
              pathname === "/customers" && "text-[#40a9ff]"
            }`}
          >
            <UserOutlined className="text-xl md:text-2xl" />
            <span className="text-[10px] md:text-xs">{t("customers")}</span>
          </Link>
          <Link
            to={"/statistic"}
            className={`menu-link ${
              pathname === "/statistic" && "text-[#40a9ff]"
            }`}
          >
            <BarChartOutlined className="text-xl md:text-2xl" />
            <span className="text-[10px] md:text-xs">{t("statistics")}</span>
          </Link>
          <div
            onClick={logOut}
            className="menu-link flex cursor-pointer flex-col transition-all hover:text-[#40a9ff]"
          >
            <LogoutOutlined className="text-xl md:text-2xl" />
            <span className="text-[10px] md:text-xs">{t("logout")}</span>
          </div>
        </div>
        <Badge
          count={5}
          offset={[0, 0]}
          className="flex max-[1280px]:hidden  md:hidden"
        >
          <Link
            to={"/"}
            className="menu-link  flex flex-col transition-all hover:text-[#40a9ff]"
          >
            <ShoppingCartOutlined className="text-2xl" />
            <span className="text-[10px] md:text-xs">Sepet</span>
          </Link>
        </Badge>
        <div className="min-[1280px]:hidden">
          <Hamburger toggled={close} toggle={() => setClose(!close)} />
        </div>
      </header>
      <MobileMenu close={close} setClose={setClose} />
    </div>
  );
};

export default Header;
