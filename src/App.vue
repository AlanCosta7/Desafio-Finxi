<template>
  <div id="app">
    <sui-grid :columns="2">
    <sui-grid-row>
      <sui-grid-column :width="3">
        <lord-sith :arrayGifs=arrayGifs @load="listarGifs"></lord-sith>
      </sui-grid-column>
      <sui-grid-column :width="12">
        <div class="buscador">
          <search v-on:SearchRequested="handleSearch"></search>
        </div>
        <div>  
          <preview :gifs=gifs @load="listarGifs"></preview>
        </div>
      </sui-grid-column>
    </sui-grid-row>
    </sui-grid>
  </div>
</template>

<script>
import Search from './components/Search'
import Preview from './components/Preview'
import LordSith from './components/LordSith'
import Gif from './services/gifs'

export default {
  name: 'app',
  components: { Search, Preview, LordSith },
  data() {
    return {
      isLoading: true,
      arrayGifs: [],
      gifs: []
    }
  },
  methods: {
    listarGifs() {
      Gif.listar().then(resposta => {
        this.arrayGifs = resposta.data
      })
    },
    doQuery(url) {
      fetch(url)
      .then((res) => { return res.json() } )
      .then((res) => {
        this.gifs = res.data;
        this.isLoading = false;
      })
    },
    handleSearch(query) {
      this.gifs = [];
      this.isLoading = true;
      const url = `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=LM9cU9ZVtjMgkhL3nc73jZnStzD55yCJ`;
      this.doQuery(url);
    }
  },
  mounted() {
    this.listarGifs()
  }
}

</script>

<style>
    #app {
        background-image: url("./assets/lord_sith.jpg");
        background-repeat: no-repeat;
        background-position: center; /* Center the image */
        background-size: cover;
        height: 100%;
        padding: 40px
    }
    
  .buscador {
    padding: 30px;
  }


</style>