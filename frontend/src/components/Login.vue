<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-lg" style="width: 100%; max-width: 400px;">
      <h3 class="text-center mb-4">Seja bem vindo</h3>
      <form @submit.prevent="fazerLogin" id="form-login">
        <div class="mb-3">
          <label for="usuario" class="form-label">Usuário</label>
          <input type="text" class="form-control" id="usuario" v-model="usuario" required />
        </div>
        <div class="mb-3">
          <label for="senha" class="form-label">Senha</label>
          <input type="password" class="form-control" id="senha" v-model="senha" required />
        </div>
        <button type="submit" class="btn btn-primary w-100">Entrar</button>
      </form>
      <div class="mt-3 text-center text-danger" v-if="erroLogin">
        {{ erroLogin }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        usuario: '',
        senha: '',
        erroLogin: ''
      }
    },
    methods: {
      fazerLogin() {
        if (this.usuario === 'admin' && this.senha === '1234') {
          alert('Login bem-sucedido!')
          // redirecione ou salve token aqui
        } else {
          this.erroLogin = 'Usuário ou senha inválidos'
        }
      }
    }
  }

</script>

<style scope>
  * {
    margin: 0;
    padding: 0;
  }

  .form-login {
    display: flex;
    justify-content: center;
    margin: auto;
  }

</style>
