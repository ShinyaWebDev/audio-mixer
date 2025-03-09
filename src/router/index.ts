import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Mixer from "@/views/Mixer.vue";
import Songs from "@/views/Songs.vue";

const routes = [
  { path: "/audio-mixer/", component: Home },
  { path: "/audio-mixer/mixer", component: Mixer },
  { path: "//audio-mixer/songs", component: Songs },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
