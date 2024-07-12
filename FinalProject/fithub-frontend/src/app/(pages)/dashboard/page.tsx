"use client";
import withAuth from "@/components/auth/withAuth";
import useForumRequest from "@/hooks/requests/forum/useForumRequest";
import useWeather from "@/hooks/requests/weather/useWeather.api";
import Link from "next/link";
import React from "react";
import { kelvinToCelsius } from "@/lib/functions/tempConverter";
import { getIcons } from "@/lib/functions/weatherIcon";
import Image from "next/image";

const Dashboard = () => {
  const { allPost } = useForumRequest();
  const { data } = useWeather();

  console.log(allPost);

  let convertedTemp;
  if (data?.main.temp) {
    const temp = kelvinToCelsius(data.main.temp);
    convertedTemp = Math.round(temp);
  }
  data?.weather.map((x) => console.log(x.description));

  return (
    <div className="grid grid-cols-3 gap-10 h-full grid-rows-[10rem_auto]">
      {/* Weather */}
      <div className="flex w-full h-full bg-white shadow-md rounded-[10px]">
        <div className="w-1/2 ">
          <div className="h-full flex flex-col items-center gap-3 justify-center">
            <p className="font-bold text-[40px] text-blue">
              {convertedTemp} °C
            </p>
            <div className="text-blue text-semibold">{data?.name}</div>
          </div>
        </div>
        <div className="w-1/2  bg-blue">
          {data?.weather.map((x, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center w-full gap-3"
            >
              {/* <div className="border-none rounded-full bg-blue"> */}
              <img
                src={getIcons(x.icon)}
                height={100}
                width={100}
                alt="weather-icons.png"
              />
              {/* </div> */}
              <div className="text-white font-semibold text-center">
                {x.description}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* ============= */}
      <div className="rounded-[5px] w-full h-full bg-white shadow-md">
        <div className="bg-blue text-white h-[50px] text-center text-[25px] p-2">
          Today's Workout
        </div>
        <div></div>
      </div>
      <div className="rounded-[5px] w-full h-full bg-white shadow-md">
        <div className="bg-blue text-white h-[50px] text-center text-[25px] p-2">
          Tomorrow's Workout
        </div>
      </div>

      <div className="rounded-[5px] w-full h-[42rem] col-span-2 bg-white shadow-md"></div>
      <div className="rounded-[5px] w-full h-[42rem] flex flex-col items-center p-4 overflow-y-auto bg-white shadow-md">
        <div>Recent Posts</div>
        <div className="flex flex-col gap-3">
          {allPost?.map((posts, index) => (
            <Link
              href={"/forum"}
              className="border-none rounded-md shadow-md p-3 bg-white flex flex-col gap-2 "
              key={index}
            >
              <p className="font-bold text-[15px]">{posts.title}</p>
              <p className="line-clamp-1 text-wrap whitespace-pre-line">
                {posts.content}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
