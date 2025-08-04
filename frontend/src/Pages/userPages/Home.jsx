import React, { useEffect, useState } from "react";
import VideoCard from "../../Components/VideoCard";
import { createLazyRoute } from "@tanstack/react-router";


const Home = () => {
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5"></div>
  );
};
export const Route = createLazyRoute("/")({
  component:Home
})

export default Home;
