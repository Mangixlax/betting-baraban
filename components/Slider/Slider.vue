<template>
  <div class="wrapper">
    <Logo class="wrapper-logo"></Logo>
    <h1 class="wrapper-title">
      Лучшие предложения от&nbsp;букмекерских контор
    </h1>
    <div ref="wrapper" class="scroll-wrapper">
      <div ref="scrollFiller" class="scroll-filler"></div>
      <div ref="scroll" class="scroll">
        <div ref="inner" class="scroll-inner">
          <div
            href="#"
            v-for="(slide, index) in sliderData"
            :key="index"
            ref="scrollItem"
            class="scroll-item"
          >
            <Banner :banner="slide" :promo="promo" name="banner" />
          </div>
        </div>
      </div>
    </div>
    <div class="scroll-position-wrapper" v-show="isHideControlBar">
      <span class="scroll-btn prev">
        <svg-icon
          name="slider-prev"
          ref="btnPrev"
          @click="prevBtn()"
        ></svg-icon>
      </span>
      <div class="scroll-position">
        <div ref="position" class="scroll-position-inner"></div>
      </div>
      <span class="scroll-btn next">
        <svg-icon
          name="slider-next"
          ref="btnNext"
          @click="nextBtn()"
        ></svg-icon>
      </span>
    </div>
    <div class="info">
      Guesser - беттинг платформа, которая предоставляет лучшие предложения для
      пользователей
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Banner from '~/components/Banner/Banner.vue'
import Logo from '~/components/Logo.vue'

@Component({
  components: {
    Banner,
    Logo,
  },
})
export default class Slider extends Vue {
  @Prop({ type: Array, default: () => [] }) sliderData!: Array<object>
  @Prop({ type: String, default: '' }) promo!: string

  public lerp = (a: number, b: number, n: number) => {
    return (1 - n) * a + n * b
  }
  public padding = 20
  public scrollNow = 0
  public offset = 150
  public angle = 25
  public z = 15
  public isHideControlBar = true

  public animate() {
    let now = this.lerp(
      this.scrollNow,
      (this.$refs.wrapper as Element).scrollLeft,
      0.5
    )
    ;(this as any).$gsap.set(this.$refs.scroll, { x: -now })
    ;(this as any).$gsap.set(this.$refs.position, {
      x: (now / (this as any).$refs.wrapper.offsetWidth) * 100 + '%',
    })

    document.querySelectorAll('.scroll-item').forEach((item: any) => {
      let elPos = item.offsetLeft + item.offsetWidth / 2 - this.scrollNow

      if (
        elPos >
        (this.$refs.wrapper as HTMLElement).offsetWidth - this.offset
      ) {
        let q =
          ((this.$refs.wrapper as HTMLElement).offsetWidth - elPos) /
          this.offset
        ;(this as any).$gsap.set(item, {
          rotateY: -(this.angle - q * this.angle),
          z: this.z - this.z * q,
        })
      } else if (elPos < this.offset) {
        let q = elPos / this.offset
        ;(this as any).$gsap.set(item, {
          rotateY: this.angle - q * this.angle,
          z: this.z - this.z * q,
        })
      } else {
        ;(this as any).$gsap.set(item, { rotateY: 0, z: 0 })
      }
    })

    this.scrollNow = now

    let btns = { prev: this.$refs.btnPrev, next: this.$refs.btnNext }

    if ((this.$refs.wrapper as HTMLElement).scrollLeft === 0) {
      ;(btns.prev as any).disabled = true
    } else if (
      (this.$refs.inner as HTMLElement).offsetWidth -
        (this.$refs.wrapper as HTMLElement).scrollLeft ===
      (this.$refs.wrapper as HTMLElement).offsetWidth - this.padding * 2
    ) {
      ;(btns as any).next.disabled = true
    } else {
      ;(btns.prev as any).disabled = false
      ;(btns.next as any).disabled = false
    }
    requestAnimationFrame(this.animate)
  }

  public nextBtn() {
    ;(this.$refs.wrapper as HTMLElement).scrollLeft +=
      (this.$refs.scrollItem as any)[0].offsetWidth * 2 + 12
  }

  public prevBtn() {
    ;(this.$refs.wrapper as HTMLElement).scrollLeft -=
      (this.$refs.scrollItem as any)[0].offsetWidth * 2 + 12
  }

