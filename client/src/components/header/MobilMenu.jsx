import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";
import Switch from "../Switch";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import {AiOutlineClose} from "react-icons/ai"

const MobileMenu = ({ close, setClose }) => {
  const [status, setStatus] = useState(false);
  return (
    <div
      className={`fixed top-0 z-10 flex h-screen w-screen flex-col items-center justify-center gap-4 bg-white px-3     
    transition-all duration-1000 ease-in  ${close ? "top-0" : "-top-[800px]"} `}
    >
      <MobileMenuLink title="About" link="/#about" setClose={setClose} />
      <MobileMenuLink title="FAQ" link="/#faq" setClose={setClose} />
      <MobileMenuLink title="BLOG" link="/blog-posts" setClose={setClose} />
      <MobileMenuLink
        title="Contact"
        link="/#contact"
        className="bg-blue w-[95%] py-4 text-lg"
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
      <AiOutlineClose size={30} onClick={() => setClose(false)} className="absolute top-10 cursor-pointer right-10"/>
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
