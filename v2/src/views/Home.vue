<style scoped lang="scss">
.home {
  overflow-y: hidden;
  height: 100vh;
  width: 100%;
}
.hello {
  overflow-y: scroll;
  width: 100%;
}
</style>

<template>
  <div class="home d-flex flex-column">
    <!-- <Toolbar/> -->
    <div class="d-flex flex-row">
      <Menubar/>
      <div class="hello d-flex flex-column align-items-center" v-if="isLoaded">
        <!-- <Control/> -->
        <Options/>
        <Shortcuts/>
      </div>
    </div>
    <AboutUs/>
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

// Shortcuts
import excel from "@/shortcuts/excel.json";
import vim from "@/shortcuts/vim.json";

// Dependencies
import axios from "axios";

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

    let shortcuts = [];
    shortcuts["excel"] = excel.map((x, i) => {
      return {
        category: x.category,
        description: x.description,
        mac: x.mac,
        windows: x.windows,
        id: "excel" + i
      };
    });
    shortcuts["vim"] = vim.map((x, i) => {
      return {
        category: x.category,
        description: x.description,
        mac: x.mac,
        windows: x.windows,
        id: "vim" + i
      };
    });

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
