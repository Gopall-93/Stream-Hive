import React from "react";
import { timeAgo } from "../../utils/timeAgo";
import { useNavigate } from "@tanstack/react-router";
import { nanoid } from "@reduxjs/toolkit";

const VideoCard = ({ details, channelname, avatar, id,viewerId }) => {
  const time = timeAgo(details.createdAt);

  const navigate = useNavigate()

  const handleClick = () => {
    return navigate({to:`/watch/${id}/${viewerId||nanoid(10)}`})
  };

  return (
    <div
      onClick={handleClick}
      className="card bg-base-100 shadow hover:shadow-lg transition duration-300 w-full cursor-pointer"
    >
      <figure>
        <img
          src={details.thumbnail}
          alt="Video Thumbnail"
          className="w-full h-44 sm:h-48 md:h-52 object-cover"
        />
      </figure>
      <div className="card-body p-4 flex flex-row gap-3">
        <div className="avatar">
          <div className="w-10 h-10 rounded-full">
            <img src={avatar} alt="Channel Avatar" />
          </div>
        </div>
        <div className="flex flex-col space-y-0.5">
          <h2 className="card-title text-base leading-snug line-clamp-2">
            {details.title}
          </h2>
          <p className="text-sm text-gray-600">{channelname}</p>
          <p className="text-sm text-gray-500">
            {details.views} views • {time}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
