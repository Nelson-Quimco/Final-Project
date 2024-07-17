"use client";
import Image from "next/image";
import React from "react";
import { FaHome, FaRegUserCircle, FaTable } from "react-icons/fa";
import { MdForum } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import Logo from "../Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiBiceps } from "react-icons/gi";
import Button from "../buttons/Button";
import { useLogoutContext } from "@/providers/modalContext";

const navLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icons: <FaHome size={40} />,
  },
  { name: "Profile", href: "/profile", icons: <FaRegUserCircle size={40} /> },
  {
    name: "Tracker",
    href: "/tracker",
    icons: <GiBiceps size={40} />,
  },
  { name: "Logs", href: "/logs", icons: <FaTable size={40} /> },
  { name: "Forum", href: "/forum", icons: <MdForum size={40} /> },
];

const Sidebar = () => {
  const pathname = usePathname();

  const { setIsOpen } = useLogoutContext();

  return (
    <div className="h-[100vh] fixed w-[15rem] bg-blue flex flex-col justify-between items-center gap-8 shadow-lg">
      <div className="h-[5rem] border-none">
        <Link href={"/dashboard"}>
          <Logo />
        </Link>
      </div>
      <div className="flex-1 h-full text-white text-[20px] flex flex-col gap-10 *:flex *:gap-6 *:items-center *:mr-[30px]">
        {navLinks.map((links, index) => {
          const isActive = pathname.startsWith(links.href);

          return (
            <Link
              href={links.href}
              className={`${isActive ? "text-brightRed" : ""}`}
              key={index}
            >
              {links.icons}
              {links.name}
            </Link>
          );
        })}
      </div>
      <div className="w-full p-2">
        <button
          className=" justify-start flex items-center text-white mr-[30px] gap-6 text-[20px]"
          onClick={() => setIsOpen(true)}
        >
          <RiLogoutBoxRLine size={40} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
