<style scoped lang="scss">
.menubar {
  // background: rgb(28, 32, 34);
  // color: rgba(255, 255, 255, 0.6);
  background: rgb(247, 246, 243);
  color: #a1a09c;
  height: 100vh;
  min-width: 240px;
  padding: 20px 10px;
  z-index: 3;
}
p {
  margin-bottom: 0px;
}

.menu__options {
  padding: 3px 10px;
  font-size: 14px;
  cursor: pointer;
  width: 100%;
  border-radius: 2px;
  &:hover {
    background: #e8e7e4;
  }
}
.menu__options--active {
  font-weight: bold;
  color: #37352e;
}
.menu__options--highlight {
  font-weight: bold;
  background: #e8e7e4;
  color: #37352e;
}
.menu__title {
  font-weight: bold;
  font-size: 16px;
  padding: 0 10px;
  color: #37352e;
}
.menu__headline {
  font-weight: 600;
  padding: 0 10px;
  font-size: 10px;
  text-transform: uppercase;
  margin-bottom: 5px;
}
.mb-20 {
  margin-bottom: 20px;
}
.pl-10 {
  padding-left: 10px;
}
.icon {
  width: 15px;
}

@media only screen and (max-width: 600px) {
  .menubar {
    position: absolute;
  }
}
</style>

<template>
  <div class="menubar d-flex flex-column" v-if="showNav">
    <h1 class="menu__title d-flex flex-row align-items-center">
      <i class="em em-keyboard"></i>
      <span class="pl-10">Common Shortcuts</span>
    </h1>

    <div class="mb-20 d-flex flex-column">
      <span class="menu__headline">Tabs</span>
      <span :class="classTab('shortcuts')" @click="viewTab('shortcuts')">
        <i class="fa fa-check icon" aria-hidden="true"></i> All Shortcuts
      </span>
      <span :class="classTab('bookmarks')" @click="viewTab('bookmarks')">
        <i class="fa fa-bookmark icon" aria-hidden="true"></i> Bookmarks
      </span>
    </div>

    <div class="mb-20 d-flex flex-column">
      <span class="menu__headline">Software</span>
      <span :class="classSoftware('excel')" @click="viewSoftware('excel')">
        <i class="fa fa-chevron-right icon" aria-hidden="true"></i> Excel
      </span>
      <span :class="classSoftware('vim')" @click="viewSoftware('vim')">
        <i class="fa fa-chevron-right icon" aria-hidden="true"></i> Vim
      </span>
    </div>

    <div class="mb-20 d-flex flex-column">
      <span class="menu__headline">Platform</span>
      <span :class="classPlatform('windows')" @click="viewPlatform('windows')">
        <i class="fa fa-windows icon" aria-hidden="true"></i> Windows
      </span>
      <span :class="classPlatform('mac')" @click="viewPlatform('mac')">
        <i class="fa fa-apple icon" aria-hidden="true"></i> macOS
      </span>
    </div>

    <div class="mb-20 d-flex flex-column" v-if="showNavMenu">
      <span class="menu__options menu__options--highlight" @click="nav">
        <i class="fa fa-close icon" aria-hidden="true"></i> Close Menu
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Menubar",
  props: {},
  computed: {
    software: function() {
      return this.$store.state.software;
    },
    tab: function() {
      return this.$store.state.tab;
    },
    platform: function() {
      return this.$store.state.platform;
    },
    showNav: function() {
      return this.$store.state.showNav;
    },
    showNavMenu: function() {
      return screen.width < 628 ? true : false;
    }
  },
  methods: {
    ucfirst: function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    nav: function() {
      this.$store.dispatch("nav");
    },
    viewTab: function(tab) {
      this.$store.dispatch("save", { key: "tab", data: tab });
    },
    classTab: function(tab) {
      return this.tab === tab
        ? "menu__options menu__options--active"
        : "menu__options";
    },
    viewPlatform: function(platform) {
      this.$store.dispatch("save", { key: "platform", data: platform });
    },
    classPlatform: function(platform) {
      return this.platform === platform
        ? "menu__options menu__options--active"
        : "menu__options";
    },
    viewSoftware: function(software) {
      this.$store.dispatch("save", { key: "software", data: software });
    },
    classSoftware: function(software) {
      return this.software === software
        ? "menu__options menu__options--highlight"
        : "menu__options";
    }
  }
};
</script>