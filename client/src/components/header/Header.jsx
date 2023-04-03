import { Badge, Input } from "antd";
import { useTranslation, initReactI18next } from "react-i18next";
import { CiLight } from "react-icons/ci";
import { MdOutlineDarkMode } from "react-icons/md";

import { Link } from "react-router-dom";
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Switch from "../Switch";
import { useEffect, useState } from "react";
const Header = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState(false);
  

  var setTheme = document.body
  useEffect(() => {
    if (status) {
      setTheme.classList.add("dark");
    localStorage.setItem(
      "PageTheme",
      JSON.stringify("DARK")

    )

    } else {
      setTheme.classList.remove("dark");
      localStorage.setItem(
        "PageTheme",

        JSON.stringify("LIGHT")
      )
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


  return (
    <div className="mb-6 border-b">
      <header className="flex items-center justify-between gap-10 py-4 px-6">
        <div className="logo">
          <Link to="/">
            <h2 className="text-2xl font-bold md:text-4xl">LOGO</h2>
          </Link>
        </div>
        <Switch />
        <div onClick={()=>setStatus(!status)} className="dark-mode flex justify-center items-center hover:dark-mode">
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

        {t("welcome")}
        <div className="header-search flex flex-1 justify-center">
          <Input
            size="large"
            placeholder="Ürün Ara..."
            prefix={<SearchOutlined />}
            className="max-w-[800px] rounded-full"
          />
        </div>
        <div className="menu-links fixed bottom-0 left-0 z-50 flex w-screen items-center justify-between gap-7 border-t bg-white px-4 py-1 md:static md:w-auto md:border-t-0 md:bg-transparent md:px-0">
          <Link
            to={"/"}
            className="menu-link flex flex-col transition-all hover:text-[#40a9ff]"
          >
            <HomeOutlined className="text-xl md:text-2xl" />
            <span className="text-[10px] md:text-xs">{t("home-page")}</span>
          </Link>
          <Badge count={5} offset={[0, 6]} className="hidden md:flex">
            <Link
              to={"/cart"}
              className="menu-link flex flex-col transition-all hover:text-[#40a9ff]"
            >
              <ShoppingCartOutlined className="text-xl md:text-2xl" />
              <span className="text-[10px] md:text-xs">{t("basket")}</span>
            </Link>
          </Badge>
          <Link
            to={"/bills"}
            className="menu-link flex flex-col transition-all hover:text-[#40a9ff]"
          >
            <CopyOutlined className="text-xl md:text-2xl" />
            <span className="text-[10px] md:text-xs">{t("bills")}</span>
          </Link>
          <Link
            to={"/customers"}
            className="menu-link flex flex-col transition-all hover:text-[#40a9ff]"
          >
            <UserOutlined className="text-xl md:text-2xl" />
            <span className="text-[10px] md:text-xs">{t("customers")}</span>
          </Link>
          <Link
            to={"/statistic"}
            className="menu-link flex flex-col transition-all hover:text-[#40a9ff]"
          >
            <BarChartOutlined className="text-xl md:text-2xl" />
            <span className="text-[10px] md:text-xs">{t("statistics")}</span>
          </Link>
          <Link
            to={"/"}
            className="menu-link flex flex-col transition-all hover:text-[#40a9ff]"
          >
            <LogoutOutlined className="text-xl md:text-2xl" />
            <span className="text-[10px] md:text-xs">{t("logout")}</span>
          </Link>
        </div>
        <Badge count={5} offset={[0, 6]} className="flex md:hidden">
          <Link
            to={"/"}
            className="menu-link flex flex-col transition-all hover:text-[#40a9ff]"
          >
            <ShoppingCartOutlined className="text-2xl" />
            <span className="text-[10px] md:text-xs">Sepet</span>
          </Link>
        </Badge>
      </header>
    </div>
  );
};

export default Header;
