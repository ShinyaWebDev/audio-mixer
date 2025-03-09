import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Mixer from "../views/Mixer.vue";
import Songs from "../views/Songs.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/mixer", component: Mixer },
  { path: "/songs", component: Songs },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
