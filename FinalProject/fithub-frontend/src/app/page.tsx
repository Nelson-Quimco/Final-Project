"use client";
import { Button } from "@/components";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className=" w-full h-[100vh] flex">
      <div className="w-[50%] h-[100vh] flex justify-center items-center">
        <div className="flex flex-col items-start w-[40rem] gap-5">
          <h1 className=" text-[35px] font-bold">
            FiT <span className="text-red">HUB</span>
          </h1>
          <p className="w-[20rem] text-[25px]">
            Start Tracking Your Healthy Habits, and stay Connected with the
            fitness Community
          </p>
          <Button
            name="Get Started"
            onClick={() => {
              router.push("/login");
            }}
          ></Button>
        </div>
      </div>
      <div className="w-[50%] h-[100vh]">
        <Image
          src="/images/ricardo.png"
          alt="ricardo.png"
          width={800}
          height={800}
          className="absolute right-0 bottom-0"
        ></Image>
      </div>
    </div>
  );
}
