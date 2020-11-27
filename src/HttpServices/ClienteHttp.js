const axios = require('axios')

const API_HOST = 'http://localhost:3000/clientes'

export default {
  async buscarTodos() {
    return axios.get(API_HOST).then((resposta) => resposta)
  },

  async adicionarAoCarrinho(clienteId, produto) {
    return await axios.post(
      `${API_HOST}/adicionar-ao-carrinho/${clienteId}`,
      produto
    )
  },

  async adicionar(cliente)    {
    return axios.post(API_HOST, cliente).then((resposta)=> resposta)
},

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
