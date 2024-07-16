import { formatDateNormal } from "@/lib/functions/dateFormatter";
import Link from "next/link";
import React from "react";
import { AiOutlineLike } from "react-icons/ai";

interface Props {
  title: string;
  description: string;
  date: Date;
  username: string;
  href: string;
  likes: number;
  key?: string | number;
}

const PostPreview = (props: Props) => {
  const { title, description, date, username, href, likes } = props;
  const formattedDate = formatDateNormal(date);

  return (
    <>
      <Link href={href} className="w-full">
        <div className="border-none rounded-md shadow-md p-4 flex flex-col gap-6 w-full bg-offWhite">
          <div className="flex justify-between">
            <div className="font-bold">{username}</div>
            <div>{formattedDate}</div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-bold">{title}</div>
            <div className=" line-clamp-3 text-wrap whitespace-pre-line">
              {description}
            </div>
            <div className=" flex gap-1">
              <AiOutlineLike size={20} />
              Likes: ({likes})
            </div>
          </div>
        </div>
      </Link>
      {/* <hr className="mt-5 w-full" /> */}
    </>
  );
};

export default PostPreview;
