import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./rootRoute";

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
}).lazy(() => import("../Pages/authPages/Login").then((d) => d.Route));
