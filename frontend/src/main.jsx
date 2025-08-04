import { createRoot } from "react-dom/client";
import "./index.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./Routes/rootRoute.js";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import store from "../App/store.js";
import { Provider } from "react-redux";

const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);

const queryClient = new QueryClient();

const router = createRouter({ routeTree, context: { queryClient, store } });

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>
);
