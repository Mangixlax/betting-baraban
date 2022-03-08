<template>
  <main :class="$style['main']">
    <nuxt-link :class="$style['main-link']" :to="{ name: 'promo-1' }"
      >Promo-1</nuxt-link
    >
    <nuxt-link :class="$style['main-link']" :to="{ name: 'promo-2' }"
      >Promo-2</nuxt-link
    >
    <nuxt-link :class="$style['main-link']" :to="{ name: 'promo-3' }"
      >Promo-3</nuxt-link
    >
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Slider from '~/components/Slider/Slider.vue'

interface IButton {
  label: string
  style?: string
}

interface IBanner {
  background: string
  logo: string
  title: string
  subTitle: string
  link: string
  button?: IButton
}

@Component({
  components: {
    Slider,
  },
})
export default class Index extends Vue {}
</script>

<style lang="scss" module>
.main {
  width: 100vw;
  min-height: 100vh;
  background-color: #212226;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  &-link {
    text-decoration: none;
    font-family: Gilroy;
    font-style: normal;
    font-weight: 600;
    font-size: 36px;
    line-height: 100%;
    color: #ffffff;
  }
}
</style>
