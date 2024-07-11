"use client";
import withAuth from "@/components/auth/withAuth";
import useForumRequest from "@/hooks/requests/forum/useForumRequest";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  const { allPost } = useForumRequest();

  console.log(allPost);

  return (
    <div className="grid grid-cols-3 gap-10 h-full grid-rows-[10rem_auto]">
      <div className="flex rounded-[5px] w-full h-full border"></div>
      <div className="rounded-[5px] w-full h-full border">
        <div className="bg-blue text-white h-[50px] text-center text-[25px] p-2">
          Today's Workout
        </div>
        <div></div>
      </div>
      <div className="rounded-[5px] w-full h-full border">
        <div className="bg-blue text-white h-[50px] text-center text-[25px] p-2">
          Tomorrow's Workout
        </div>
      </div>

      <div className="rounded-[5px] w-full h-[42rem] border col-span-2"></div>
      <div className="rounded-[5px] w-full h-[42rem] border flex flex-col items-center p-4 overflow-y-auto">
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
