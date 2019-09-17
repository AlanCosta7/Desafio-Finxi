import axios from 'axios'

export const http = axios.create({
  baseURL:   'http://localhost:9090', // Colocar endereço real da api aqui
})
