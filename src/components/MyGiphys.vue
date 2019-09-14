<template>
  <div id="myGiphys">
    <div>
      <div class="ui stackable container column grid">
        <sui-segment inverted class="column scrollbar">
          <sui-button positive @click.native="abrirGifsSalvos()" content="Meus Giphys" fluid />
          <sui-list v-for="gif in arrayGifs" :key="gif.id" divided inverted relaxed>
            <sui-list-item>
              <sui-image avatar :src="gif.image" />
              <sui-list-content vertical-align="middle">
                <p is="sui-list-header">{{gif.name.substring(0, 20)}}</p>
                <sui-list-description>
                  <b>{{gif.title.substring(0, 20)}}</b>
                </sui-list-description>
              </sui-list-content>
            </sui-list-item>
            <sui-divider />
          </sui-list>
        </sui-segment>
      </div>
    </div>
  </div>
</template>

<script>
import Gif from "../services/gifs";

export default {
  name: "my-giphy",
  data() {
    return {
      open: false,
      editedIndex: -1,
      editedItem: "",
      gifs: [],
      errors: []
    };
  },
  props: ["arrayGifs"],
  methods: {
    abrirGifsSalvos() {
      this.$emit("open");
    }
  }
};
</script>

<style>
#myGiphys {
  margin-top: 112px;
}

#myGiphys .scrollbar {
  overflow: auto;
  height: 550px;
}
</style>