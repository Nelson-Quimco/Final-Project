import React from "react";

interface Props {
  height?: string;
  width?: string;
  type?: "text" | "password" | "number" | "email";
  onChange?: (e: any) => void;
  placeholder?: string;
  value?: string;
  border?: string;
}

const Input = (props: Props) => {
  const { width, height, type = "text", border } = props;

  return (
    <input
      type={type}
      className="border rounded-lg p-2 w-full font-normal"
      style={{ width, height, border }}
      {...props}
    />
  );
};

export default Input;
