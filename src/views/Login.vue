<template>
  <div>
    <v-card width="500" class="mx-auto mt-9">
      <v-row>
        <v-col cols="12" class="text-center">
          <img width="200" src="./../assets/logols.png" alt="Logo lanaskina" />
        </v-col>
      </v-row>

      <v-card-title>
        Área de Login
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="Usuário"
          prepend-icon="mdi-account-circle"
          v-model="usuario.username"
        />
        <v-text-field
          label="Senha"
          v-model="usuario.senha"
          :type="verSenha ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          :append-icon="verSenha ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="verSenha = !verSenha"
        />
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions>
        <v-row>
          <v-col cols="12" class="text-center">
            <v-btn color="info" class="mx-2" @click="login">Login</v-btn>
            <v-btn @click="novoCadastro" color="warning"> Cadastrar</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import LoginHttp from '@/HttpServices/LoginHttp';
import AutenticacaoService from '@/services/AutenticacaoService';

export default {
  data() {
    return {
      verSenha: false,
      usuario: {}
    };
  },

  methods: {
    novoCadastro() {
      this.$router.push({
        path: `/cadastro`
      });
    },
    async login() {
      if (!this.usuario.username || !this.usuario.senha) {
        alert('Preencha os campos!');
        return;
      }
      try {
        const resposta = await LoginHttp.login(this.usuario);

        console.log(JSON.stringify(resposta));

        if (resposta.data.auth && resposta.data.token) {
          this.usuario.senha = undefined;
          this.usuario.token = resposta.data.token;

          AutenticacaoService.setUsuarioLogado(this.usuario);
          this.$router.push('/');
        }
      } catch (error) {
        alert('Usuário ou senha inválidos!');
      }
    }
  }
};
</script>

<style></style>
