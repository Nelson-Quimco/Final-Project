import { formatDateNormal } from "@/lib/functions/dateFormatter";
import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  description: string;
  date: Date;
  username: string;
  href: string;
  key?: string | number;
}

const PostPreview = (props: Props) => {
  const { title, description, date, username, href } = props;
  const formattedDate = formatDateNormal(date);

  return (
    <>
      <Link href={href}>
        <div className="border-none rounded-md shadow-md p-4 flex flex-col gap-6 w-[66rem] bg-white">
          <div className="flex justify-between">
            <div className="font-bold">{username}</div>
            <div>{formattedDate}</div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-bold">{title}</div>
            <div className=" line-clamp-3">{description}</div>
          </div>
        </div>
      </Link>
      <hr className="mt-5 w-full" />
    </>
  );
};

export default PostPreview;
