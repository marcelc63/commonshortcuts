<style scoped lang="scss">
.home {
  overflow-y: hidden;
  height: 100vh;
  width: 100%;
}
.hello {
  overflow-y: scroll;
  height: 100vh;
  width: 100%;
}
// @media only screen and (max-width: 600px) {
//   .hello {
//     height: 100%;
//   }
// }
</style>

<template>
  <div class="home d-flex flex-column">
    <!-- <Toolbar/> -->
    <div class="d-flex flex-row">
      <Menubar/>
      <div class="hello d-flex flex-column align-items-center" v-if="isLoaded" id="container">
        <!-- <Control/> -->
        <Options/>
        <Shortcuts/>
      </div>
    </div>
    <!-- <AboutUs/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Toolbar from "@/components/Toolbar.vue";
import Control from "@/components/Control.vue";
import Options from "@/components/Options.vue";
import Shortcuts from "@/components/Shortcuts.vue";
import AboutUs from "@/components/AboutUs.vue";
import Menubar from "@/components/Menubar.vue";

// New Shortcuts
import { shortcuts, softwares } from "@/config/content.js";

// Dependencies
import axios from "axios";
import _ from "lodash";

export default {
  name: "home",
  components: {
    Toolbar,
    Control,
    Options,
    Shortcuts,
    AboutUs,
    Menubar
  },
  created: function() {
    this.getStorage();

    this.$store.dispatch("load", {
      key: "shortcuts",
      data: shortcuts
    });

    this.isLoaded = true;
  },
  data: function() {
    return {
      isLoaded: false
    };
  },
  computed: {
    shortcuts: function() {
      return this.$store.state.shortcuts;
    },
    homeContainer: function() {
      return screen.width > 628 ? "d-flex flex-row" : "d-flex flex-column";
    }
  },
  methods: {
    getStorage: function() {
      this.loadStorage("bookmarks");
      this.loadStorage("platform");
      this.loadStorage("software");
      this.loadStorage("tab");
      this.loadStorage("collapse");
      this.loadStorage("aboutus");
    },
    loadStorage: function(store) {
      let storage = window.localStorage;
      let data = storage.getItem(store);
      if (data !== null) {
        let payload = JSON.parse(data);
        this.$store.dispatch("load", {
          key: store,
          data: payload
        });
      }
      if (data === null && store === "bookmarks") {
        this.$store.dispatch("load", {
          key: "bookmarks",
          data: _.cloneDeep(softwares)
        });
      }
      if (data === null && store === "collapse") {
        this.$store.dispatch("load", {
          key: "collapse",
          data: _.cloneDeep(softwares)
        });
      }
    },
    saveStorage: function(store, val) {
      let storage = window.localStorage;
      let toStore = JSON.stringify(val);
      storage.setItem(store, toStore);
    },
    ucfirst: function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
};
</script>
