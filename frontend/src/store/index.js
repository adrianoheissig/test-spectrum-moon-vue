import { createStore } from "vuex";

import api from "../api";
import jwt_decode from "jwt-decode";

export default createStore({
  state: {
    user: null,
  },
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    loginUser(context, payload) {
      context.commit("onLoginUser", payload);
    },
    logoutUser(context) {
      context.commit("onLogoutUser");
    },
  },
  mutations: {
    onLoginUser(state, payload) {
      const token = payload.accessToken;
      const decoded = jwt_decode(token);
      api.defaults.headers.common.Authorization = `bearer ${token}`;
      state.user = decoded;
      localStorage.setItem("userKey", JSON.stringify(decoded));
    },
    onLogoutUser(state) {
      state.user = null;
      localStorage.removeItem("userKey");
      delete api.defaults.headers.common.Authorization;
    },
  },
});
