import React from "react";
import { TrendingUp, ArrowUpFromLine } from "lucide-react";

const ChannelCard = ({ info }) => {
  return (
    <div className="flex flex-col gap-8">
      {/* Cover Image */}
      <div className="w-full">
        <img
          className="rounded-box w-full h-52 sm:h-72 md:h-96 object-cover"
          src={info.coverImage}
          alt="cover"
        />
      </div>

      {/* Profile + Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 px-6 sm:px-12">
        {/* Avatar */}
        <div className="avatar">
          <div className="w-28 sm:w-32 md:w-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={info.avatar} alt="avatar" />
          </div>
        </div>

        {/* Channel Details */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold">{info.username}</h1>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400">
            {info.subscriberCount} Subscribers • {info.subscribedToCount} Following • {info.videosCount} Videos
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-2 justify-center md:justify-start">
            <button className="btn btn-outline btn-sm sm:btn-md gap-2">
              <TrendingUp size={18} />
              Analytics
            </button>
            <button className="btn btn-accent btn-sm sm:btn-md gap-2 text-white">
              <ArrowUpFromLine size={18} />
              Upload Video
            </button>
          </div>
        </div>
      </div>

      <div className="divider px-6" />
    </div>
  );
};

export default ChannelCard;
