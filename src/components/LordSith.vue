<template>
    <div id="divLordSith">
      <div>
      <div class="ui stackable container column grid divContent">
        <sui-segment inverted class="column bg-lista">
            <h3>Lista de giphy</h3>
            <sui-list v-for="gif in arrayGifs" :key="gif.id" divided inverted relaxed>
              <sui-list-item class="link" @click.native="selectGif(gif)">
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

        <sui-modal v-model="open">
            <sui-modal-content image>
                <sui-image wrapped size="medium" v-if="editedItem.image" :src="editedItem.image"  />
                <sui-modal-description>                
                <div class="ui column grid">
                    <div class="column">
                        <sui-header>Título: <sui-input v-model="editedItem.title" focus/></sui-header>
                        <sui-header>Autor: <sui-input v-model="editedItem.name" focus /></sui-header>
                    </div>
                </div>
                </sui-modal-description>
            </sui-modal-content>
            <sui-modal-actions>
                <sui-button negative @click.native="deletar(editedItem)" icon="trash alternate">
                Apagar
                </sui-button>
                <sui-button positive @click.native="atualizar(editedItem)" icon="sync alternate"> 
                Atualizar
                </sui-button>
            </sui-modal-actions>
        </sui-modal>
    </div>
</template>

<script>
import Gif from '../services/gifs'

export default {  
    data() {
        return {
            open: false,
            editedIndex: -1,
            editedItem: '', 
            gifs: [],
            errors: []
        }
    },
    computed: {
        listaGifs() {
            this.gifs = this.arrayGifs
            return this.gifs
        },
    },
    props: [ 'arrayGifs' ],
    methods: {
        listarGifs() {
            this.$emit('load')
        },
        selectGif(item) {
            this.open = true
            console.log(item)
            this.editedIndex = this.gifs.indexOf(item)
            this.editedItem = Object.assign({}, item)
        },
        deletar(gif) {
            Gif.deletar(gif).then(resposta => {
                this.listarGifs()
                this.open = false
                this.errors = []
            }).catch(e => {
                this.errors = e.response.data.errors
            })
        },
        atualizar(gif) {
            Gif.atualizar(gif).then(resposta => {
                this.listarGifs()
                this.open = false
            })   
        }
    }
}
</script>

<style>

    .text-nome {
        color: black;
        font-size: 1.5em;
        padding: 5px;
        z-index: 1000;
    }

    .divContent{
       padding: 50px;
       overflow:auto; 
    }

    .bg-lista {
        overflow:auto; 
        height: 550px;
    }

    .link {
        cursor: pointer;
    }

    #divLordSith {
        margin-top: 112px
    }
</style>