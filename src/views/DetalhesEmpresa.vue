<template>
  <div class="detalhesEmpresa">
    <v-container>DETALHES DA EMPRESA</v-container>
  </div>
</template>

<script>
// import HomeHttp from '@/HttpServices/HomeHttp'
// @ is an alias to /src

export default {
  name: 'Detalhes Empresa',
  data() {
    return {
      empresa: {}
    }
  },
  mounted() {
    this.getEmpresa()
  },
  methods: {
    getEmpresa() {
      this.empresa = this.$router.params.empresa
      console.log('EMPRESA PARAMETRO: ' + JSON.stringify(this.empresa))
    }
  }
}
</script>
