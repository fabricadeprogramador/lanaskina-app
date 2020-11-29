const axios = require('axios')

//const API_HOST = 'https://t29-lanaskina-api.herokuapp.com/clientes'
const API_HOST = 'http://localhost:3000/clientes'

export default {
  async buscarTodos() {
    return axios.get(API_HOST).then((resposta) => resposta)
  },
  async buscarHistorico(clienteId) {
    return axios.get(`${API_HOST}/historico/${clienteId}`).then((resposta) => resposta)
  },

  async adicionarAoCarrinho(clienteId, produto) {
    return await axios.post(
      `${API_HOST}/adicionar-ao-carrinho/${clienteId}`,
      produto
    )
  },
  async buscarCarrinho(idCliente) {
    return axios.get(`${API_HOST}-carrinho/${idCliente}`).then((resposta) => resposta)
  },
  async excluirProdutoCarrinho(idCliente, produto){
    return axios.put(`${API_HOST}-carrinho/${idCliente}`,produto).then((resposta) =>resposta)
  }
}
