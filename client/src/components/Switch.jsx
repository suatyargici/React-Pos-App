import classNames from "classnames";
import React, { useState } from "react";

const Switch = () => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <div
     onClick={()=>setIsSelected(!isSelected)}
    className={
        classNames("m-10 flex items-center px-2 h-10 w-20 rounded-full transition-all duration-700 bg-gray-600 cursor-pointer", {
        "bg-green-500":isSelected
        })}>
      <span
        className={classNames("h-8 w-8  transition-all duration-700 rounded-full bg-white", {
        "bg-green-500":isSelected,
        "ml-8":isSelected
        })}
      />

    </div>
  );
};

export default Switch;
