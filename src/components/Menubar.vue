<style scoped lang="scss">
.menubar {
  // background: rgb(247, 246, 243); //Two
  // color: #a1a09c; //Four
  background: #f7f7f7; //Two
  color: #a0a0a0; //Four
  height: 100vh;
  min-width: 240px;
  max-width: 240px;
  padding: 20px 10px;
  z-index: 3;
  overflow-y: scroll;
  // width: 100%;
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
    // background: #e8e7e4; //Three
    background: #e8e8e8; //Three
  }
}
.menu__options--active {
  font-weight: bold;
  // color: #37352e; //Five
  color: #383838; //Five
}
.menu__options--highlight {
  font-weight: bold;
  // background: #e8e7e4; //Three
  // color: #37352e; //Five
  background: #e8e8e8; //Three
  color: #383838; //Five
}
.menu__title {
  font-weight: bold;
  font-size: 16px;
  padding: 0 10px;
  // color: #37352e; //Five
  color: #383838; //Five
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

.category {
  color: #a0a0a0; //Four
  padding: 3px 10px;
  font-size: 12px;
  cursor: pointer;
  width: 100%;
  border-radius: 2px;
  margin-bottom: 0px;
  a {
    color: #a0a0a0; //Four
  }
  &:hover {
    // background: #e8e7e4; //Three
    background: #e8e8e8; //Three
  }
}
</style>

<template>
  <div class="menubar" v-if="showNav">
    <div class="d-flex flex-column">
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

      <div class="mb-20 d-flex flex-column" v-for="(cat, catIn) in category" :key="catIn">
        <span class="menu__headline">{{cat}}</span>
        <span
          v-for="(item, index) in listCategory(cat)"
          :key="index"
          :class="classSoftware(item.var)"
        >
          <span class="d-flex flex-row align-items-center" @click="viewSoftware(item.var)">
            <i class="fa fa-chevron-right icon" aria-hidden="true"></i>
            {{item.name}}
          </span>
          <div v-if="software === item.var" class="d-flex flex-column">
            <span v-for="(category, categoryIn) in group" :key="categoryIn" class="category">
              <a :href="'#cat'+categoryIn">{{category}}</a>
            </span>
          </div>
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

      <div class="mb-20 d-flex flex-column">
        <span class="menu__headline">About</span>
        <span class="menu__options">
          <a href="https://twitter.com/marcelc63">
            <i class="fa fa-twitter icon" aria-hidden="true"></i> marcelc63
          </a>
        </span>
      </div>

      <!-- <div class="mb-20 d-flex flex-column">
        <span class="menu__headline">Tools</span>
        <span class="menu__options" @click="$router.push('/editor')">
          <i class="fa fa-windows icon" aria-hidden="true"></i> Create
        </span>
        <span :class="classPlatform('mac')" @click="viewPlatform('mac')">
          <i class="fa fa-apple icon" aria-hidden="true"></i> Export/Import
        </span>
      </div>-->
      <div class="mb-20 d-flex flex-column" v-if="showNavMenu">
        <span class="menu__options menu__options--highlight" @click="nav">
          <i class="fa fa-close icon" aria-hidden="true"></i> Close Menu
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import list from "@/config/content.js";
import { category } from "@/config/content.js";

export default {
  name: "Menubar",
  props: {},
  computed: {
    list: function() {
      return list.filter(x => {
        return x.platform === this.platform || x.platform === "all";
      });
    },
    category: function() {
      return category;
    },
    shortcuts: function() {
      return this.$store.state.shortcuts;
    },
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
    },
    group: function() {
      let software = this.software;
      let shortcuts = this.shortcuts[software];

      var uniqueArray = arrArg => {
        return arrArg.filter((elem, pos, arr) => {
          return arr.indexOf(elem) == pos;
        });
      };

      let category = uniqueArray(
        shortcuts.map(x => {
          return x.category;
        })
      );
      return category;
    }
  },
  methods: {
    listCategory: function(category) {
      return this.list.filter(x => {
        return x.category === category;
      });
    },
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
      let lastThree = this.software.slice(-3);
      if (lastThree === "win" || lastThree === "mac") {
        let name = this.software.slice(0, -3);
        let newBatch = list.filter(x => {
          return x.name.replace(/\s/g, "").toLowerCase() === name;
        });
        let check = newBatch.length;
        if (check > 1) {
          let newTab = newBatch.filter(
            x => x.var.toLowerCase() !== this.software
          )[0];
          this.$store.dispatch("save", { key: "software", data: newTab.var });
        }
      }
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