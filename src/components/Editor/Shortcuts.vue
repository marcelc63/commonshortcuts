<style scoped lang="scss">
.width-100 {
  width: 100%;
}
.width-90 {
  flex: 0 0 90%;
  max-width: 90%;
}
.shortcuts {
  max-width: 1000px;
  width: 100%;
  height: 100%;
  margin-top: 150px;
}
@media only screen and (max-width: 600px) {
  .shortcuts {
    margin-top: 100px;
  }
}
</style>


<template>
  <div class="shortcuts d-flex flex-row row">
    <div class="col-md-6" v-for="(group, groupIn) in groups" :key="groupIn">
      <div v-for="(category, categoryIn) in group" :key="categoryIn" class="mb-30">
        <div v-if="filteredShortcuts(category).length !== 0">
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
    </div>
  </div>
</template>

<script>
import Card from "@/components/Editor/Card.vue";

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
      return [groupA, groupB];
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
          queryCheck(x) && x.category === category && x[platform].length !== 0
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