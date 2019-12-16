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
                  <input v-model.number="form.value"  type="text" name="value" id="value" class="form-control">
                </div>

                <div class="form-group col-12 flex-column d-flex align-items-center">
                  <input
                    ref="input"
                    type="file"
                    class="d-none"
                    @change="handleFile($event)"
                    accept="image/*"
                  >
                  <button @click="openFileDialog()" type="button" class="btn w-50 btn-outline-secondary">
                    Adicionar comprovante
                  </button>

                  <div class="mt-2" v-if="form.receipt">
                    {{ form.receipt }}

                    <button @click="form.receipt = ''" class="btn badge badge-light">
                      <i class="fa fa-trash text-danger" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" @click="closeModal()" class="btn btn-secondary">Fechar</button>
              <button type="submit" class="btn btn-primary" :disabled="loading">
                <template v-if="loading">
                  <i class="fa fa-spin fa-spinner" />
                  Incluido ...
                </template>
                <template v-else>
                  Incluir novo gasto
                </template>
              </button>
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
      loading: false,
      form: {
        receipt: '',
        description: '',
        value: ''
      }
    }
  },
  computed: {
    fileName () {
      const { receipt } = this.form

      if (receipt) {
        const split = receipt.name.split('.')
        return `${split[0]}-${new Date().getTime()}.${split[1]}`
      } else {
        return ''
      }
    }
  },
  methods: {
    openFileDialog () {
      this.$refs.input.value = null
      this.$refs.input.click()
    },
    handleFile ({ target }) {
      this.form.receipt = target.files[0]
    },
    async submit () {
      let url = ''
      this.loading = true

      try {
        this.$root.$emit('Spinner::show')
        const ref = this.$firebase.database().ref(window.uid)
        const id = ref.push().key

        if (this.form.receipt) {
          const snapshot = await this.$firebase.storage()
            .ref(window.uid)
            .child(this.fileName)
            .put(this.form.receipt)

          url = await snapshot.ref.getDownloadURL()
        }

        const payload = {
          id,
          ...this.form,
          receipt: url,
          createdAt: new Date().getTime()
        }

        ref.child(id).set(payload, err => {
          if (err) {
            this.$root.$emit('Notification::show', {
              type: 'danger',
              message: 'Não foi possivel inserir o gasto, tente novamente'
            })
            this.loading = false
          } else {
            this.$root.$emit('Notification::show', {
              type: 'success',
              message: 'Gasto inserido com sucess!'
            })
            this.closeModal()
            this.loading = false
          }
        })
      } catch (err) {
        this.$root.$emit('Notification::show', {
          type: 'danger',
          message: 'Não foi possivel inserir o gasto, tente novamente'
        })
      } finally {
        this.$root.$emit('Spinner::hide')
        this.loading = false
      }
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
