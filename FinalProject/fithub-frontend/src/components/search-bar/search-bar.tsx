"use client";
import React, { useEffect, useState } from "react";
import Input from "../input/Input";
import { FaSearch } from "react-icons/fa";
import useLoginRequest from "@/hooks/requests/user-authentication/useLoginRequest";
import User from "@/constants/userTypes";
import Link from "next/link";

interface Props {}

const SearchBar = (props: Props) => {
  const [input, setInput] = useState("");
  const [filteredAccounts, setFilteredAccounts] = useState<User[]>([]);

  const { data, getAccounts } = useLoginRequest();

  useEffect(() => {
    getAccounts();
  }, []);

  useEffect(() => {
    if (data) {
      const results = data.filter((account: User) =>
        account.username.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredAccounts(results);
    }
  }, [input, data]);

  return (
    <div>
      <div className="relative">
        <Input
          placeholder="Search for a User......."
          width="20rem"
          height="30px"
          onChange={(e) => setInput(e.target.value)}
        />
        <FaSearch className="absolute top-2.5 right-3 text-gray-400" />
      </div>
      <div
        className={`absolute w-[15rem] mt-3 z-10 ${
          input == "" ? "hidden" : ""
        }`}
      >
        {filteredAccounts.length > 0 ? (
          <ul className="bg-white border rounded-md shadow-md">
            {filteredAccounts.map((account: User) => (
              <Link href={`/forum/user/${account.userId}`} key={account.userId}>
                <li
                  key={account.userId}
                  className="p-2 hover:bg-blueGrey hover:text-white"
                >
                  {account.username}
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <div className="bg-white p-1 border rounded-md">No users found</div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
