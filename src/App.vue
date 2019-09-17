<template>
  <div id="app">
    <sui-grid :columns="2">
      <sui-grid-row>
        <sui-grid-column :width="4">
          <my-giphys :array-gifs="arrayGifs" @load="loadGifs" @open="abrirModelGifsSalvos()" />
        </sui-grid-column>
        <sui-grid-column :width="12">
          <div class="buscador">
            <search @SearchRequested="handleSearch" />
          </div>
          <div>
            <preview :gifs="gifs" @load="loadGifs" />
          </div>
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
            <sui-card v-for="gif in arrayGifs" :key="gif.id" class="marginCardGifs">
              <div v-if="gif">
                <sui-card-content class="padding10">
                  <sui-image :src="gif.avatar" avatar />
                  <sui-input v-model="gif.name" />
                </sui-card-content>
                <a :href="gif.link" target="_blank">
                  <sui-image class="imagemGif" :src="gif.image" />
                </a>
                <sui-card-content class="padding10">
                  <sui-card-header>
                    Título:
                    <sui-input v-model="gif.title" />
                  </sui-card-header>
                </sui-card-content>
                <sui-card-content extra class="padding10">
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
              </div>
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
#app {
  background-image: url("https://media.giphy.com/media/yI3rO1XBSf0He/giphy.gif");
  background-repeat: no-repeat;
  background-position: center; /* Center the image */
  background-size: cover;
  background-color: black;
  height: 100%;
  padding: 40px;
}

#app .padding10 {
  padding: 10px;
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

#app .feedback {
  color: steelblue;
  font-size: 0.75em;
}
</style>