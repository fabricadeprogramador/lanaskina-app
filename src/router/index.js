import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import AutenticacaoService from '@/services/AutenticacaoService';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/detalhes-empresa/:empresa_id',
    name: 'Detalhes Empresa',
    component: () => import('../views/DetalhesEmpresa.vue')
  },
  {
    path: '/detalhes-produto/:empresa_id/:produto_id',
    name: 'Detalhes Produto',
    component: () => import('../views/DetalhesProduto.vue')
  },
  {
    path: '/carrinho',
    name: 'Carrinho',
    component: () => import('../views/Carrinho.vue')
  },
  {
    path: '/finalizar-compra/:cliente_id',
    name: 'Finalizar',
    component: () => import('../views/FinalizarCompra.vue')
  },
  {
    path: '/historico',
    name: 'Historico',
    component: () => import('../views/Historico.vue')
  },
  {
    path: '/cadastro',
    name: 'Cadastro',

    component: () => import('../views/Cadastro.vue')
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  const usuarioLogado = AutenticacaoService.getUsuarioLogado();

  if (to.name !== 'Login' && !usuarioLogado) next({ name: 'Login' });
  else next();
});

export default router;
