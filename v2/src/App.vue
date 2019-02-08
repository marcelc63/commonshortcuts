<template>
  <div id="app">    
    <router-view/>
  </div>
</template>

<style lang="scss">
// Default
body {
  background: #fafafa;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  // padding: 10px;
}
h1 {
  font-weight: normal;
  margin-bottom: 20px;
}
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #3183ff;
}
a:hover {
  color: #185bc0;
}
b {
  opacity: 0.7;
  user-select: none;
}
input:focus {
  outline: none;
}

// Generic Classes
.p-0 {
  padding: 0px !important;
}
.p-10 {
  padding: 10px;
}
.mb-10 {
  margin-bottom: 10px;
}
.mb-30 {
  margin-bottom: 30px;
}
.width-100 {
  width: 100%;
}
.width-90 {
  flex: 0 0 90%;
  max-width: 90%;
}
.pointer {
  cursor: pointer;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
