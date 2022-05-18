import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);

router.beforeEach((to, from, next) => {
  if (!to.matched.length) next("/pageNotFound");
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("userKey") === null) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

app.use(store).use(router).mount("#app");
