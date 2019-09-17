<template>
  <div id="myGiphys">
    <div>
      <div class="ui stackable container column grid">
        <sui-segment inverted class="column scrollbar">
          <sui-button positive content="Editar Giphys" fluid @click.native="abrirGifsSalvos()" />
          <sui-list v-for="gif in arrayGifs" :key="gif.id" divided inverted relaxed>
            <sui-list-item v-if="gif" class="cursorPointer" @click.native="detalhesGif(gif)">
              <sui-image avatar :src="gif.image" />
              <sui-list-content vertical-align="middle">
                <p is="sui-list-header">
                  {{ gif.name.substring(0, 20) }}
                </p>
                <sui-list-description>
                  <b>{{ gif.title.substring(0, 20) }}</b>
                </sui-list-description>
              </sui-list-content>
            </sui-list-item>
            <sui-divider />
          </sui-list>
        </sui-segment>
      </div>
    </div>

    <!-- Modal detalhes Gif -->
    <sui-modal v-model="abrirDetalhesGif" size="mini" close-icon>
      <sui-modal-header>
        <sui-card v-if="editedItem" class="marginCardGifs">
          <sui-card-content>
            <sui-image :src="editedItem.avatar" avatar />
            <a :href="editedItem.profile" target="_blank">{{ editedItem.name }}</a>
          </sui-card-content>
          <a :href="editedItem.link" target="_blank">
            <sui-image class="imagemGif" :src="editedItem.image" />
          </a>
          <sui-card-content>
            <sui-card-header>
              Título:
              <h5>{{ editedItem.title }}</h5>
            </sui-card-header>
          </sui-card-content>
        </sui-card>
      </sui-modal-header>
    </sui-modal>
  </div>
</template>

<script>
import Gif from "../services/gifs";

export default {
  name: "MyGiphy",
  props: {
    arrayGifs: {
      type: Array,
      default:  function () { return [] }
    },
  },
  data() {
    return {
      abrirDetalhesGif: false,
      editedIndex: -1,
      editedItem: "",
      gifs: [],
      errors: []
    };
  },
  methods: {
    abrirGifsSalvos() {
      this.$emit("open");
    },
    detalhesGif(item) {
      this.editedIndex = this.gifs.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.abrirDetalhesGif = true;
    }
  }
};
</script>

<style>
#myGiphys {
  margin-top: 100px;
}

#myGiphys .scrollbar {
  overflow: auto;
  height: 550px;
}

#myGiphys .marginCardGifs {
  margin-right: 10px;
  margin-bottom: 10px;
}

#myGiphys .imagemGif {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

#myGiphys .cursorPointer {
  cursor: pointer;
}
</style>