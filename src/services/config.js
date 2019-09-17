import axios from 'axios'

export const http = axios.create({
    baseURL:   '', //Colocar endereço da api aqui
})