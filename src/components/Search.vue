<template>
  <form id="search" name="search" class="ui right aligned category search" @submit.prevent="handleSearch">
    <div class="ui search container">
      <div class="ui fluid action left icon input">
        <i class="search icon" alt="icone de lupa (buscar)" />
        <input v-model="query" type="text" class="prompt">
        <button type="submit" class="ui teal button">
          Buscar
        </button>
      </div>
    </div>
  </form>
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

#search .input:hover {
  background: inherit;
}
</style>
