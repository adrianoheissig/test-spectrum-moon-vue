import { createRouter, createWebHistory } from "vue-router";
import FullView from "../views/FullView.vue";
import MainComponent from "../components/MainComponent.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import ProfileView from "../views/ProfileView.vue";
import PageNotFound from "../views/PageNotFound.vue";

const routes = [
  {
    path: "/",
    component: FullView,
    redirect: "/main",
    children: [
      { name: "main", path: "/main", component: MainComponent },
      { name: "login", path: "/login", component: LoginView },
      { name: "register", path: "/register", component: RegisterView },
      { name: "pagenotfound", path: "/pagenotfound", component: PageNotFound },
      {
        name: "profile",
        path: "/profile",
        component: ProfileView,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
