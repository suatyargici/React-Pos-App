import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types"

const Switch = () => {
  const { t, i18n } = useTranslation();
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    if (isSelected) {
      i18n.changeLanguage("tr");
    } else {
      i18n.changeLanguage("en");
    }
  };



  

  return (
    <div
      onClick={handleClick}
      className={classNames(
        "m-10 shrink-0 relative flex h-10 w-20 cursor-pointer items-center rounded-full bg-gray-600 px-2 transition-all duration-700",
        {
          "bg-green-500": isSelected,
        }
      )}
    >
      <span
        className={classNames(
          "h-8 w-8 z-10 rounded-full bg-white transition-all duration-700",
          {
            "bg-green-500": isSelected,
            "ml-8": isSelected,
          }
        )}
      />
      <span className="absolute top-2 left-3 text-white">TR</span>
      <span className="absolute top-2 right-2 text-white">EN</span>
    </div>
  );
};

Switch.propTypes = {
  isSelected: PropTypes.bool,
  setIsSelected: PropTypes.func,
  handleClick: PropTypes.func,
};


export default Switch;
