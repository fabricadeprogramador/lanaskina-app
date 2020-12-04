export default class AutenticacaoService {
  static getUsuarioLogado() {
    const usuarioStr = localStorage.getItem('usuario_logado');
    if (usuarioStr) return JSON.parse(usuarioStr);
    return undefined;
  }

  static setUsuarioLogado(usuario) {
    localStorage.setItem('usuario_logado', JSON.stringify(usuario));
  }

  static removerUsuarioLogado() {
    localStorage.removeItem('usuario_logado');
  }
}
