<template>
  <div class="w-100 d-flex flex-column justify-content-center align-items-center">
    <input v-model="search" class="search-box" placeholder="Search...">

    <div class="wrapper d-flex flex-row justify-content-between mb-10">
      <div class="d-flex flex-row">
        <p :class="classTab('shortcuts')" @click="viewTab('shortcuts')">Shortcuts</p>
        <p :class="classTab('bookmarks')" @click="viewTab('bookmarks')">Bookmarked</p>
      </div>
      <div class="d-flex flex-row">
        <p :class="classPlatform('windows')" @click="viewPlatform('windows')">
          <i class="fa fa-windows icon" aria-hidden="true"></i>
        </p>
        <p :class="classPlatform('mac')" @click="viewPlatform('mac')">
          <i class="fa fa-apple icon" aria-hidden="true"></i>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Options",
  props: {},
  computed: {
    search: {
      get() {
        return this.$store.state.search;
      },
      set(val) {
        this.$store.dispatch("load", { key: "search", data: val });
      }
    },
    software: function() {
      return this.$store.state.software;
    },
    tab: function() {
      return this.$store.state.tab;
    },
    platform: function() {
      return this.$store.state.platform;
    }
  },
  methods: {
    ucfirst: function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    saveStorage: function(store, val) {
      let storage = window.localStorage;
      let toStore = JSON.stringify(val);
      storage.setItem(store, toStore);
    },
    viewTab: function(tab) {
      this.$store.dispatch("save", { key: "tab", data: tab });
    },
    classTab: function(tab) {
      return this.tab === tab ? "label label-selected" : "label";
    },
    viewPlatform: function(platform) {
      this.$store.dispatch("save", { key: "platform", data: platform });
    },
    classPlatform: function(platform) {
      return this.platform === platform
        ? "platform platform-selected"
        : "platform";
    }
  }
};
</script>

<style scoped lang="scss">
.w-100 {
  width: 100%;
}
.wrapper {
  width: 100%;
  max-width: 650px;
}
.search-box {
  max-width: 650px;
  width: 100%;
  margin-bottom: 30px;
  padding: 0px 10px;
  font-size: 28px;
  border-radius: 5px;
  border: 1px solid #ddd;
  box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.05);
}
.search-box::placeholder {
  font-size: 20px;
  color: #d1d1d1;
}
.search-box:focus {
  outline: none;
}
.label {
  user-select: none;
  opacity: 0.7;
  padding: 0 5px;
  cursor: pointer;
}
.label-selected {
  font-weight: 600;
}
.platform {
  opacity: 0.5;
  padding: 0 5px;
  cursor: pointer;
}
.platform-selected {
  opacity: 1;
  font-weight: 600;
}
</style>
