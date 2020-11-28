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
    path: '/historico/:cliente_id',
    name: 'Historico',
    component: () => import('../views/Historico.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
