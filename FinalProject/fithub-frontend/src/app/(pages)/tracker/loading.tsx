"use client";
import React from "react";
import { RotatingLines } from "react-loader-spinner";

const loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <RotatingLines width="100" strokeColor="#F05454" />
    </div>
  );
};

export default loading;
