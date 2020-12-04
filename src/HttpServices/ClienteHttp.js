import Axios from '@/services/AxiosInstance';

const API_HOST = 'http://localhost:3000/clientes';

export default {
  async buscarTodos() {
    return Axios.get(API_HOST).then((resposta) => resposta);
  },
  async buscarHistorico(clienteId) {
    return Axios.get(`${API_HOST}/historico/${clienteId}`).then(
      (resposta) => resposta
    );
  },

  async adicionarAoCarrinho(clienteId, produto) {
    return await Axios.post(
      `${API_HOST}/adicionar-ao-carrinho/${clienteId}`,
      produto
    );
  },
  async buscarCarrinho(idCliente) {
    return Axios.get(`${API_HOST}-carrinho/${idCliente}`).then(
      (resposta) => resposta
    );
  },
  async excluirProdutoCarrinho(idCliente, produto) {
    return Axios.put(`${API_HOST}-carrinho/${idCliente}`, produto).then(
      (resposta) => resposta
    );
  },
  async adicionar(cliente) {
    return Axios.post(API_HOST, cliente).then((resposta) => resposta);
  }
};
