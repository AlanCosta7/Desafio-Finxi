<template lang="html">
  <div class="ui right aligned category search" id="bg-search">
      <div class="results"></div>
      <div class="ui search container">
        <div class="ui fluid action left icon input">
          <i class="search icon"></i>
          <input type="text" class="prompt" v-model="query" @keypress.enter="handleSearch" />
          <button id="button" class="ui teal button" @click="handleSearch">Buscar</button>
        </div>
      </div>
  </div>
</template>

<script>

    export default {
        data() {
            return {
                query: ''
            }
        },
        methods: {
            handleSearch() {
                this.$emit('SearchRequested', this.query);
            }
        }
    }
</script>

<style>
    #button {
        border-bottom-right-radius: 50px 50px;
        border-top-right-radius: 50px 50px;
    }

    #bg-search {
        background-color: black
    }

</style>