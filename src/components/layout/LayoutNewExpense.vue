<template>
  <div class="w-100 d-flex justify-content-center">
    <button @click="showModal = true" class="btn btn-lg btn-outline-primary w-75">
      <i class="fa fa-plus" />
      Novo gasto
    </button>

    <div class="modal fade" :class="{ show: showModal }" :style="{ display: showModal ? 'block' : 'none' }">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Título do modal</h5>
            <button type="button" @click="closeModal()" class="close" aria-label="Fechar">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Lorem ipsum is amet</p>
          </div>
          <div class="modal-footer">
            <button type="button" @click="closeModal()" class="btn btn-secondary">Fechar</button>
            <button type="button" class="btn btn-primary">Salvar mudanças</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-backdrop fase show" :style="{ display: showModal ? 'block' : 'none' }"></div>
  </div>
</template>

<script>
export default {
  name: 'LayoutNewExpense',
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    closeModal () {
      this.showModal = false
    }
  }
}
</script>
