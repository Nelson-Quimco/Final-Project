import React from "react";

interface Props {
  name: string;
  onClick?: () => void;
  width?: string;
  type?: "button" | "submit";
}

const Button = (props: Props) => {
  const { name, width, type } = props;
  return (
    <button
      className={`text-white bg-blue p-3 rounded-md text-[20px] w-[10rem]`}
      style={{ width }}
      type={type}
      {...props}
    >
      {name}
    </button>
  );
};

export default Button;
