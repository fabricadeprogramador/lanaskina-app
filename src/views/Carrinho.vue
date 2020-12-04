<template>
  <v-container>
    <Navegacao></Navegacao>
    <v-card class="mb-3">
      <!-- //Inicio mensagem de sucesso -->
      <v-dialog v-model="dialogMsg" max-width="400">
        <v-expand-transition>
          <v-alert type="info" class="text-center">
            <strong> {{ msg }}</strong>
          </v-alert>
        </v-expand-transition>
      </v-dialog>
      <!-- Final de mensagem de sucesso -->

      <v-dialog v-model="confirmExclusao" max-width="400" persistent>
        <v-card>
          <h3 class="text-center pa-5">Deseja Realmente excluir produto ?</h3>
          <v-row no-gutters class="pa-3 text-center">
            <v-col>
              <v-btn color="success" @click="excluiDoCarrinho()">SIM</v-btn>
            </v-col>
            <v-col>
              <v-btn color="info" @click="fechaTelaConfirmarExclusao()"
                >NÂO</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>

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
          <v-icon
            @click="abreTelaConfirmarExclusao(item)"
            title="Exclui Produto"
          >
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
        <v-btn
          v-if="carrinho.length > 0"
          rounded
          color="success"
          @click="finalizarCompra"
        >
          Finalizar
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ClienteHttp from '@/HttpServices/ClienteHttp';
import Navegacao from '@/components/Navegacao';

export default {
  name: 'Carrinho',
  components: {
    Navegacao
  },
  data() {
    return {
      produto: {},
      cabecalhoCarrinho: [
        { text: '', value: 'imagem' },
        { text: 'Nome', value: 'nome' },
        { text: 'Valor Unitário', value: 'valor' },
        { text: 'Quantidade', value: 'quantidade' },
        { text: 'Ação', value: 'acao' }
      ],
      carrinho: [],
      itemExcluir: {},
      total: 0,
      cliente: '5f98be432e9ed602a0dfdb4c',
      noImagePath:
        'https://www.cetegeducacao.com.br/wp-content/themes/cetegeducacao/assets/dist/img/no-image.png',
      msg: '',
      dialogMsg: false,
      confirmExclusao: false,
      RespostaconfirmExclusao: null
    };
  },
  created() {
    this.getCarrinho();
  },
  methods: {
    async getCarrinho() {
      let resposta = await ClienteHttp.buscarCarrinho(this.cliente);

      if (resposta.status == 200) {
        this.carrinho = resposta.data;
        this.calculaTotal();
      }
    },
    calculaTotal() {
      let total = 0;
      this.carrinho.forEach((produto) => {
        total += produto.valor * produto.quantidade;
      });
      this.total = total;
    },
    async abreTelaConfirmarExclusao(item) {
      this.confirmExclusao = true;
      this.itemExcluir = JSON.parse(JSON.stringify(item));
    },
    async fechaTelaConfirmarExclusao() {
      this.confirmExclusao = false;
      this.itemExcluir = {};
    },
    async excluiDoCarrinho() {
      this.confirmExclusao = false;
      //transferindo dados para nao carregar na pagina antes do retorno do back-end
      let carrinhoAtualizado = JSON.parse(JSON.stringify(this.carrinho));
      carrinhoAtualizado.forEach((produto, index) => {
        if (produto._id == this.itemExcluir._id) {
          carrinhoAtualizado.splice(index, 1);
        }
      });

      let resposta = await ClienteHttp.excluirProdutoCarrinho(
        this.cliente,
        carrinhoAtualizado
      );
      if (resposta.status == 200) {
        this.dialogMsg = true;
        this.msg = 'Produto excluido do carrinho';
        this.carrinho = resposta.data;
        this.calculaTotal();

        setTimeout(() => {
          (this.dialogMsg = false), (this.msg = '');
        }, 1500);
      }
    },
    finalizarCompra() {
      // console.log(this.carrinho, this.cliente)

      this.$router.push({
        path: `/finalizar-compra/${this.cliente}`
      });
    },
    getImagePath(image) {
      return image ? image : this.noImagePath;
    }
  }
};
</script>
