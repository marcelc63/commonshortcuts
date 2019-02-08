<template>
  <div class="menubar">
    <span>Test</span>
  </div>
</template>

<script>
export default {
  name: "Menubar",
  props: {},
  computed: {},
  methods: {
    ucfirst: function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
};
</script>

<style scoped lang="scss">
.menubar {
  background: #d7d8fd;
  color: #3047e7;  
  height: 100vh;
  width: 80px;
}
</style>
