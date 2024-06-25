"use client";
import SearchBar from "@/components/search-bar/search-bar";
import Sidebar from "@/components/sidebar/Sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="flex border rounded-lg h-[50rem] w-[60rem] shadow-md max-h-[60rem] overflow-hidden">
        <div className="w-[70%] flex flex-col p-[3rem] items-center gap-10 max-h-[60rem] overflow-y-auto">
          {children}
        </div>
        <div className="w-[30%] bg-blue flex items-center rounded-md">
          <div className="h-[20rem] text-[15px] p-[1rem] text-white">
            <div className="">
              <h1 className="font-bold text-center mb-[1rem] text-[20px]">
                Stay <span className="text-red">Fit</span> with Us!
              </h1>
              <p className="text-center">
                Track your Routine and Stay connected to the fitness community.{" "}
              </p>
            </div>
            <div className="text-center mt-[15rem]">
              <p>Don't have an account?</p>
              <p>
                <Link
                  href={`${pathname == "/login" ? "/register" : "/login"}`}
                  className=" underline"
                >
                  Sign Up Now!
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
