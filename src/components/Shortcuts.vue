<style scoped lang="scss">
.width-100 {
  width: 100%;
}
.width-90 {
  flex: 0 0 90%;
  max-width: 90%;
}
.shortcuts {
  max-width: 800px;
  width: 100%;
  // max-width: 1150px;
  // width: 100%;
  height: 100% !important;
  // margin-top: 150px;
  position: relative;
}
.shortcuts__container {
  padding-top: 150px;
  margin-bottom: -100px;
  // margin-top: -50px;
}
// @media only screen and (max-width: 600px) {
//   .shortcuts {
//     margin-top: 100px;
//   }
// }

@media only screen and (max-width: 600px) {
  .shortcuts {
    margin-top: 0px;
  }
  .shortcuts__container {
    padding-top: 100px;
    margin-bottom: -100px;
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

.pr-10 {
  padding-right: 10px;
}

.text {
  padding-top: 150px;
  color: #a0a0a0; //Four
  font-size: 14px;
}
</style>


<template>
  <div class="shortcuts width-100 d-flex flex-row row">
    <div class="col-md-12">
      <p
        class="text"
        v-if="bookmarks[software].length === 0 && tab === 'bookmarks'"
      >You have not bookmarked any shortcuts yet. Click the All Shortcuts tab on the menubar on the left to view and add shortcuts you need :)</p>

      <div
        v-for="(category, categoryIn) in group"
        :key="categoryIn"
        class="mb-30 shortcuts__container"
        :id="'cat'+categoryIn"
        v-show="filteredShortcuts(category).length !== 0"
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
        <Card :category="category"/>
      </div>
    </div>
    <!-- <div class="col-md-2">
      <div class="position-fixed pr-10" v-show="showMenu">
        <p v-for="(category, categoryIn) in group" :key="categoryIn" class="category">
          <a :href="'#'+categoryIn">{{category}}</a>
        </p>
      </div>
    </div>-->
  </div>
</template>

<script>
import Card from "@/components/Shortcuts/Card.vue";

export default {
  name: "Shortcuts",
  props: {},
  data: function() {
    return {};
  },
  components: {
    Card
  },
  computed: {
    showMenu: function() {
      return screen.width > 628 ? true : false;
    },
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

      let final = bucket.filter(x => {
        return (
          queryCheck(x) && x.category === category && x.shortcut.length !== 0
        );
      });

      return final;
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