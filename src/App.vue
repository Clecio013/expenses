<template>
  <div id="app">
    <base-spinner />
    <!-- <router-view/> -->
    <button @click="mostrarSpinner()">Alternar Spinner</button>
  </div>
</template>

<script>
import BaseSpinner from '@/components/global/BaseSpinner'

export default {
  name: 'App',
  components: {
    BaseSpinner
  },
  mounted () {
    console.log(this.$firebase)
  },
  methods: {
    mostrarSpinner () {
      this.$root.$emit('Spinner::show')
    }
  }
}
</script>

<style lang="scss">

</style>
