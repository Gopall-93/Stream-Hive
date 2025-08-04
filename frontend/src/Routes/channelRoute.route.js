import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./rootRoute";
import { getUser } from "../lib/features/getUser";
// import { getVideoURL } from "../lib/features/getVideoURL";

export const watchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/watch/$videoId/$viewerId",
  loader: ({ context, params }) => {
    getUser(context);
    // getVideoURL(context, params);
  },
}).lazy(() => import("../Pages/channel/Watch").then((d) => d.Route));
