<template>
  <div class="row width-100">
    <div class="col-md-4 col-12" v-for="(group, groupIn) in groups" :key="groupIn">
      <div
        v-for="(category, categoryIn) in group"
        :key="categoryIn"
        class="mb-30"
        v-if="filteredShortcuts(category).length !== 0"
      >
        <p class="text-left pointer" @click="viewCollapse(category)">
          <b>
            {{ category }}
            <i
              :class="classCollapse(category) ? 'fa fa-caret-down' : 'fa fa-caret-up'"
              aria-hidden="true"
            ></i>
          </b>
        </p>
        <div
          v-for="(shortcut, index) in filteredShortcuts(category)"
          :key="index"
          class="d-flex flex-column cards"
          v-if="shortcut[platform].length !== 0 && classCollapse(category)"
        >
          <div
            class="keys keys-windows d-flex flex-row align-items-center flex-wrap justify-content-between pointer"
            @click="bookmark(shortcut.id, category)"
          >
            <div class="width-90 d-flex flex-row align-items-center">
              <i
                :class="platform === 'windows' ? 'fa fa-windows icon' : 'fa fa-apple icon'"
                aria-hidden="true"
              ></i>
              <div v-if="shortcut[platform].length">
                <span
                  v-for="(key, keyIn) in shortcut[platform]"
                  :key="keyIn"
                  :class="keyClass(key.type)"
                >{{ key.val }}</span>
                <span class="dash">-</span>
                <span v-if="!shortcut[platform].length" class="operator">-</span>
                <span class="description">{{ shortcut.description }}</span>
              </div>
            </div>
            <i :class="bookmarkStar(shortcut.id, category)" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shortcuts",
  props: {},
  data: function() {
    return {};
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
    },
    groups: function() {
      let software = this.software;

      let groupA,
        groupB,
        groupC = [];

      if (software === "vim") {
        groupA = ["Global", "Cursor Movement", "Insert Mode", "Multiple Files"];
        groupB = [
          "Editing",
          "Marketing Text",
          "Visual Commands",
          "Registers",
          "Marks",
          "Macros",
          "Tabs"
        ];
        groupC = [
          "Cut and Paste",
          "Exiting",
          "Search and Replace",
          "Search in Multiple Files"
        ];
      } else if (software === "excel") {
        groupA = ["Common", "Navigation", "Data Entry"];
        groupB = ["General", "Charts", "Macros", "Selection"];
        groupC = [
          "Workbooks",
          "Worksheets",
          "Format Cells",
          "Number Format",
          "Rows and Columns",
          "Formulas and Functions"
        ];
      }
      return [groupA, groupB, groupC];
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
        return queryCheck(x) && x.category === category;
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

<style>
.width-100 {
  width: 100%;
}
.width-90 {
  flex: 0 0 90%;
  max-width: 90%;
}
.icon {
  padding: 0px 10px 0px 0px;
  margin-bottom: 3px;
}
.symbol {
  background: #fff;
  border: 1px solid #ddd;
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
  text-align: left;
}

.cards {
  border-bottom: 3px dotted #eeeeee;
  width: 100%;
  border-radius: 5px;
  padding: 10px 15px;
}
.cards:hover .bookmark {
  display: block;
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
  font-size: 14px;
  margin-bottom: 0px;
  user-select: none;
}
.keys-mac .symbol {
  background: #616161;
  color: #fff;
  border-color: #616161;
}
.usecase {
  font-size: 10px;
  margin-bottom: 0px;
  text-align: left;
  background: #eeeeee;
  padding: 5px 10px;
  color: #aaa;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
