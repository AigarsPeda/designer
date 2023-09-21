import HomeView from "@/views/HomeView.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const isProd = import.meta.env.PROD;
const baseUrl = import.meta.env.BASE_URL;

console.log("isProd", isProd, "baseUrl", baseUrl);

const router = createRouter({
  history: createWebHashHistory(baseUrl),

  routes: [
    {
      path: "/",
      // path: isProd ? "/designer/" : "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      // path: isProd ? "/designer/about" : "/about",
      name: "about",
      component: () => import("@/views/AboutView.vue"),
    },
    {
      path: "/design",
      // path: isProd ? "/designer/design" : "/design",

      name: "design",
      component: () => import("@/views/DesignView.vue"),
    },
  ],
});

export default router;
