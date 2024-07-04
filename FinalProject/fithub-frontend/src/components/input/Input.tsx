import React from "react";

interface Props {
  height?: string;
  width?: string;
  type?: "text" | "password" | "number" | "email";
  onChange?: (e: any) => void;
  placeholder?: string;
  value?: string | number;
  border?: string;
  required?: boolean;
}

const Input = (props: Props) => {
  const { width, height, type = "text", border, required } = props;

  return (
    <input
      type={type}
      className="border rounded-lg p-2 w-full font-normal"
      style={{ width, height, border }}
      required={required}
      {...props}
    />
  );
};

export default Input;
