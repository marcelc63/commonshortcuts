<style scoped lang="scss">
.editor {
  padding: 10px;
}
</style>

<template>
  <div class="d-flex flex-column editor">
    <input placeholder="Description" v-model="temporary.description">
    <input placeholder="Category" v-model="temporary.category">
    <select v-model="temporary.platform">
      <option value="windows" selected>Windows</option>
      <option value="mac">Mac</option>
    </select>
    <select v-model="temporary.type">
      <option value="symbol" selected>Symbol</option>
      <option value="operator">Operator</option>
    </select>
    <div class="d-flex flex-row">
      <input placeholder="Value" v-model="temporary.val">
      <button @click="temporary.val = '⌘'">⌘</button>
      <button @click="temporary.val = 'Ctrl'">Ctrl</button>
      <button @click="temporary.val = 'Enter'">Enter</button>
      <button @click="temporary.val = 'Alt'">Alt</button>
      <button @click="temporary.val = '↑'">↑</button>
      <button @click="temporary.val = '↓'">↓</button>
      <button @click="temporary.val = '←'">←</button>
      <button @click="temporary.val = '→'">→</button>
    </div>
    <button @click="addKey">Add Key</button>
    <button @click="addShortcut">Add Shortcut</button>

    <br>
    <div class="d-flex flex-row">
      <div class="d-flex flex-column col-6">
        <p>Preview</p>
        <div>
          <textarea v-model="jsonstr" rows="8" cols="40"></textarea>
          <pre>{{ jsonstr | pretty }}</pre>
        </div>
      </div>
      <div class="d-flex flex-column col-6">
        <p>Shortcuts</p>
        <textarea v-model="shortcutsstr" rows="8" cols="40"></textarea>
        <div v-for="(item,index) in shortcuts" :key="index">
          <p>Description: {{item.description}}</p>
          <p>Category: {{item.category}}</p>
          <div class="d-flex flex-row">
            <span>Windows:</span>
            <span v-for="(key, winIn) in item.windows" :key="winIn">{{key.val}}</span>
          </div>
          <div class="d-flex flex-row">
            <span>Mac:</span>
            <span v-for="(key, macIn) in item.mac" :key="macIn">{{key.val}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

// Shortcuts
import excel from "@/shortcuts/excel.json";
import vim from "@/shortcuts/vim.json";

// Dependencies
import axios from "axios";

export default {
  name: "home",
  components: {},
  created: function() {},
  data: function() {
    return {
      temporary: {
        description: "",
        category: "",
        windows: [],
        mac: [],
        type: "symbol",
        val: "",
        platform: "windows"
      },
      shortcuts: []
    };
  },
  computed: {
    jsonstr: {
      get: function() {
        return JSON.stringify(this.temporary, undefined, 4);
      },
      set: function(newVal) {
        this.temporary = JSON.parse(newVal);
      }
    },
    shortcutsstr: {
      get: function() {
        return JSON.stringify(this.shortcuts, undefined, 4);
      },
      set: function(newVal) {
        this.shortcuts = JSON.parse(newVal);
      }
    }
  },
  methods: {
    addKey: function() {
      this.temporary[this.temporary.platform].push({
        type: this.temporary.type,
        val: this.temporary.val
      });
      this.temporary.type = "symbol";
      this.temporary.val = "";
    },
    addShortcut: function() {
      this.shortcuts.push({
        description: this.temporary.description,
        category: this.temporary.category,
        windows: this.temporary.windows,
        mac: this.temporary.mac
      });

      this.temporary.description = "";
      this.temporary.category = "";
      this.temporary.windows = [];
      this.temporary.mac = [];
      this.temporary.type = "symbol";
      this.temporary.val = "";
    }
  },
  filters: {
    pretty: function(value) {
      return JSON.stringify(JSON.parse(value), null, 2);
    }
  }
};
</script>
