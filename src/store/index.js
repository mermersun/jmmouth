import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: sessionStorage.getItem("name"),
  },
  getters: {},
  mutations: {
    updataUname(state, username) {
      state.username = username;
      sessionStorage.setItem("name", username);
    },
    logout(state) {
      state.username = null;
      sessionStorage.removeItem("name");
    },
  },
  actions: {},
  modules: {},
});
