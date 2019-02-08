<template>
  <div>
    <h1>
      <i class="fa fa-keyboard-o" aria-hidden="true"></i> Common
      <span>
        <u>{{ ucfirst(software) }}</u>
      </span>
      Shortcuts
    </h1>
    <div class="wrapper d-flex flex-row align-items-center justify-content-center mb-10">
      <p :class="classSoftware('excel')" @click="viewSoftware('excel')">Excel</p>
      <p :class="classSoftware('vim')" @click="viewSoftware('vim')">Vim</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Control",
  props: {},
  computed: {
    software: function() {
      return this.$store.state.software;
    }
  },
  methods: {
    ucfirst: function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    viewSoftware: function(software) {
      this.$store.dispatch("save", { key: "software", data: software });
    },
    classSoftware: function(software) {
      return this.software === software ? "label label-selected" : "label";
    }
  }
};
</script>

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
</style>
