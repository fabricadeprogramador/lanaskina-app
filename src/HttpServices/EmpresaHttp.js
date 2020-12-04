import Axios from '@/services/AxiosInstance';

// const API_HOST = 'http://localhost:3000/empresas';
const API_HOST = 'https://t29-lanaskina-api.herokuapp.com/empresas';

export default {
  async buscarTodos() {
    return Axios.get(API_HOST).then((resposta) => resposta);
  },

  async buscarPorId(id) {
    return Axios.get(`${API_HOST}/${id}`).then((resposta) => resposta);
  },

  async criaTransacoes(idEmpresa, transacao) {
    return Axios.post(`${API_HOST}/transacoes/${idEmpresa}`, transacao).then(
      (resposta) => resposta
    );
  }
};
