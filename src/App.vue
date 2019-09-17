<template>
  <div class="page-app bg-gif">
    <sui-grid :columns="2">
      <sui-grid-row>
        <sui-grid-column :width="4">
          <my-giphys :array-gifs="arrayGifs" @load="loadGifs" @open="abrirModelGifsSalvos()" />
        </sui-grid-column>
        <sui-grid-column :width="12">
          <search class="buscador" @SearchRequested="handleSearch" />
          <preview :gifs="gifs" @load="loadGifs" />
        </sui-grid-column>
      </sui-grid-row>
    </sui-grid>

    <!-- Modal para abrir Gifs Salvos -->
    <sui-modal v-model="modalGifsSalvos" close-icon>
      <sui-modal-header>
        <sui-grid divided="vertically">
          <sui-grid-row :columns="2">
            <sui-grid-column>Editar Giphys</sui-grid-column>
            <sui-grid-column class="feedback">
              {{ feedback }}
            </sui-grid-column>
          </sui-grid-row>
        </sui-grid>
      </sui-modal-header>
      <sui-modal-content scrolling image>
        <div class="widthCardsGroup">
          <sui-card-group :items-per-row="3">
            <sui-card v-for="gif in arrayGifs" :key="gif.id">
              <template v-if="gif">
                <sui-card-content>
                  <sui-image :src="gif.avatar" avatar class="float left" />
                  <sui-input v-model="gif.name" />
                </sui-card-content>
                <a class="ui image" :href="gif.link" target="_blank" rel="noopener">
                  <sui-image :src="gif.image" />
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
                      <sui-button positive @click="atualizarGif(gif)">
                        Atualizar
                      </sui-button>
                      <sui-button negative @click="deletarGif(gif)">
                        Apagar
                      </sui-button>
                    </sui-button-group>
                  </sui-container>
                </sui-card-content>
              </template>
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
import Giphy from "./services/giphy"

export default {
  name: "App",
  components: { Search, Preview, MyGiphys },
  data() {
    return {
      feedback: "",
      modalGifsSalvos: false,
      arrayGifs: [],
      gifs: []
    };
  },
  mounted() {
    this.loadGifs();
  },
  methods: {
    actionModalGifsSalvos() {
      this.modalGifsSalvos = !this.modalGifsSalvos;
      this.feedback = "";
    },
    abrirModelGifsSalvos() {
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
          this.feedback = "Giphy Deletado";
          this.loadGifs();
        })
        .catch(e => {
          console.log(e);
        });
    },
    atualizarGif(gif) {
      Gif.atualizar(gif)
        .then(resposta => {
          this.feedback = "Giphy Atualizado";
          this.loadGifs();
        })
        .catch(e => {
          console.log(e);
        });
    },
    handleSearch(query) {
      this.gifs = [];
      Giphy.listar(query).then(res => {
        this.gifs = res.data.data;
      });
    }
  }
};
</script>

<style>
.page-app {
  height: 100%;
  padding: 40px;
}

.bg-gif {
  background-image: url("https://media.giphy.com/media/yI3rO1XBSf0He/giphy.gif");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: black;
}

.page-app .buscador {
  padding: 30px;
}

.page-app .widthCardsGroup {
  max-width: 850px;
}

.page-app .feedback {
  color: steelblue;
  font-size: 0.75em;
}
</style>
