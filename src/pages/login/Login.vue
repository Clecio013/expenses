<template>
  <form @submit.prevent="doLogin()" class="form-login">
    <div class="card">
      <div class="card-header text-center">
        <h1 class="mb-0">Expenses</h1>
      </div>
      <div class="card-body">
        <div class="form-group">
          <input
            required
            type="email"
            v-model="email"
            class="form-control"
            placeholder="E-mail"
          >
        </div>

        <div class="form-group">
          <input
            required
            type="password"
            v-model="password"
            class="form-control"
            placeholder="Senha"
          >
        </div>

        <button class="btn btn-primary w-100">
          Enviar
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async doLogin () {
      const { email, password } = this

      try {
        const res = await this.$firebase.auth().signInWithEmailAndPassword(email, password)
        console.log(res)
      } catch (err) {
        console.log(err)
      }

      console.log('login')
    }
  }
}
</script>

<style lang="scss" scoped>
.form-login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 18px;
  }

  .card {
    width: 30%;
    color: var(--dark);
  }
}
</style>
