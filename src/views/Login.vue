<template>
  <div>
    
   
      <v-card width="500" class= "mx-auto mt-9">
        <v-row>
      <v-col >
        <img  width="200" src="./../assets/logols.png" alt="Logo lanaskina" />
      </v-col>
    </v-row>

        <v-card-title >
          Área de Login
        </v-card-title>
        <v-card-text>
        <v-text-field label="Usuário" prepend-icon="mdi-account-circle" />
        <v-text-field 
        label="Senha" 
        :type="verSenha ? 'text' : 'password'"
         prepend-icon="mdi-lock" 
        :append-icon="verSenha ? 'mdi-eye' : 'mdi-eye-off'" 
        @click:append="verSenha = !verSenha"/>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
        <v-btn @click="novoCadastro" color="success"> Cadastrar</v-btn>
        <v-btn color="info">Login</v-btn>

        </v-card-actions>

      </v-card>

    
  </div>
</template>

<script>


export default {
  data()
  {
    return{
      verSenha:false,

    }
  },

  methods:{
  novoCadastro(){
    this.$router.push({
        path: `/cadastro`
      });
  },
  },
}

</script>

<style></style>
