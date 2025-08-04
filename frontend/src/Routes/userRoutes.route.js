import { createRoute, createLazyRoute } from "@tanstack/react-router";
import { rootRoute } from "./rootRoute";
import { getUser } from "../lib/features/getUser";
import { getChannelInfo } from "../lib/features/getChannelInfo";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/test",
}).lazy(() => import("../Pages/Test").then((d) => d.Route));

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  loader: ({ context }) => getUser(context),
}).lazy(() => import("../Pages/userPages/Home").then((d) => d.Route));

export const settingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/setting/$id",
  loader: ({ context }) => getUser(context),
}).lazy(() =>
  import("../Pages/userPages/setting/Settings").then((d) => d.Route)
);

export const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/setting/$username/$id/profile",

  loader: ({ context }) => getUser(context),
}).lazy(() =>
  import("../Pages/userPages/setting/Profile").then((d) => d.Route)
);

export const yourChannelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/setting/$channelName/$id/your-channel",
  loader: async ({ context, params }) => {
    const user = await getUser(context);
    const channel = await getChannelInfo(context, params);

    return { user, channel };
  },
}).lazy(() => import("../Pages/channel/YourChannel").then((d) => d.Route));

export const passwordChangeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/setting/$username/$id/password",
  loader: ({ context }) => getUser(context),
}).lazy(() =>
  import("../Pages/userPages/setting/ChangePassword").then((d) => d.Route)
);

export const themeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/setting/$username/$id/theme",
  loader: ({ context }) => getUser(context),
}).lazy(() => import("../Pages/userPages/setting/Theme").then((d) => d.Route));

export const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/setting/$username/$id/about",
  loader: ({ context }) => getUser(context),
}).lazy(() => import("../Pages/userPages/setting/About").then((d) => d.Route));

export const subscriptionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/subscription",
}).lazy(() => import("../Pages/userPages/Subscription").then((d) => d.Route));


