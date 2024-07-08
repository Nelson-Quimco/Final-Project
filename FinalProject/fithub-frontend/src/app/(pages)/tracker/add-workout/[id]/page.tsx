import React from "react";

const page = ({ params }: { params: { id: number } }) => {
  return <div>{params.id}</div>;
};

export default page;
