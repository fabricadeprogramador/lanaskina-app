<template>
  <v-container>
    <v-card class="pa-3">
      <div class="d-flex flex-column justify-space-between align-center my-3">
        <v-img width="300" :src="produto.imagem"></v-img>
      </div>

      <div>
        <v-card-title>{{ produto.nome }}</v-card-title>
      </div>

      <div class="ml-2">
        <v-subheader>
          {{ produto.descricao }}
        </v-subheader>
      </div>
    </v-card>

    <v-card class="mt-3">
      <v-row>
        <v-col cols="5" class="ml-3">
          <h3>Valor:</h3>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="4" class="ma-auto mr-3 text-center">
          <h3>R$ {{ produto.valor.toFixed(2) }}</h3>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="mt-3">
      <v-row>
        <v-col cols="4" class="my-auto ml-3">
          <h3>Quantidade:</h3>
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="qtd"></v-text-field>
        </v-col>
      </v-row>
    </v-card>

    <v-row>
      <v-col cols="12" class="text-center">
        <v-btn depressed color="primary" @click="adicionarCarrinho(produto)">
          Adicionar
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EmpresaHttp from "@/HttpServices/EmpresaHttp";

export default {
  name: "Detalhes-Empresa",
  data() {
    return {
      produto: {},
      qtd: 0
    };
  },
  created() {
    this.getProdutoNaEmpresa();
  },
  methods: {
    async getProdutoNaEmpresa() {
      let empresaId = this.$route.params.empresa_id;

      let resposta = await EmpresaHttp.buscarPorId(empresaId);
      if (resposta && resposta.status == 200) {
        resposta.data.produtos.forEach(produto => {
          if (produto._id == this.$route.params.produto_id)
            this.produto = produto;
        });
      }
    },
    adicionarCarrinho(produto) {
      if (this.qtd > 0) {
        this.$router.push({
          path: `/carrinho/${produto._id}`
        });
      }else{
        alert("Informe a quantidade!")
      }
    }
  }
};
</script>
