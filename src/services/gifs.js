import { http } from './config'

export default {

  listar:() => {
    return http.get('/gifs')
  },

  criar:(gif) => {
    return http.post('/gifs', gif)
  },

  atualizar:(gif) => {
    return http.put(`/gifs/${gif.id}`, gif)
  },

  deletar:(gif) => {
    return http.delete(`/gifs/${gif.id}`)
  }
}
