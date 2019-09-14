<template>
  <div class="ui right aligned category search" id="search">
    <div class="results"></div>
    <div class="ui search container">
      <div class="ui fluid action left icon input">
        <i class="search icon"></i>
        <input type="text" class="prompt" v-model="query" @keypress.enter="handleSearch" />
        <button class="ui teal button" @click="handleSearch">Buscar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      query: ""
    };
  },
  methods: {
    handleSearch() {
      this.$emit("SearchRequested", this.query);
    }
  }
};
</script>

<style>
#search .button {
  border-bottom-right-radius: 50px 50px;
  border-top-right-radius: 50px 50px;
}
</style>