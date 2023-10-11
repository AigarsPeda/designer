import DesignView from "@/views/DesignView.vue";
import { createRouter, createWebHashHistory } from "vue-router";

// const isProd = import.meta.env.PROD;
const baseUrl = import.meta.env.BASE_URL;
// console.log("isProd", isProd, "baseUrl", baseUrl);

const router = createRouter({
  history: createWebHashHistory(baseUrl),

  routes: [
    {
      path: "/",
      name: "home",
      component: DesignView,
      // component: () => import("@/views/DesignView.vue"),
    },
    // {
    //   path: "/",
    //   name: "home",
    //   component: HomeView,
    // },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/AboutView.vue"),
    },
  ],
});

export default router;
