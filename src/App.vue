<template>
  <v-app id="inspire">
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
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      itensMenu: []
    }
  },

  mounted() {
    this.itensMenu = [
      {
        icone: 'mdi-home-outline',
        titulo: 'Home',
        path: '/home'
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
        icone: 'mdi-logout',
        titulo: 'Sair',
        path: '/logout'
      },
      {
        icone: 'mdi-account-edit-outline',
        titulo: 'Cadastro',
        path: '/cadastro'
      }
    ]
  }
}
</script>
