<template>
  <div class="toolbar d-flex flex-row align-items-start justify-content-between">
    <div>
      <span @click="toggleAboutUs" class="toolbar__option">About Common Shortcuts</span>
      <span class="toolbar__option">
        <a href="https://goo.gl/forms/FCLQmhBsjOwUfvtw2" target="_blank">Give Feedback</a>
      </span>
    </div>
    <span class="toolbar__option">
      <a href="https://twitter.com/marcelc63" target="_blank">
        by
        <i class="fa fa-twitter" aria-hidden="true"></i>marcelc63
      </a>
    </span>
  </div>
</template>

<script>
export default {
  name: "Toolbar",
  props: {},
  computed: {
    aboutus: function() {
      return this.$store.state.aboutus;
    }
  },
  methods: {
    toggleAboutUs: function() {
      this.$store.dispatch("save", {
        key: "aboutus",
        data: !this.aboutus
      });
    }
  }
};
</script>

<style scoped lang="scss">
.toolbar {
  background: rgb(28, 32, 34);
  color: rgba(255, 255, 255, 0.6);
  width: 100%;
  padding: 10px 10px;
  min-height: 45px;
  border-bottom: 1px solid rgb(18, 21, 22);
}
.toolbar__option {
  padding: 0 10px;
  font-size: 14px;
}
</style>
