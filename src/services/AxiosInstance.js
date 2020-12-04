import AutenticacaoService from '@/services/AutenticacaoService';
import Axios from 'axios';

const usuarioLogado = AutenticacaoService.getUsuarioLogado();

const axios = Axios.create({
  baseURL: `${process.env.API_BASE_HOST}`,
  headers: {
    'x-access-token': usuarioLogado.token,
    'type-user-application': 0
  }
});

export default axios;
