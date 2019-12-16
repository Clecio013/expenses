<template>
  <div class="w-100 d-flex justify-content-center">
    <button @click="showModal = true" class="btn btn-lg btn-outline-primary w-75">
      <i class="fa fa-plus" />
      Novo gasto
    </button>

    <form @submit.prevent="submit()">
      <div class="modal fade" :class="{ show: showModal }" :style="{ display: showModal ? 'block' : 'none' }">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Adicionar um novo gasto</h5>
              <button type="button" @click="closeModal()" class="close" aria-label="Fechar">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="form-group col-8" required>
                  <label for="description">Descrição</label>
                  <input v-model="form.description" type="text" name="description" id="description" class="form-control">
                </div>

                <div class="form-group col-4" required>
                  <label for="value">Valor ($RS)</label>
                  <input v-model="form.value"  type="text" name="value" id="value" class="form-control">
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" @click="closeModal()" class="btn btn-secondary">Fechar</button>
              <button type="submit" class="btn btn-primary">Incluir novo gasto</button>
            </div>
          </div>
        </div>
      </div>
    </form>

    <div class="modal-backdrop fase show" :style="{ display: showModal ? 'block' : 'none' }"></div>
  </div>
</template>

<script>
export default {
  name: 'LayoutNewExpense',
  data () {
    return {
      showModal: false,
      form: {
        description: '',
        value: ''
      }
    }
  },
  methods: {
    submit () {
      this.$root.$emit('Spinner::show')
      const ref = this.$firebase.database().ref(window.uid)
      const id = ref.push().key

      const payload = {
        id,
        receipt: null,
        value: this.form.value,
        createdAt: new Date().getTime(),
        description: this.form.description
      }

      ref.child(id).set(payload, err => {
        this.$root.$emit('Spinner::hide')

        if (err) {
          console.log(err)
        } else {
          this.closeModal()
        }
      })
    },
    closeModal () {
      this.showModal = false
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  color: var(--darker);
}
</style>
