<template>
  <div 
    :class="$style['banner']"
    :style="{backgroundImage: `url(${$img(banner.background)})`}"
  > 
    <span
        @click="isShowFullsize = !isShowFullsize"
        :class="$style['banner-icon']"
      >
        <svg-icon :name="openIcon ? 'open': 'close'">
        </svg-icon>
    </span>
    <div :class="$style['banner__container']">
      <img :class="$style['banner__container-logo']" :src="$img(`logo/${banner.logo}`)" alt="logo">
      <div :class="$style['banner__container-title']"> {{banner.title }}</div>
      <div :class="$style['banner__container-subtitle']"> {{banner.subTitle }}</div>
      <div :class="$style['banner__container-description']" v-if="banner.description "> {{banner.description }}</div>
      <a 
        :class="{
          [$style['banner__container-button']]: true,
          [$style['banner__container-button--pink']]: banner.button.style === 'pink',
        }"
        
      >
        {{ banner.button.label }}
      </a>
    <div :class="$style['banner--fullsize']" v-if="isShowFullsize">
      <BannerRec :banner="banner" :openIcon="false"/>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop} from 'nuxt-property-decorator'

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
    BannerRec: () => import('~/components/Banner/Banner.vue')
  },
  name: 'Banner'
})
export default class Banner extends Vue {
  @Prop({ type: Boolean, default: true}) openIcon!: boolean
  @Prop({ type: Object, default: () => {} }) banner!: IBanner

  public isShowFullsize: boolean = false

  public showFullsize() {
    this.isShowFullsize = true
  }

  public hideFullsize() {
    this.isShowFullsize = false
  }
}
</script>

<style lang="scss" module>
@font-face {
  font-family: 'Gilory';
  src: local("Gilory"),url('./assets/fonts/Gilroy-Regular.woff') format('woff');
  font-weight: 100;
  font-style: normal;
}


.banner {
  height: 100%;
  width: 100%;
  padding: 14px;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 16px;
  display: flex;
  flex-direction: column;

  &-icon {
    height: 24px;
    width: 24px;
    align-self: flex-end;
    margin: 2px;
    
    svg {
      height: 24px;
      width: 24px;
    }
  }

  &__container {
    display: flex;
    height: 100%;
    flex-direction: column;
    margin-top: 12px;

    &-logo {
      max-height: 20px;
      width: min-content;
      margin-bottom: 20px;
    }

    &-title {
      font-family: Gilroy;
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 100%;
      color: #E31F24;
      margin-bottom: 8px
    }
    
    &-subtitle {
      font-family: Gilroy;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 100%;
      color: #FFFFFF
    }

    &-description {
      font-family: Gilroy;
      font-style: normal;
      font-weight: 600;
      font-size: 10px;
      line-height: 125%;
      color: #1B1B1B;
    }

    &-button {
      text-decoration: none;
      padding: 10px 18px;
      background: rgba(255, 255, 255, 0.96);
      backdrop-filter: blur(8px);
      font-family: Gilroy;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 18px;
      width: fit-content;
      border-radius: 80px;
      margin-top: auto;

      &--pink {
        background: rgba(162, 23, 228, 0.8);
        color: rgba(255, 255, 255, 0.96);
      }
    }
  }
  &--fullsize {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    width: 100vh;
  }
}
</style>