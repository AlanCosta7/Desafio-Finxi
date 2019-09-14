<template>
  <div id="app">
    <sui-grid :columns="2">
      <sui-grid-row>
        <sui-grid-column :width="4">
          <my-giphys :arrayGifs="arrayGifs" @load="loadGifs" @open="openModelGifsSalvos()"></my-giphys>
        </sui-grid-column>
        <sui-grid-column :width="12">
          <div class="buscador">
            <search v-on:SearchRequested="handleSearch"></search>
          </div>
          <div>
            <preview :gifs="gifs" @load="loadGifs"></preview>
          </div>
        </sui-grid-column>
      </sui-grid-row>
    </sui-grid>

    <!-- Modal para abrir Gifs Salvos -->
    <sui-modal v-model="modalGifsSalvos">
      <sui-modal-header>
        Meus Giphys
        <sui-button basic floated="right" @click="openModalGifsSalvos" circular icon="close" />
      </sui-modal-header>
      <sui-modal-content scrolling image>
        <div class="widthCardsGroup">
          <sui-card-group :items-per-row="3">
            <sui-card v-for="gif in arrayGifs" :key="gif.id" class="marginCardGifs">
              <sui-card-content>
                <sui-image :src="gif.avatar" avatar />
                <a :href="gif.profile" target="_blank">{{gif.name}}</a>
              </sui-card-content>
              <a :href="gif.link" target="_blank">
                <sui-image class="imagemGif" :src="gif.image" />
              </a>
              <sui-card-content>
                <sui-card-header>
                  Título:
                  <sui-input v-model="gif.title" />
                </sui-card-header>
              </sui-card-content>
              <sui-card-content extra>
                <sui-container text-align="center">
                  <sui-button-group>
                    <sui-button @click="atualizarGif(gif)" positive>Atualizar</sui-button>
                    <sui-button @click="deletarGif(gif)" negative>Apagar</sui-button>
                  </sui-button-group>
                </sui-container>
              </sui-card-content>
            </sui-card>
          </sui-card-group>
        </div>
      </sui-modal-content>
    </sui-modal>
  </div>
</template>

<script>
import Search from "./components/Search";
import Preview from "./components/Preview";
import MyGiphys from "./components/MyGiphys";
import Gif from "./services/gifs";

export default {
  name: "app",
  components: { Search, Preview, MyGiphys },
  data() {
    return {
      modalGifsSalvos: false,
      arrayGifs: [],
      gifs: []
    };
  },
  methods: {
    openModalGifsSalvos() {
      this.modalGifsSalvos = !this.modalGifsSalvos;
    },
    openModelGifsSalvos() {
      this.modalGifsSalvos = !this.modalGifsSalvos;
    },
    loadGifs() {
      Gif.listar().then(resposta => {
        this.arrayGifs = resposta.data;
      });
    },
    deletarGif(gif) {
      Gif.deletar(gif)
        .then(resposta => {
          this.loadGifs();
        })
        .catch(e => {
          console.log(e);
        });
    },
    atualizarGif(gif) {
      Gif.atualizar(gif)
        .then(resposta => {
          this.loadGifs();
        })
        .catch(e => {
          console.log(e);
        });
    },
    doQuery(url) {
      fetch(url)
        .then(res => {
          return res.json();
        })
        .then(res => {
          this.gifs = res.data;
        });
    },
    handleSearch(query) {
      this.gifs = [];
      const url = `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=LM9cU9ZVtjMgkhL3nc73jZnStzD55yCJ`;
      this.doQuery(url);
    }
  },
  mounted() {
    this.loadGifs();
  }
};
</script>

<style>
#app {
  background-image: url("https://media.giphy.com/media/yI3rO1XBSf0He/giphy.gif");
  background-repeat: no-repeat;
  background-position: center; /* Center the image */
  background-size: cover;
  height: 100%;
  padding: 40px;
}

#app .buscador {
  padding: 30px;
}

#app .imagemGif {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

#app .marginCardGifs {
  margin-right: 10px;
  margin-bottom: 10px;
}

#app .widthCardsGroup {
  max-width: 850px;
}
</style>