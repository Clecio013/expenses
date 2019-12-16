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

        <button class="btn btn-primary w-100" :disabled="loading">
          <template v-if="loading">
            Entrando ...
            <i class="fa fa-spinner" />
          </template>
          <template v-else>
            Enviar
            <i class="fa fa-sign-in-alt" />
          </template>
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
      loading: false,
      email: 'email@email.com',
      password: '123456'
    }
  },
  methods: {
    async doLogin () {
      const { email, password } = this

      try {
        this.loading = true
        const res = await this.$firebase.auth().signInWithEmailAndPassword(email, password)

        window.uid = res.user.uid

        this.$router.push('/home')
      } catch (err) {
        let message = ''

        switch (err.code) {
          case 'auth/user-not-found':
            message = 'Não foi possivel localizar o usuario'
            break
          case 'auth/wrong-password':
            message = 'Senha invalida'
            break
          default:
            message = 'Não foi possivel fazer login, tente novamente'
        }

        this.$root.$emit('Notification::show', {
          type: 'danger',
          message
        })
        console.log(err)
      } finally {
        this.loading = false
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (window.uid) {
        vm.$router.push({ name: 'home' })
      }
    })
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
