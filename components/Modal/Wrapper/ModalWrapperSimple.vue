<template lang="pug">
  modal(
    v-slot="{ params, close }"
    v-bind="{ ...$attrs, ...$props }"
    v-on="$listeners"
    :classes="$style['modal-container']"
    :content-class="{\
      [$style['modal-content']]: true,\
      [$style['modal-content--full-size']]: fullSize,\
    }"
  )
    //- span(:class="$style['modal__close']" @click="close")
    //-   svg-icon(name="close")
    //- div(:class="$style['modal__header']")
    //-   slot(name="header")
    perfect-scrollbar(:class="$style['modal__body']")
      slot(:params="params" :close="close")
    div(v-if="$slots.actions" :class="$style['modal__action']")
      slot(name="actions")
        //ui-form-button(
        //  variant="primary"
        //  @click="close"
        //) Сохранить
        //ui-form-button(
        //  variant="default"
        //  border
        //  @click="closeAllModals"
        //) Очистить
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import PerfectScrollbar from '~/components/Common/PerfectScrollbar.vue'

@Component({
  components: {
    PerfectScrollbar,
  },
})
export default class ModalWrapperSimple extends Vue {
  @Prop({ type: Boolean, default: false })
  fullSize!: boolean

  @Prop({ type: String, default: '' })
  name!: string

  public closeAllModals() {
    ;(this as any).$modal.hideAll()
  }
}
</script>

<style lang="sass" module>
.modal-container
  display: flex
  justify-content: center
  align-items: center

.modal-content
  position: relative
  display: flex
  flex-direction: column
  border-radius: 9px
  background: #FFFFFF
  margin: 0 28px
  max-height: calc(100vh - 64px)

  @media (max-width: 768px)
    margin: 32px 28px
    place-self: flex-end

  @media (max-width: 359px)
    margin: 0
    height: 100%
    max-height: 100vh

  &--full-size
    width: 100%
    height: 100%
    border-radius: 0
    max-height: none
    margin: 0

.modal__header
  position: sticky
  top: 0
  height: 86px
  padding: 32px 24px 14px
  flex-shrink: 0
  display: flex
  align-items: center

.modal__body
  display: flex
  flex-direction: column
  flex-grow: 1
  position: relative
  overflow-x: hidden
  overflow-y: auto

.modal__action
  display: flex
  justify-content: center
  align-items: center
  flex-shrink: 0
  padding: 20px 0
  margin: 0 24px
  position: sticky
  bottom: 0

  & > *:not(:last-child)
    margin-right: 12px

.modal__close
  position: absolute
  top: 32px
  right: 24px
  border: none
  border-radius: 7px
  height: 40px
  width: 40px
  padding: 0
  z-index: 1

  & span, & svg
    width: 20px
    height: 20px
</style>
