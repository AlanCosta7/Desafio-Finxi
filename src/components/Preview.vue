<template>
    <div id="preview" >
        <transition name="fade">
            <sui-message
                v-if="visible"
                header="Parabéns!"
                content="Ataque realizado com sucesso"
                dismissable
                @dismiss="handleDismiss"
            />
        </transition>
      <div class="ui stackable five column grid">
        <div class="column" v-for="gif in gifs" :key="gif.id">
            <sui-card @click="showModal(gif)">
                <sui-image class="img" :src="gif.images.fixed_height.url" alt="imagem gif" />
            </sui-card>
        </div>
      </div>
        <sui-modal v-model="open">
            <sui-modal-header>
                <div class="ui column grid">
                    <div class="row" v-if="editedItem.user">
                        <sui-image v-if="editedItem.user" :src="editedItem.user.avatar_url" avatar />
                        <a class="displayName" :href="editedItem.user.profile_url"><p >{{editedItem.user.display_name}}</p></a>
                    </div>
                </div>
            </sui-modal-header>
            <sui-modal-content image>
                <sui-image wrapped size="medium" v-if="editedItem" :src="editedItem.images.fixed_height.url"  />
                <sui-modal-description>
                <sui-header>Título: <a :href="editedItem.bitly_url">{{editedItem.title}}</a></sui-header>
                <br>
                <sui-grid divided="vertically">   
                    <sui-grid-row :columns="2" v-if="editedItem.images">
                        <sui-grid-column>
                        <p>Frames: {{editedItem.images.original.frames}}</p>
                        <p>Dimensão: {{editedItem.images.original.width}}x{{editedItem.images.original.height}}px</p>
                        <p>Tamanho: {{(editedItem.images.original.size/1000000).toFixed(2)}} MB</p>
                        </sui-grid-column>
                        <sui-grid-column>
                        <p>Upload: {{uploadItem}}</p>
                        <p>Rating: {{editedItem.rating}}</p>
                        </sui-grid-column>
                        </sui-grid-row>
                    </sui-grid>
                </sui-modal-description>
            </sui-modal-content>
            <sui-modal-actions>
                <sui-button @click.native="openModal()" icon="close">
                CANCELAR
                </sui-button>
                <sui-button positive @click.native="atacarLord(editedItem)" icon="check">
                SALVAR
                </sui-button>
            </sui-modal-actions>
        </sui-modal>
    </div>
</template>

<script>
import dayjs from 'dayjs'
import Gif from '../services/gifs'

export default {  
        data() {
            return { 
                visible: false,
                open: false,
                editedIndex: -1,
                editedItem: '',
                uploadItem: ''
            };
        },
        props: [ 'gifs' ],
        mounted() {
        },
        methods: {
            showModal(item) {
                this.selectGif(item)
                this.openModal()
            },
            selectGif(item) {
                this.editedIndex = this.gifs.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.uploadItem = dayjs(this.editedItem.import_datetime).format('DD/MM/YYYY')
            },
            openModal() {
                this.open = !this.open
            },
            atacarLord(editedItem) {
                console.log(editedItem)
                const gif = {
                    title: editedItem.title ? editedItem.title : 'Sem título',
                    name: editedItem.user ? editedItem.user.display_name : 'Sem nome',
                    avatar: editedItem.user ? editedItem.user.avatar_url : 'Sem avatar',
                    image: editedItem.images.fixed_height.url ? editedItem.images.fixed_height.url : 'Sem imagem',
                    profile: editedItem.user ? editedItem.user.profile_url : 'Sem foto de perfil',
                    link: editedItem.bitly_url ? editedItem.bitly_url : 'Sem link'
                }
                
                this.openModal()
                Gif.salvar(gif).then(resposta => {
                    this.handleDismiss()
                    this.$emit('load')
                    this.visible = true
                    setTimeout(() => {
                        this.visible = false
                    }, 2000);
                })
            },
            handleDismiss() {
                this.visible = false
            }
        },
    }
</script>

<style>
    .img {
        width: 100%;
        height: 200px;
        object-fit: cover
    }

    .displayName {
        display: flex;
        align-items: center;
        justify-content: center    
    }
    
  #preview {
    overflow:auto; 
    overflow-y: scroll;
    height: 560px;
  }

</style>