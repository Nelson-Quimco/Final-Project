import React from "react";
import Input from "../input/Input";
import { FaSearch } from "react-icons/fa";

interface Props {}

const SearchBar = (props: Props) => {
  return (
    <div>
      <Input
        placeholder="Search for a User......."
        width="20rem"
        height="30px"
      ></Input>
    </div>
  );
};

export default SearchBar;