  checkResize() {
    if ((this.$refs.inner as HTMLElement).clientWidth > window.innerWidth) {
      this.isHideControlBar = true
    } else {
      this.isHideControlBar = false
    }

    ;(this as any).$refs.position.style.width =
      ((this as any).$refs.wrapper.offsetWidth /
        ((this as any).$refs.inner.offsetWidth + this.padding * 2)) *
        100 +
      '%'
  }

  mounted() {
    window.addEventListener('resize', this.checkResize)
    this.checkResize()
    this.animate()
    ;(this.$refs.wrapper as HTMLElement).scrollLeft =
      (this.$refs.scrollItem as any)[0].offsetWidth / 2
    ;(this as any).$refs.scrollFiller.style.width =
      (this as any).$refs.inner.offsetWidth + this.padding * 2 + 'px'
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.checkResize)
  }
}
</script>
<style lang="scss">
.wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  &-logo {
    align-self: center;
    margin: 32px 0;
  }

  &-title {
    font-family: Gilroy;
    font-style: normal;
    font-weight: bold;
    font-size: 26px;
    line-height: 116%;
    letter-spacing: -0.01em;
    margin: 0;
    padding: 0 40px;
    margin-bottom: 20px;
  }
}
.scroll {
  &-wrapper {
    height: fit-content;
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
    position: relative;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    &::-webkit-scrollbar-thumb,
    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar-thumb:hover {
      background: transparent;
    }
  }

  // this is the most problematic part that actually breaks the slider in Safari. I think the problem has something to do with 'position: sticky', but it doesn't seem fixable for now.
  white-space: nowrap;
  position: sticky;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 20px 20px 50px;

  &-filler {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  &-inner {
    width: fit-content;
    display: flex;
    align-items: stretch;
  }

  &-item {
    width: 179px;
    height: 312px;
    border-radius: 16px;
    transform: perspective(400px);
    box-shadow: 0px 22px 26px rgba(26, 26, 29, 0.17);
    vertical-align: top;
    text-decoration: none;
    white-space: normal;
    display: flex;
    flex-direction: column;

    &.red {
      background-image: linear-gradient(130deg, #ff8063, #e34040);
      box-shadow: 0 8px 20px 0 rgba(213, 65, 51, 0.45);
    }

    &.bees {
      background-image: linear-gradient(130deg, #ffe561, #ffd24c);
      box-shadow: 0 8px 20px 0 rgba(227, 169, 55, 0.45);
      color: #333;
    }

    &.blue {
      background-image: linear-gradient(130deg, #1cffb7, #0075ff);
      box-shadow: 0 8px 20px 0 rgba(107, 187, 255, 0.45);
    }

    &.ghost {
      background-image: none;
      box-shadow: none;
      border: 1px dashed #eaeaea;
      color: #bdbdbd;
      cursor: default;
    }

    &:not(:last-child) {
      margin-right: 8px;
    }

    h2 {
      font-size: 1.15em;
      font-weight: 600;
      line-height: 1.5;
      margin: 0 0 30px;
    }

    .scroll-item-date {
      font-size: 0.8em;
      letter-spacing: 0.02em;
      opacity: 0.8;
      display: block;
      margin-top: auto;
    }
  }

  &-position {
    &-wrapper {
      width: 100%;
      display: flex;
      align-items: center;
      margin-top: 10px;
      padding: 0 40px;
    }

    height: 1px;
    background-color: #f1f1f1;
    flex: 1;
    margin: 0 16px;

    &-inner {
      height: 1px;
      background-color: #292d32;
    }
  }

  &-btn {
    display: block;
    appearance: none;
    border: none;
    background: none;
    width: 24px;
    height: 24px;
    z-index: 9;
    cursor: pointer;
    opacity: 0.6;
    color: rgba(179, 179, 179, 0.7);
    transition-duration: 0.3s;

    svg {
      height: 24px;
      width: 24px;
    }

    &[disabled] {
      opacity: 0;
      pointer-events: none;
    }
  }
}

.info {
  width: 100%;
  padding: 0 40px;
  margin-top: 28px;
  font-family: Gilroy;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 144%;
  color: rgba(41, 45, 50, 0.56);
  padding-bottom: 20px;
}

footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: auto;

  a {
    display: block;
    color: #d7d7d7;
    font-size: 0.8em;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition-duration: 0.2s;
    padding-bottom: 1px;
    line-height: 1.3;

    &:hover {
      color: #9e94ff;
      border-color: currentColor;
    }
  }
}
</style>
