import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

function saveStorage(key, val) {
  console.log("store");
  let storage = window.localStorage;
  let toStore = JSON.stringify(val);
  storage.setItem(key, toStore);
}

export default new Vuex.Store({
  state: {
    isLoaded: false,
    shortcuts: [],
    search: "",
    bookmarks: { excel: [], vim: [] },
    tab: "shortcuts",
    collapse: { excel: [], vim: [] },
    platform: "windows",
    software: "excel",
    aboutus: true
  },
  mutations: {
    change(state, payload) {
      let { key, data } = payload;
      state[key] = data;
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
    }
  }
});
