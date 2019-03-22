import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

function saveStorage(key, val) {
  let storage = window.localStorage;
  let toStore = JSON.stringify(val);
  storage.setItem(key, toStore);
}

export default new Vuex.Store({
  state: {
    isLoaded: false,
    showNav: screen.width > 628 ? true : false,
    shortcuts: [],
    search: "",
    bookmarks: [],
    tab: "shortcuts",
    collapse: [],
    platform: "windows",
    software: "acrobatwin",
    aboutus: true
  },
  mutations: {
    change(state, payload) {
      let { key, data } = payload;
      state[key] = data;
    },
    nav(state, payload) {
      state.showNav = !state.showNav;
    }
  },
  actions: {
    load({ commit }, payload) {
      commit("change", payload);
    },
    save({ commit }, payload) {
      let { key, data } = payload;
      commit("change", payload);
      saveStorage(key, data);
    },
    nav({ commit }) {
      commit("nav");
    }
  }
});
