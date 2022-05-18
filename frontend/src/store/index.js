import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import api from "../api";
import jwt_decode from "jwt-decode";

export default createStore({
  plugins: [
    createPersistedState({
      storage: window.localStorage,
    }),
  ],

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
    },
    onLogoutUser(state) {
      state.user = null;
      delete api.defaults.headers.common.Authorization;
    },
  },
});
