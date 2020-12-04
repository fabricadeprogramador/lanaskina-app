<template>
  <div class="home">
    <Navegacao></Navegacao>
    <v-container fluid>
      <v-row dense>
        <v-col v-for="empresa in empresas" :key="empresa._id" cols="12">
          <v-card @click="abrirDetalhesDaEmpresa(empresa)">
            <!-- <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            > -->
            <v-list-item>
              <v-list-item-avatar height="90px" width="90px">
                <v-img
                  class="elevation-6"
                  :src="getImagePath(empresa.imagem)"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-card-title v-text="empresa.nome"></v-card-title>
              </v-list-item-content>
            </v-list-item>
            <!-- </v-img> -->

            <!-- <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions> -->
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import EmpresaHttp from '@/HttpServices/EmpresaHttp';
import Navegacao from '@/components/Navegacao';
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    Navegacao
  },
  data() {
    return {
      noImagePath:
        'https://www.cetegeducacao.com.br/wp-content/themes/cetegeducacao/assets/dist/img/no-image.png',
      empresas: []
    };
  },

  mounted() {
    this.buscarEmpresas();
  },

  computed: {},

  methods: {
    async buscarEmpresas() {
      let resposta = await EmpresaHttp.buscarTodos();
      if (resposta && resposta.status == 200) {
        this.empresas = resposta.data;
      }
    },

    abrirDetalhesDaEmpresa(empresa) {
      this.$router.push({
        path: `/detalhes-empresa/${empresa._id}`
      });
    },

    getImagePath(image) {
      return image ? image : this.noImagePath;
    }
  }
};
</script>
