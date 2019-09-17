<template>
  <div id="preview">
    <transition name="fade">
      <sui-message
        v-if="visible"
        success
        :header="header"
        :content="content"
        dismissable
        @dismiss="handleDismiss"
      />
    </transition>
    <div class="ui stackable five column grid scrollbar">
      <div v-for="gif in gifs" :key="gif.id" class="column">
        <sui-card v-if="gif" @click="showModal(gif)">
          <sui-image class="img" :src="gif.images.fixed_height.url" alt="imagem gif" />
        </sui-card>
      </div>
    </div>

    <!-- Modal detalhes Giphy -->
    <sui-modal v-model="modalDetalhesGifs" close-icon>
      <sui-modal-header>
        <div class="ui column grid">
          <div v-if="editedItem.user" class="row">
            <sui-image
              v-if="editedItem.user"
              :src="editedItem.user.avatar_url"
              avatar
              alt="imagem avatar"
            />
            <a class="displayName" :href="editedItem.user.profile_url" target="_blank">
              <p>{{ editedItem.user.display_name }}</p>
            </a>
          </div>
        </div>
      </sui-modal-header>
      <sui-modal-content image>
        <sui-image
          v-if="editedItem"
          wrapped
          size="medium"
          :src="editedItem.images?editedItem.images.fixed_height.url:profile"
          alt="imagem gif selecionada"
        />
        <sui-modal-description>
          <sui-header>
            Título:
            <a :href="editedItem.bitly_url" target="_blank">{{ editedItem.title }}</a>
          </sui-header>
          <br>
          <sui-grid divided="vertically">
            <sui-grid-row v-if="editedItem.images" :columns="2">
              <sui-grid-column>
                <p>Frames: {{ editedItem.images.original.frames }}</p>
                <p>Dimensão: {{ editedItem.images.original.width }}x{{ editedItem.images.original.height }}px</p>
                <p>Tamanho: {{ (editedItem.images.original.size/1000000).toFixed(2) }} MB</p>
              </sui-grid-column>
              <sui-grid-column>
                <p>Upload: {{ uploadItem }}</p>
                <p>Rating: {{ editedItem.rating }}</p>
              </sui-grid-column>
            </sui-grid-row>
          </sui-grid>
        </sui-modal-description>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button positive icon="check" @click.native="salvarGif(editedItem)">
          SALVAR
        </sui-button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script>
import dayjs from "dayjs";
import Gif from "../services/gifs";
import Giphy from "../services/giphy";

export default {
  name: "Preview",
  props: {
    gifs: {
      type: Array,
      default:  function () { return [] }
    }
  },
  data() {
    return {
      profile_null: "https://img.ibxk.com.br/2017/06/22/22100428046161.jpg",
      visible: false,
      header: "",
      content: "",
      color: "",
      modalDetalhesGifs: false,
      editedItem: "",
      uploadItem: ""
    };
  },
  methods: {
    showModal(item) {
      this.selectGif(item);
      this.actionModalDetalhesGifs();
    },
    selectGif(item) {
      var id = item.id;
      Giphy.getId(id).then(res => {
        this.editedItem = res.data.data;
        this.uploadItem = dayjs(this.editedItem.import_datetime).format(
          "DD/MM/YYYY"
        );
      });
    },
    actionModalDetalhesGifs() {
      this.modalDetalhesGifs = !this.modalDetalhesGifs;
    },
    salvarGif(editedItem) {
      const gif = {
        title: editedItem.title ? editedItem.title : "Sem título",
        name: editedItem.user ? editedItem.user.display_name : "Sem nome",
        avatar: editedItem.user
          ? editedItem.user.avatar_url
          : this.profile_null,
        image: editedItem.images.fixed_height.url
          ? editedItem.images.fixed_height.url
          : this.profile_null,
        profile: editedItem.user
          ? editedItem.user.profile_url
          : this.profile_null,
        link: editedItem.bitly_url ? editedItem.bitly_url : "Sem link"
      };

      this.actionModalDetalhesGifs();
      Gif.salvar(gif)
        .then(resposta => {
          this.header = "Parabéns!";
          this.content = "Giphy salvo com sucesso";
          this.handleDismiss();
          this.$emit("load");
          this.visible = true;
        })
        .catch(e => {
          this.header = "Ho-ho!!!";
          this.content = "Não foi possível salvar Giphy";
          console.log(e);
        });
    },
    handleDismiss() {
      this.visible = false;
    }
  }
};
</script>

<style>
#preview {
  height: 560px;
}
#preview .img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

#preview .displayName {
  display: flex;
  align-items: center;
  justify-content: center;
}

#preview .scrollbar {
  overflow: auto;
  overflow-y: scroll;
  height: 550px;
}
</style>