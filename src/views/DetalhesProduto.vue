<template>
  <v-container>
    <Navegacao></Navegacao>
    <v-card class="pa-3">
      <!-- //Inicio mensagem de sucesso -->
      <v-dialog v-model="dialogMsg" max-width="400">
        <v-expand-transition>
          <v-alert type="success" class="text-center">
            <strong> {{ msg }}</strong>
          </v-alert>
        </v-expand-transition>
      </v-dialog>
      <!-- Final de mensagem de sucesso -->

      <!-- Inicio alerta que não pode comprar em outra empresa com produtos no carrino -->
      <v-expand-transition>
        <v-row justify="center">
          <v-alert
            v-model="empresaEdiferente"
            class="text-center"
            :value="empresaEdiferente"
            type="warning"
            max-width="450"
          >
            <v-row
              ><strong>{{ msg }}</strong></v-row
            >
            <small
              >É possivel adicionar produtos ao carrinho da mesma loja!</small
            >
            <div class="mt-5 text-center">
              <v-row justify="center">
                <v-alert color="black">Deseja Ir para o carrinho?</v-alert>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn @click="irParaCarrinho" color="success">Sim</v-btn>
                </v-col>
                <v-col>
                  <v-btn @click="empresaEdiferente = false" color="info"
                    >Nao</v-btn
                  >
                </v-col>
              </v-row>
            </div>
          </v-alert>
        </v-row>
      </v-expand-transition>
      <!-- Final alerta que não pode comprar em outra empresa com produtos no carrino -->

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
        <v-col cols="12" class="ml-3 px-0 pl-3">
          <h3>Valor: R$ {{ produto.valor.toFixed(2) }}</h3>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="mt-3">
      <v-row>
        <v-col cols="4" class="my-auto ml-3 pr-0">
          <h3>Quantidade:</h3>
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="qtd"></v-text-field>
        </v-col>
      </v-row>
    </v-card>

    <v-row>
      <v-col cols="12" class="text-center">
        <v-btn
          rounded
          depressed
          color="primary"
          @click="adicionarCarrinho(produto)"
        >
          Adicionar
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EmpresaHttp from '@/HttpServices/EmpresaHttp';
import ClienteHttp from '@/HttpServices/ClienteHttp';
import Navegacao from '@/components/Navegacao';

export default {
  name: 'Detalhes-Empresa',
  components: { Navegacao },
  data() {
    return {
      produto: {
        valor: 0
      },
      qtd: 0,
      empresa: '',
      cliente: '5f98be432e9ed602a0dfdb4c',
      dialogMsg: false,
      msg: '',
      iconeFechaAlertEmpresaDiferente: true,
      empresaEdiferente: false
    };
  },
  created() {
    this.getProdutoNaEmpresa();
  },
  methods: {
    async getProdutoNaEmpresa() {
      this.empresa = this.$route.params.empresa_id;

      let resposta = await EmpresaHttp.buscarPorId(this.empresa);
      if (resposta && resposta.status == 200) {
        resposta.data.produtos.forEach((produto) => {
          if (produto._id == this.$route.params.produto_id)
            this.produto = produto;
        });
      }
    },

    async adicionarCarrinho(produto) {
      if (this.qtd > 0) {
        let produtoEnvio = {};
        produtoEnvio.empresa = this.empresa;
        produtoEnvio.produto = produto._id;
        produtoEnvio.quantidade = Number(this.qtd);

        //console.log('PRODUTO ENVIO: ' + JSON.stringify(produtoEnvio))

        let resposta = await ClienteHttp.adicionarAoCarrinho(
          this.cliente,
          produtoEnvio
        );
        console.log(resposta);
        if (resposta && resposta.status == 200) {
          this.dialogMsg = true;
          this.msg = 'Produto adicionado ao carrinho';

          setTimeout(() => {
            (this.dialogMsg = false), (this.msg = '');

            this.$router.push({
              path: `/carrinho/${this.cliente}`
            });
          }, 1500);
        } else if (resposta.status == 202) {
          this.empresaEdiferente = true;
          this.msg =
            'Não é possivel fazer compras em outra loja antes de finalizar o carrinho!';

          // setTimeout(() => {
          //   this.empresaEdiferente = false;
          //   this.msg = "";
          //   this.typeMsg = "success";
          // }, 3500);
        }
      } else {
        alert('Informe a quantidade!');
      }
    },
    irParaCarrinho() {
      this.$router.push({
        path: `/carrinho`
      });
    }
  }
};
</script>
