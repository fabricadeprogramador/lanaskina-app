<template>
  <v-container>
    <Navegacao></Navegacao>
    <div class="d-flex flex-column justify-space-between align-center my-3">
      <v-img width="300" :src="empresa.imagem"></v-img>
    </div>

    <div>
      <v-card class="mx-auto">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">
              {{ empresa.nome }}
            </v-list-item-title>
            <v-list-item-subtitle class="ml-3 mt-2">
              Endereço: {{ empresa.endereco.rua }},
              {{ empresa.endereco.numero }} - {{ empresa.endereco.bairro }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="ml-3"
              >Telefone: {{ empresa.tel }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="ml-3"
              >E-mail: {{ empresa.email }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </div>

    <div class="mt-4">
      <v-card
        v-for="produto in empresa.produtos"
        :key="produto._id"
        @click="irParaDetalhesProduto(produto)"
      >
        <v-row class="mb-1">
          <v-col cols="3">
            <v-img :src="produto.imagem"></v-img>
          </v-col>
          <v-col cols="6" class="ma-auto">
            {{ produto.descricao }}
          </v-col>
          <v-col cols="3" class="ma-auto">
            R$ {{ produto.valor.toFixed(2) }}
          </v-col>
        </v-row>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import EmpresaHttp from '@/HttpServices/EmpresaHttp';
import Navegacao from '@/components/Navegacao';

export default {
  name: 'Detalhes-Empresa',
  components: { Navegacao },
  data() {
    return {
      empresa: {
        endereco: {
          rua: '',
          bairro: '',
          numero: ''
        }
      }
    };
  },
  created() {
    this.getEmpresa();
  },
  methods: {
    async getEmpresa() {
      let empresaId = this.$route.params.empresa_id;

      let resposta = await EmpresaHttp.buscarPorId(empresaId);
      if (resposta && resposta.status == 200) {
        this.empresa = resposta.data;
      }
    },

    irParaDetalhesProduto(produto) {
      this.$router.push({
        path: `/detalhes-produto/${this.empresa._id}/${produto._id}`
      });
    }
  }
};
</script>
