<style scoped lang="scss">
.w-100 {
  width: 100% !important;
}
.wrapper {
  width: 100%;
  max-width: 650px;
}
.search-box {
  max-width: 650px;
  width: 100%;
  padding: 0px 10px;
  font-size: 28px;
  border-radius: 5px;
  // border: 1px solid #e8e7e4; //Three
  // box-shadow: 0px 0px 15px 5px rgb(247, 246, 243); //Two
  // color: rgb(55, 53, 47); //Five
  border: 1px solid #e8e8e8; //Three
  box-shadow: 0px 0px 15px 5px #f7f7f7; //Two
  color: #383838; //Five
}
.search-box::placeholder {
  font-size: 20px;
  // color: #A1A09C; //Four
  color: #a0a0a0; //Four
}
.search-box:focus {
  outline: none;
}

.options {
  min-height: 90px;
  max-width: 650px;
  width: 100%;
  position: fixed;
  top: 40px;
  z-index: 2;
  padding: 10px;
  margin-bottom: 20px;
}
@media only screen and (max-width: 600px) {
  .options {
    top: 0px;
    margin-bottom: 0px;
  }
}

.nav {
  padding: 0 10px;
  // color: #37352e; //Five
  color: #383838; //Five
  cursor: pointer;
}

.software {
  margin-top: 5px;
  color: #a0a0a0; //Four
}
</style>

<template>
  <div class="options w-100 d-flex flex-row justify-content-center align-items-center">
    <div class="nav flex-column" @click="nav" v-if="showNavMenu">
      <i class="fa fa-bars" aria-hidden="true"></i>
    </div>
    <input v-model="search" class="search-box" :placeholder="'Find '+software+' shortcuts...'">
  </div>
</template>

<script>
import list from "@/config/content.js";

export default {
  name: "Options",
  props: {},
  computed: {
    software: {
      get() {
        let software = this.$store.state.software;
        return list.filter(x => x.var === software)[0].name;
      },
      set(val) {
        this.$store.dispatch("load", { key: "search", data: val });
      }
    },
    search: {
      get() {
        return this.$store.state.search;
      },
      set(val) {
        this.$store.dispatch("load", { key: "search", data: val });
      }
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
    }
  }
};
</script>