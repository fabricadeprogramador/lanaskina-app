const axios = require('axios')

const API_HOST = 'http://localhost:3000/empresas'
//const API_HOST = 'https://t29-lanaskina-api.herokuapp.com/empresas'

export default {
  async buscarTodos() {
    return axios.get(API_HOST).then((resposta) => resposta)
  },

  async buscarPorId(id) {
    return axios.get(`${API_HOST}/${id}`).then((resposta) => resposta)
  }

  //   async adicionar(convidado) {
  //     return axios.post(API_HOST, convidado).then((resposta) => resposta)
  //   },

  //   async deletar(id) {
  //     return axios.delete(`${API_HOST}/${id}`).then((resposta) => resposta)
  //   },

  //   async editar(convidado) {
  //     return axios.put(API_HOST, convidado).then((resposta) => resposta)
  //   }
}
