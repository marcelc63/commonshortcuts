import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

var VueScrollTo = require("vue-scrollto");

// You can also pass in the default options
Vue.use(VueScrollTo, {
  container: "#container",
  duration: 500,
  easing: "ease",
  offset: 0,
  force: true,
  cancelable: true,  
  onDone: false,
  onCancel: false,
  x: false,
  y: true,
  onStart: function(element) {
    // scrolling started
    console.log('hi')
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
