<template>
  <v-container>
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
                    ? `${n}x - ${parcelas[n - 1]} À Vista`
                    : `${n}x - ${parcelas[n - 1]}`
                "
                :value="n"
              ></v-radio>
            </v-radio-group>
            <v-radio-group v-model="parcelasSelecionada" class="ml-3" v-else>
              <v-radio
                :label="`1x - ${parcelas[0]} À Vista`"
                :value="1"
              ></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-card elevation="0" class="text-center pa-2">
          <v-chip color="blue" large>
            <strong>Valor Total: </strong
            ><v-chip dark class="ml-3"> R${{ total.toFixed(2) }}</v-chip>
          </v-chip>
        </v-card>
        <v-row>
          <v-col cols="12" class="text-center">
            <v-btn rounded color="success" @click="pagar">
              Pagar
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
import ClienteHttp from "@/HttpServices/ClienteHttp";

export default {
  name: "Finalizar",
  data() {
    return {
      formasPgt: ["Cartão de Crédito", "Cartão de Débito", "Boleto"],
      pgtSelecionado: "",
      parcelasSelecionada: "",
      parcelas: [" 300.00", "150.00", "100.00"],
      total: 300,
       cliente: "5f98be432e9ed602a0dfdb4c" 
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
      //   let total = 0;
      //   this.carrinho.forEach(produto => {
      //     total += produto.valor;
      //   });
      this.total = 333;
    },
    pagar() {
      alert("chamou pagar");
    }
  }
};
</script>
