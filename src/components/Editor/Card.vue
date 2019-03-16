<style scoped lang="scss">
.label {
  user-select: none;
  opacity: 0.7;
  padding: 0 5px;
  cursor: pointer;
}
.label-selected {
  font-weight: 600;
}

.icon {
  padding: 0px 10px 0px 0px;
  margin-bottom: 3px;
}
.symbol {
  background: #ffffff; //One
  // border: 1px solid #E8E7E4; //Three
  border: 1px solid #e8e8e8; //Three
  padding: 0 5px;
  border-radius: 5px;
}
.operator {
  padding: 0 5px;
}
.dash {
  padding: 0 5px 0 10px;
  font-weight: 300;
}
.description {
  padding: 0 5px;
  text-align: right;
}
@media only screen and (max-width: 600px) {
  .description {
    margin-top: 2px;
    text-align: left;
  }
}

.bookmark {
  cursor: pointer;
  display: none;
}
.bookmark:hover {
  color: rgb(0, 132, 255);
}
.bookmark-selected {
  cursor: pointer;
  display: block;
  color: rgb(0, 132, 255);
}

.desc {
  font-size: 18px;
  margin-bottom: 10px;
}
.info {
  font-size: 12px;
  margin-bottom: 5px;
  opacity: 0.7;
}
.keys {
  width: 100%;
  font-size: 14px;
  margin-bottom: 0px;
  user-select: none;
  padding: 7px 10px;
  // border-bottom: 1px dotted #e8e7e4; //Three
  border-bottom: 1px dotted #e8e8e8; //Three
  cursor: pointer;
}
@media only screen and (min-width: 600px) {
  .keys {
    &:hover {
      // background-color: #e8e7e4; //Three
      background-color: #e8e8e8; //Three
      border-radius: 2px;
    }
  }
}
.keys--highlight {
  // background-color: #e8e7e4; //Three
  background-color: #e8e8e8; //Three
  border-radius: 2px;
  // border-bottom: 1px solid #e8e7e4; //Three
  border-bottom: 1px solid #e8e8e8; //Three
  .symbol {
    // color: rgb(36, 40, 42) !important; //Five
    color: #383838 !important; //Five
  }
}
</style>

<template>
  <div v-if="classCollapse(category)" class="cards__wrapper">
    <div v-for="(shortcut, index) in filteredShortcuts(category)" :key="index">
      <div
        :class="bookmarkKey(shortcut.id, category)"
        @click="bookmark(shortcut.id, category)"
        v-if="shortcut[platform].length !== 0"
      >
        <div>
          <span
            v-for="(key, keyIn) in shortcut[platform]"
            :key="keyIn"
            :class="keyClass(key.type)"
          >{{ key.val }}</span>
          <span v-if="!shortcut[platform].length" class="operator">-</span>
        </div>
        <span class="description">{{ shortcut.description }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    category: String
  },
  computed: {
    search: function() {
      return this.$store.state.search;
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
    collapse: function() {
      return this.$store.state.collapse;
    },
    bookmarks: function() {
      return this.$store.state.bookmarks;
    },
    platform: function() {
      return this.$store.state.platform;
    }
  },
  methods: {
    ucfirst: function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    viewCollapse: function(category) {
      let software = this.software;
      let collapse = this.collapse;
      let check = this.collapse[software].includes(category);
      if (check) {
        collapse[software] = collapse[software].filter(x => x !== category);
      } else {
        collapse[software] = collapse[software].concat(category);
      }

      this.$store.dispatch("save", { key: "collapse", data: collapse });
    },
    classCollapse: function(category) {
      let software = this.software;
      let check = this.collapse[software].includes(category);
      return check ? false : true;
    },
    filteredShortcuts: function(category) {
      let self = this;
      let platform = this.platform;
      let { software, tab, bookmarks, shortcuts } = this;
      let bucket =
        this.tab === "shortcuts"
          ? this.shortcuts[software]
          : this.bookmarks[software];
      let search = self.search.split(" ");

      function queryCheck(query) {
        let check = true;
        search.forEach(x => {
          if (check === true) {
            check = query.description.toLowerCase().includes(x.toLowerCase());
          }
        });
        return check;
      }

      return bucket.filter(x => {
        return (
          queryCheck(x) && x.category === category && x[platform].length !== 0
        );
      });
    },
    bookmark: function(id, category) {
      let software = this.software;
      let bookmarks = this.bookmarks;
      let data = this.shortcuts[software].filter(x => x.id === id)[0];
      let check =
        bookmarks[software].filter(x => x.id === data.id).length === 0;

      if (check) {
        bookmarks[software] = bookmarks[software].concat(data);
      } else {
        bookmarks[software] = bookmarks[software].filter(x => x.id !== data.id);
      }

      this.$store.dispatch("save", { key: "bookmarks", data: bookmarks });
    },
    bookmarkKey: function(id, category) {
      let software = this.software;
      let desktop = screen.width > 628 ? true : false;
      if (this.tab === "shortcuts") {
        let data = this.shortcuts[software].filter(x => x.id === id)[0];
        let check =
          this.bookmarks[software].filter(x => x.id === data.id).length === 0;

        if (desktop) {
          return check
            ? "keys d-flex flex-row align-items-center justify-content-between"
            : "keys keys--highlight d-flex flex-row align-items-center justify-content-between";
        } else {
          return check
            ? "keys d-flex flex-column align-items-left justify-content-between"
            : "keys keys--highlight d-flex flex-column align-items-left justify-content-between";
        }
      }
      if (desktop) {
        return "keys d-flex flex-row align-items-center justify-content-between";
      }
      return "keys d-flex flex-column align-items-left justify-content-between";
    },
    bookmarkStar: function(id, category) {
      let software = this.software;
      if (this.tab === "shortcuts") {
        let data = this.shortcuts[software].filter(x => x.id === id)[0];
        let check =
          this.bookmarks[software].filter(x => x.id === data.id).length === 0;
        return check ? "fa fa-star-o bookmark" : "fa fa-star bookmark-selected";
      }
      return "fa fa-star bookmark-selected";
    },
    keyClass: function(type) {
      return type === "symbol" ? "symbol" : "operator";
    }
  }
};
</script>