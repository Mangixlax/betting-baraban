<template>
  <main :class="$style['main']">
    <Slider :slider-data="Slider" promo="promo-3" />
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
export default class Promo3 extends Vue {
  public Slider: Array<IBanner> = [
    {
      background: 'banners/Creative-1.jpg',
      logo: 'leon.png',
      title: 'Бонус 20 фрибетов',
      subTitle: 'по 1000 рублей каждый',
      link: '',
      button: {
        label: 'Подробнее',
      },
    },
    {
      background: 'banners/Creative-2.jpg',
      logo: 'leon.png',
      title: 'Фрибет 500 рублей',
      subTitle: 'В приложении тебя ждет фрибет 500 рублей!',
      link: '',
      button: {
        label: 'Забрать!',
      },
    },
    {
      background: 'banners/Creative-3.jpg',
      logo: 'leon.png',
      title: 'Бонусная программа',
      subTitle: 'Собирай очки и получай деньги',
      link: '',
      button: {
        label: 'Подробнее!',
      },
    },
    {
      background: 'banners/Creative-4.jpg',
      logo: 'leon.png',
      title: 'Перезагрузка 50%',
      subTitle: 'Продли игру с БК Леон!',
      link: '',
      button: {
        label: 'Подробнее',
      },
    },
    {
      background: 'banners/Creative-5.jpg',
      logo: 'champion.png',
      title: '200 000 рублей',
      subTitle: 'На первые депозы  каждому новому игроку!',
      link: '',
      button: {
        label: 'Подробнее',
        style: 'pink',
      },
    },
    {
      background: 'banners/Creative-6.jpg',
      logo: 'champion.png',
      title: 'До 1000 рублей',
      subTitle: 'За первый депозит',
      link: '',
      button: {
        label: 'Подробнее',
        style: 'pink',
      },
    },
    {
      background: 'banners/Creative-7.jpg',
      logo: 'champion.png',
      title: 'Кэшбэк до 20%',
      subTitle: 'Каждый понедельник',
      link: '',
      button: {
        label: 'Подробнее',
        style: 'pink',
      },
    },
    {
      background: 'banners/Creative-8.jpg',
      logo: 'champion.png',
      title: 'Искусство игры',
      subTitle: '50 000 рублей',
      link: '',
      button: {
        label: 'Подробнее',
        style: 'pink',
      },
    },
  ]
}
</script>

<style lang="scss" module>
.main {
  width: 100vw;
  min-height: 100vh;
}
</style>
