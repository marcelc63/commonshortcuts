<template>
  <div class="home d-flex flex-row">
    <Menubar/>
    <div class="hello d-flex flex-column justify-content-center align-items-center" v-if="isLoaded">
      <Toolbar/>
      <Control/>
      <Options/>

      <Shortcuts/>
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
    },
    getShortcuts: function(toGet) {
      let count = 0;
      let temp = [];
      toGet.forEach(name => {
        temp[name] = [];
      });
      console.log("test", temp);
      this.$store.dispatch("load", {
        key: "shortcuts",
        data: temp
      });

      toGet.forEach(name => {
        count++;
        this.makeRequest(name, () => {
          console.log(count);
          if (toGet.length === count) {
          }
        });
      });

      this.isLoaded = true;
    },
    makeRequest: function(software, callback) {
      let self = this;
      let temp = this.shortcuts;
      axios
        .get(
          "https://www.googleapis.com/storage/v1/b/commonshortcuts/o/" +
            software +
            ".json?alt=media"
        )
        .then(function(res) {
          temp[software] = res.data.map((x, i) => {
            return {
              category: x.category,
              description: x.description,
              mac: x.mac,
              windows: x.windows,
              id: software + i
            };
          });
          console.log(temp);
          self.$store.dispatch("load", {
            key: "shortcuts",
            data: temp
          });
          callback();
        });
    }
  }
};
</script>

<style>
</style>
