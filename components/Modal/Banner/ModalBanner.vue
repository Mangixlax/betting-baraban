<template lang="pug">
  modal-wrapper-simple(
    v-bind="{ ...$attrs, ...$props }"
    v-on="$listeners"
  )
    div(
      :class="$style['modal__header']"
      :style="{ backgroundImage: `url(${$img('/modals/header.jpg')})`}"
    )
      span(
        @click="hideModal"
        :class="$style['modal__header-close']"
      )
        svg-icon(name="close")

    div(:class="$style['modal__body']")
      div(:class="$style['modal-title']") {{ banner.title }}
      div(:class="$style['modal-subtitle']") {{ banner.subTitle }} Пополняй счет на 500 рублей и получай 1000 рублей фрибетом. И так 20 раз. Используй фрибеты для ставок, выполняй условие отыгрыша и выводи чистый выигрыш на основной счет. Приятной игры!
      div(:class="$style['modal-button']" @click="goToIndex") Войти!
    //- banner( :banner="banner" :name="name" :open-icon="openIcon" )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ModalWrapperSimple from '~/components/Modal/Wrapper/ModalWrapperSimple.vue'
import Banner from '~/components/Banner/Banner.vue'

interface IBanner {
  background: string
  logo: string
  title: string
  subTitle: string
  description?: string
  link: string
}

@Component({
  components: {
    ModalWrapperSimple,
    Banner,
  },
})
export default class ModalContentCallbackAfk extends Vue {
  /**
   * Unique modal name
   */
  @Prop({ type: String, required: true }) name!: string
  @Prop({ type: Object, default: () => {} }) banner!: IBanner
  @Prop({ type: Boolean, default: true }) openIcon!: IBanner

  public hideModal() {
    ;(this as any).$modal.hide(this.name)
  }

  public goToIndex() {
    this.hideModal
    this.$router.push({ name: 'index' })
  }
}
</script>

<style lang="scss" module>
.modal {
  width: 100%;
  text-align: center;

  &__header {
    height: 156px;
    background-size: cover;
    padding: 24px;

    &-close {
      margin-left: auto;
      min-height: 32px;
      width: 32px;
      display: flex;

      svg {
        height: 32px;
        width: 32px;
      }
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 24px;
    background: #212226;
  }

  &-title {
    font-family: Gilroy;
    font-style: normal;
    font-weight: 600;
    font-size: 36px;
    line-height: 100%;
    display: flex;
    align-items: center;
    color: #ffffff;
  }

  &-subtitle {
    margin-top: 24px;
    font-family: Gilroy;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 144%;
    color: rgba(255, 255, 255, 0.8);
  }

  &-button {
    width: fit-content;
    margin-top: auto;
    padding: 14px 26px;
    background: rgba(227, 31, 36, 0.96);
    backdrop-filter: blur(8px);
    border-radius: 80px;
    font-family: Gilroy;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;
    color: rgba(255, 255, 255, 0.96);
  }
}
</style>
