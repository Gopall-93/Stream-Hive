import React from "react";
import { createLazyRoute } from "@tanstack/react-router";

const Subscription = () => {
  return <div>Subscription</div>;
};

export const Route = createLazyRoute("/subscription")({
  component: Subscription,
});

export default Subscription;
