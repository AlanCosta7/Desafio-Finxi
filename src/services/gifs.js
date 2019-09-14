import { http } from './config'

export default {

    listar:() => {
        return http.get('gifs')
    },

    salvar:(gif) => {
        return http.post('gif', gif)
    },

    deletar:(gif) => {
        return http.delete('gif', { data: gif })
    },

    atualizar:(gif) => {
        return http.put('gif', gif)
    }
}