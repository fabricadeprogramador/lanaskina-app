<template>
  <v-container>
    <div class="d-flex flex-column justify-space-between align-center my-3">
      <v-img width="300" :src="empresa.imagem"></v-img>
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
// import EmpresaHttp from '@/HttpServices/EmpresaHttp'

export default {
  name: 'Carrinho Produto',
  data() {
    return {
      produto: {}
    }
  },
  created() {
    // this.getProduto()
  },
  methods: {
    async getProduto() {
      // let empresaId = this.$route.params.empresa_id
      // let resposta = await EmpresaHttp.buscarPorId(empresaId)
      // if (resposta && resposta.status == 200) {
      //   this.empresa = resposta.data
      // }
    }
  }
}
</script>
