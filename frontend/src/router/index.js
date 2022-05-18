import { createRouter, createWebHistory } from "vue-router";
import FullView from "../views/FullView.vue";
import MainComponent from "../components/MainComponent.vue";
import LoginView from "../views/LoginView.vue";

const routes = [
  {
    path: "/",
    component: FullView,
    redirect: "/main",
    children: [
      { name: "main", path: "/main", component: MainComponent },
      { name: "login", path: "/login", component: LoginView },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
