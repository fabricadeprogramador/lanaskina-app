<template>
  <v-container>
    <Navegacao></Navegacao>
    <v-card>
      <v-card-title>Falta Pouco!!!!</v-card-title>
      <v-card>
        <v-row>
          <v-col cols="12">
            <v-select
              hide-details
              rounded
              flat
              v-model="pgtSelecionado"
              :items="formasPgt"
              filled
              label="Selecione a forma de pagamento"
            ></v-select>
          </v-col>
          <v-col cols="12" v-if="pgtSelecionado != ''">
            <v-radio-group
              v-model="parcelasSelecionada"
              class="ml-3"
              v-if="pgtSelecionado == 'Cartão de Crédito'"
            >
              <v-radio
                v-for="n in 3"
                :key="n"
                :label="
                  n == 1
                    ? `${n}x - R$ ${parcelas[n - 1]} À Vista`
                    : `${n}x - R$ ${parcelas[n - 1]}`
                "
                :value="n + 'x'"
              ></v-radio>
            </v-radio-group>
            <v-radio-group v-model="parcelasSelecionada" class="ml-3" v-else>
              <v-radio
                :label="`1x - R$ ${parcelas[0]} À Vista`"
                :value="'1x'"
              ></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>

        <!-- //Inicio mensagem de sucesso -->
        <v-dialog v-model="dialogMsg" max-width="400">
          <v-expand-transition>
            <v-alert type="success" class="text-center">
              <strong> {{ msg }}</strong>
            </v-alert>
          </v-expand-transition>
        </v-dialog>
        <!-- Final de mensagem de sucesso -->

        <v-card elevation="0" class="text-center pa-2">
          <v-chip color="blue" large>
            <strong>Valor Total: </strong
            ><v-chip dark class="ml-3"> R$ {{ total.toFixed(2) }}</v-chip>
          </v-chip>
        </v-card>
        <v-row>
          <v-col cols="12" class="text-center">
            <v-btn
              rounded
              color="success"
              @click="pagar"
              v-if="pgtSelecionado != ''"
            >
              Pagar
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
import ClienteHttp from '@/HttpServices/ClienteHttp';
import EmpresaHttp from '@/HttpServices/EmpresaHttp';
import Navegacao from '@/components/Navegacao';

export default {
  name: 'Finalizar',
  components: { Navegacao },
  data() {
    return {
      formasPgt: ['Cartão de Crédito', 'Cartão de Débito', 'Boleto'],
      pgtSelecionado: '',
      parcelasSelecionada: '',
      parcelas: [],
      total: 0,
      cliente: '',
      empresa: '',
      carrinho: [],
      dialogMsg: false,
      msg: ''
    };
  },
  created() {
    this.getCarrinho();
  },
  methods: {
    async getCarrinho() {
      this.cliente = this.$route.params.cliente_id;
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
      this.calculaParcela();
    },
    calculaParcela() {
      for (let i = 0; i < 3; i++) {
        if (i == 0) {
          this.parcelas.push(this.total.toFixed(2));
        } else if (i == 1) {
          this.parcelas.push((this.total / 2).toFixed(2));
        } else {
          this.parcelas.push((this.total / 3).toFixed(2));
        }
      }
      console.log(this.parcelas);
    },
    async pagar() {
      if (this.parcelasSelecionada == '') return alert('Selecione a parcela');

      let transacao = { produtos: [] };
      transacao.valorTotal = this.total;
      this.carrinho.forEach((produto) => {
        let produtoEnvio = {};
        produtoEnvio.nome = produto.nome;
        produtoEnvio.valor = produto.valor;
        produtoEnvio.quantidade = produto.quantidade;
        transacao.produtos.push(produtoEnvio);
      });
      transacao.status = 'Concluido';
      transacao.dataTransacoes;
      transacao.cliente = this.cliente;

      let idEmpresa = this.carrinho[0].empresa;
      let resposta = await EmpresaHttp.criaTransacoes(idEmpresa, transacao);
      if (resposta.status == 200) {
        (this.dialogMsg = true),
          (this.msg = 'Sua compra foi finalizada com sucesso !!!!');

        setTimeout(() => {
          (this.dialogMsg = false), (this.msg = '');

          this.$router.push({
            path: `/historico/${this.cliente}`
          });
        }, 2500);
      }
    }
  }
};
</script>
