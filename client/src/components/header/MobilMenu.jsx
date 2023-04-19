import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";
import Switch from "../Switch";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import { useTranslation } from "react-i18next";

const MobileMenu = ({ close, setClose }) => {
  const [status, setStatus] = useState(false);
  const { t } = useTranslation();

  return (
    <div
      className={`fixed top-0 z-10 flex h-screen w-screen flex-col items-center justify-center gap-4 bg-white px-3     
    transition-all duration-1000 ease-in  ${close ? "top-0" : "-top-[800px]"} `}
    >
      <MobileMenuLink
        title={t("home-page")}
        link="/"
        setClose={setClose}
      />
      <MobileMenuLink title={t("basket")} link="/cart" setClose={setClose} />
      <MobileMenuLink
        title={t("bills")}
        link="/bills"
        setClose={setClose}
      />
      <MobileMenuLink
        title={t("customers")}
        link="/customers"
        setClose={setClose}
      />
      <MobileMenuLink
        title={t("statistics")}
        link="/statistics"
        setClose={setClose}
      />

      <div className="flex flex-col ">
        <Switch />
        <div
          onClick={() => setStatus(!status)}
          className="dark-mode hover:dark-mode mx-auto  flex items-center justify-center"
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
      </div>
      <AiOutlineClose
        size={30}
        onClick={() => setClose(false)}
        className="absolute top-10 right-10 cursor-pointer"
      />
    </div>
  );
};

export default MobileMenu;

export const MobileMenuLink = ({ title, link, className, setClose }) => {
  return (
    <Link
      to={link}
      className={twMerge(
        "md:hover:bg-lightGrey  inline-block rounded-lg px-6 py-3 text-2xl font-semibold text-black md:text-base",
        className
      )}
      onClick={() => setClose(false)}
    >
      {title} 
    </Link>
  );
};
