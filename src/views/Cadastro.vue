<template>
  <div>
    <h3>Você está a um passo de economizar e comer MUUUITO!</h3>
    <v-form class="mr-3">
      <v-container class="px-5">
        <v-text-field
          v-model="cadastroCorrente.nome"
          :rules="nomeRules"
          label="Nome Completo"
          required
        >
        </v-text-field>

        <v-text-field
          v-model="cadastroCorrente.cpf"
          :rules="cpfRules"
          label="CPF"
          required
        >
        </v-text-field>

        <v-text-field
          v-model="cadastroCorrente.username"
          :rules="usernameRules"
          label="Nome de Usuário"
          required
        >
        </v-text-field>

        <v-text-field
          v-model="cadastroCorrente.senha"
          :rules="senhaRules"
          label="senha"
          type="password"
          required
        >
        </v-text-field>

        <v-text-field
          v-model="confirmarSenha"
          :rules="senhaRules"
          label="Confirmar Senha"
          type="password"
          required
        >
        </v-text-field>

        <v-text-field
          v-model="cadastroCorrente.telefone"
          :rules="telefoneRules"
          label="Celular"
          type="number"
          required
        >
        </v-text-field>

        <v-text-field
          v-model="cadastroCorrente.email"
          :rules="emailRules"
          label="E-mail"
          required
        >
        </v-text-field>

        <v-text-field
          v-model="cadastroCorrente.cep"
          :rules="cepRules"
          label="CEP"
          required
        >
        </v-text-field>

        <v-text-field
          v-model="cadastroCorrente.rua"
          :rules="ruaRules"
          label="Rua."
          required
        >
        </v-text-field>
        <v-text-field
          v-model="cadastroCorrente.numero"
          :rules="numeroRules"
          label="Número"
          required
        >
        </v-text-field>
        <v-text-field
          v-model="cadastroCorrente.complemento"
          label="Complemento"
        >
        </v-text-field>
        <v-text-field
          v-model="cadastroCorrente.bairro"
          :rules="bairroRules"
          label="Bairro"
          required
        >
        </v-text-field>
        <v-text-field
          v-model="cadastroCorrente.cidade"
          :rules="cidadeRules"
          label="Cidade"
          required
        >
        </v-text-field>
        <v-text-field
          v-model="cadastroCorrente.uf"
          :rules="ufRules"
          label="Estado"
          required
        >
        </v-text-field>
        <v-btn color="success" class="mr-4" @click="salvar"> Salvar </v-btn>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'Cadastro',
  data: () => ({
    confirmarSenha: '',
    cadastroCorrente: {
      nome: '',
      cpf: '',
      username: '',
      senha: '',
      telefone: '',
      email: '',
      cep: '',
      rua: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: ''
    },

    nomeRules: [
      (v) => !!v || 'Nome é obrigatório',
      (v) =>
        (v.length >= 10 && v.length <= 30) ||
        'Nome precisa ter entre 10 e 30 caracteres'
    ],
    cpfRules: [
      (v) => !!v || 'CPF é obrigatório',
      (v) => v.length == 11 || 'Digite somente os números do CPF'
    ],
    usernameRules: [
      (v) => !!v || 'Username é obrigatório',
      (v) =>
        (v.length >= 3 && v.length <= 15) ||
        'Username precisa ter entre 3 e 15 caracteres'
    ],
    senhaRules: [
      (v) => !!v || 'Senha é obrigatório',
      (v) =>
        (v.length >= 8 && v.length <= 12) ||
        'Senha precisa ter entre 8 e 12 caracteres'
    ],
    telefoneRules: [
      (v) => !!v || 'Celular é obrigatório',
      (v) => v.length == 11 || '(67)xxxxxxxxx'
    ],
    emailRules: [
      (v) => !!v || 'E-mail é obrigatório',
      (v) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        'email@email.com'
    ],
    cepRules: [
      (v) => !!v || 'CEP é obrigatório',
      (v) => v.length == 9 || '00000-000'
    ],
    numeroRules: [
      (v) => !!v || 'Número é obrigatório',
      (v) =>
        (v.length >= 1 && v.length <= 5) ||
        'Número precisa ter entre 1 e 5 caracteres'
    ],
    ruaRules: [
      (v) => !!v || 'Rua é obrigatório',
      (v) => v.length >= 5 || 'Digite sua rua, avenida, travessa, etc'
    ],
    bairroRules: [
      (v) => !!v || 'bairro é obrigatório',
      (v) => v.length >= 3 || 'Vila, Jardim, etc'
    ],
    cidadeRules: [
      (v) => !!v || 'Cidade é obrigatório',
      (v) => (v.length >= 1 && v.length <= 12) || 'Cidade, Distrito, etc'
    ],
    ufRules: [
      (v) => !!v || 'Estado é obrigatório',
      (v) => v.length == 2 || 'SIGLA ex: MS '
    ]
  }),

  methods: {
    async salvar() {
      if (this.cadastroCorrente.senha != this.confirmarSenha) {
        alert('Senhas não conferem!');
      }
      this.isDialogSalvoComSucesso = true;
      this.msgSalvoComSucesso = 'Cliente criado com sucesso';

      setTimeout(() => {
        this.isDialogSalvoComSucesso = false;
        this.msgSalvoComSucesso = '';
      }, 1500);
    },

    adicionar() {},

    fechaCadastroUsuario() {
      this.$router.push({
        path: `/`
      });
    }
  }
};
</script>

<style></style>
