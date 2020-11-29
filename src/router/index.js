import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Cadastro.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
