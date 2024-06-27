import React from "react";

interface Props {
  name: string;
  onClick?: () => void;
  width?: string;
  height?: string;
  type?: "button" | "submit";
  className?: string;
}

const Button = (props: Props) => {
  const { name, width, type, height } = props;
  return (
    <button
      className={`text-white bg-blue p-3 rounded-md text-[20px] w-[10rem]`}
      style={{ width, height }}
      type={type}
      {...props}
    >
      {name}
    </button>
  );
};

export default Button;
