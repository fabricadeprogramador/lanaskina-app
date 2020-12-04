<template>
  <div>
    <v-navigation-drawer
      dark
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, index) in itensMenu"
          :key="index"
          link
          :to="item.path"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icone }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.titulo }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Lanaskina App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import AutenticacaoService from '@/services/AutenticacaoService';

export default {
  data() {
    return {
      drawer: null,
      itensMenu: []
    };
  },

  mounted() {
    this.itensMenu = [
      {
        icone: 'mdi-home-outline',
        titulo: 'Home',
        path: '/'
      },
      {
        icone: 'mdi-account-edit-outline',
        titulo: 'Perfil',
        path: '/perfil'
      },
      {
        icone: 'mdi-cart-outline',
        titulo: 'Carrinho',
        path: '/carrinho'
      },
      {
        icone: 'mdi-history',
        titulo: 'Histórico',
        path: '/historico'
      },

      {
        icone: 'mdi-account-edit-outline',
        titulo: 'Cadastro',
        path: '/cadastro'
      }
    ];
  },

  methods: {
    logout() {
      AutenticacaoService.removerUsuarioLogado();
      this.$router.push('/login');
    }
  }
};
</script>

<style></style>
