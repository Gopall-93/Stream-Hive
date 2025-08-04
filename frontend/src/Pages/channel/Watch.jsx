import { createLazyRoute, useSearch } from "@tanstack/react-router";
import { VideoPlayer } from "../../Components/VideoPlayer";
import { useSelector } from "react-redux";


const Watch = () => {
  
  return (
    <div className=" m-5 w-[60%] h-[70%]">
      <VideoPlayer
      />
    </div>
  );
};

export const Route = createLazyRoute("/watch/$videoId/$viewerId")({
  component: Watch,
});

export default Watch;
