<template>
  <v-container>
    <v-card class="mb-3">
      <v-data-table :headers="cabecalhoCarrinho" :items="carrinho">
        <template v-slot:item.imagem="{ item }">
          <v-card max-width="105" class="text-center">
            <v-img
              max-height="90"
              max-width="100"
              :lazy-src="item.imagem"
              :src="getImagePath(item.imagem)"
            ></v-img>
          </v-card>
        </template>
        <template v-slot:item.valor="{ item }">
          R$ {{ item.valor.toFixed(2) }}
        </template>
        <template v-slot:item.acao="{ item }">
          <v-icon @click="excluiDoCarrinho(item)">
            mdi mdi-minus-circle-outline
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <v-card elevation="0" class="text-center pa-2">
      <v-chip color="blue" large>
        <strong>Valor Total: </strong
        ><v-chip dark class="ml-3"> R${{ total.toFixed(2) }}</v-chip>
      </v-chip>
    </v-card>

    <v-row>
      <v-col cols="12" class="text-center">
        <v-btn  rounded  color="success" @click="finalizarCompra">
          Finalizar
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ClienteHttp from "@/HttpServices/ClienteHttp";

export default {
  name: "Carrinho",
  data() {
    return {
      produto: {},
      cabecalhoCarrinho: [
        { text: "", value: "imagem" },
        { text: "Nome", value: "nome" },
        { text: "Valor Unitário", value: "valor" },
        { text: "Quantidade", value: "quantidade" },
        { text: "Ação", value: "acao" }
      ],
      carrinho: [],
      total: 0,
      cliente: "5f98be432e9ed602a0dfdb4c",
      noImagePath:
        "https://www.cetegeducacao.com.br/wp-content/themes/cetegeducacao/assets/dist/img/no-image.png"
    };
  },
  created() {
    this.getCarrinho();
  },
  methods: {
    async getCarrinho() {
      console.log("chamou");
      let resposta = await ClienteHttp.buscarCarrinho(this.cliente);
      if (resposta.status == 200) {
        this.carrinho = resposta.data;
        this.calculaTotal();
      }
    },
    calculaTotal() {
      let total = 0;
      this.carrinho.forEach(produto => {
        total += produto.valor;
      });
      this.total = total;
    },
    async excluiDoCarrinho(item) {
      if (confirm("Deseja realmente excluir" + item.nome + " ?")) {
        //transferindo dados para nao carregar na pagina antes do retorno do back-end
        let carrinhoAtualizado = JSON.parse(JSON.stringify(this.carrinho));
        carrinhoAtualizado.forEach((produto, index) => {
          if (produto._id == item._id) {
            carrinhoAtualizado.splice(index, 1);
          }
        });

        let resposta = await ClienteHttp.excluirProdutoCarrinho(
          this.cliente,
          carrinhoAtualizado
        );
        if (resposta.status == 200) {
          console.log("entrou aqui", resposta.data);
          this.carrinho = resposta.data;
          this.calculaTotal();
        }
      }
    },
    finalizarCompra(){
    
        this.$router.push({
            path: `/finalizar-compra`})

    },
    getImagePath(image) {
      return image ? image : this.noImagePath;
    }
  }
};
</script>
