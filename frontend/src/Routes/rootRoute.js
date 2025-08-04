import { createRootRoute } from "@tanstack/react-router";
import App from "../App";
import { loginRoute } from "./authRoutes.route";
import {
  aboutRoute,
  homeRoute,
  indexRoute,
  passwordChangeRoute,
  profileRoute,
  settingRoute,
  subscriptionRoute,
  themeRoute,
  yourChannelRoute,
} from "./userRoutes.route";

import { watchRoute } from "./channelRoute.route";

export const rootRoute = createRootRoute({
  component: App,
});

export const routeTree = rootRoute.addChildren([
  loginRoute,
  homeRoute,
  settingRoute,
  profileRoute,
  passwordChangeRoute,
  themeRoute,
  aboutRoute,
  subscriptionRoute,
  yourChannelRoute,
  indexRoute,
  watchRoute
]);
