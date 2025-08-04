import React from "react";
import { createLazyRoute } from "@tanstack/react-router";

const Test = () => {
  return <div>Test</div>;
};

export const Route = createLazyRoute("/test")({
  component: Test,
});

export default Test;
