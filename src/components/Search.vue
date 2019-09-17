<template>
  <div id="search" class="ui right aligned category search">
    <div class="results" />
    <div class="ui search container">
      <div class="ui fluid action left icon input">
        <i class="search icon" />
        <input v-model="query" type="text" class="prompt" @keypress.enter="handleSearch">
        <button class="ui teal button" @click="handleSearch">
          Buscar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
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