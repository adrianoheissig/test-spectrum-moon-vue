import { createRouter, createWebHistory } from "vue-router";
import FullView from "../views/FullView.vue";
import MainComponent from "../components/MainComponent.vue";

const routes = [
  {
    path: "/",
    component: FullView,
    redirect: "/main",
    children: [{ name: "main", path: "/main", component: MainComponent }],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
