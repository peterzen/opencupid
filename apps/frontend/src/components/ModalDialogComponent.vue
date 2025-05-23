<script lang="ts">

import { defineComponent } from 'vue'
import { Modal } from 'bootstrap'

export default defineComponent({
  name: 'ModalDialogComponent',
  props: {
    title: {
      type: String,
      required: true
    },
    open: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      modal: null as Modal | null,
    }
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal as HTMLElement, {
      backdrop: 'static',
      keyboard: true
    })
  },
  watch: {
    open: {
      // immediate: true,
      handler(open: boolean) {
        if (open) {
          this.modal?.show()
        } else {
          this.modal?.hide()
        }
      }
    }
  },
})


</script>


<template>
  <Teleport to="body">

    <div class="modal fade"
         tabindex="-1"
         ref="modal"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5"
                id="exampleModalLabel">{{ title }}</h1>
            <button type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style>
body.modal-open #app {
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
}
</style>