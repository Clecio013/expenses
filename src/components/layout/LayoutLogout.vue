<template>
  <button class="btn btn-logout" @click="logout">
    <i class="fa fa-power-off" />
    Sair
  </button>
</template>

<script>
export default {
  name: 'LayoutLogout',
  methods: {
    async logout () {
      this.$root.$emit('Spinner::show')

      await this.$firebase.auth().signOut()

      this.$router.push({ name: 'login ' })

      this.$root.$emit('Spinner::hide')
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-logout {
  width: 100%;
  cursor: pointer;
  color: var(--white);
  &:hover {
    color: var(--featured);
  }
}
</style>
