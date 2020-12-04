<template>
  <v-container>
    <Navegacao></Navegacao>
    <v-card
      v-for="h in historico"
      :key="h._idTransacao"
      class="mx-auto mt-3 pa-4"
      elevation
      max-width="400"
    >
      <v-list-item>
        <v-list-item-content>
          <div class="pa-1">Id: {{ h._idTransacao }}</div>
          <div class="pa-1">
            Valor : R$ {{ h.valorTotal ? h.valorTotal.toFixed(2) : '0.00' }}
          </div>
          <div class="pa-1">
            Data:
            {{ h.dataTransacao ? formatData(h.dataTransacao) : 'No date' }}
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-container>
</template>

<script>
import ClienteHttp from '@/HttpServices/ClienteHttp';
import Navegacao from '@/components/Navegacao';

export default {
  name: 'Historico',
  components: { Navegacao },
  data() {
    return {
      cliente: '5f98be432e9ed602a0dfdb4c',
      historico: []
    };
  },
  created() {
    this.getHistorico();
  },
  methods: {
    async getHistorico() {
      let resposta = await ClienteHttp.buscarHistorico(this.cliente);
      if (resposta.status == 200) {
        this.historico = resposta.data;
      }
      console.log(this.historico);
    },
    formatData(data) {
      let ano = data.slice(0, 4);
      let mes = data.slice(5, 7);
      let dia = data.slice(8, 10);
      return `${dia}/${mes}/${ano}`;
    }
  }
};
</script>
