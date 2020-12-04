const Axios = require('axios');

const API_HOST = 'https://t29-lanaskina-api.herokuapp.com/autenticar';
// const API_HOST = 'http://localhost:3000/autenticar';

export default {
  async login(usuario) {
    return Axios.post(API_HOST, usuario).then((resposta) => resposta);
  }
};
