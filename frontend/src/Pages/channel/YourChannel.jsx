import React from "react";
import ChannelCard from "../../Components/ChannelCard";
import VideoCard from "../../Components/VideoCard";
import { useSelector } from "react-redux";
import { createLazyRoute } from "@tanstack/react-router";

const YourChannel = () => {
  const { channelInfo } = useSelector((state) => state.channelInfo);
  const {user} = useSelector((state)=>state.user)

  return (
    <div className="flex flex-col gap-8 px-4 md:px-10">
      <ChannelCard info={channelInfo} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
        {channelInfo.videos.length > 0 ? (
          channelInfo.videos.map((video) => (
            <VideoCard
              key={video._id}
              details={video}
              channelname={channelInfo.username}
              avatar={channelInfo.avatar}
              id = {video._id}
              viewerId={user?._id}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No videos found
          </div>
        )}
      </div>
    </div>
  );
};

export const Route = createLazyRoute()({
  component:YourChannel
})

export default YourChannel;
