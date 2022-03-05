<template>
  <div>
    <h1>Лучшие предложения от&nbsp;букмекерских контор</h1>
    <div ref="wrapper" class="scroll-wrapper">
      <div ref="scrollFiller" class="scroll-filler"></div>
      <div ref="scroll" class="scroll">
        <div ref="inner" class="scroll-inner">
          <a href="#" class="scroll-item">
            <h2>Слайд 1</h2>
            <br /><br /><br /><br /><br />
            <span class="scroll-item-date">Описание</span>
          </a>
          <a href="#" class="scroll-item red">
            <h2>Слайд 2</h2>
            <span class="scroll-item-date">Описание</span>
          </a>
          <a href="#" class="scroll-item">
            <h2>Слайд 3</h2>
            <span class="scroll-item-date">Описание</span>
          </a>
          <a href="#" class="scroll-item bees">
            <h2>Слайд 4</h2>
            <span class="scroll-item-date">Описание</span>
          </a>
          <a href="#" class="scroll-item red">
            <h2>Слайд 5</h2>
            <span class="scroll-item-date">Описание</span>
          </a>
          <a href="#" class="scroll-item">
            <h2>Слайд 6</h2>
            <span class="scroll-item-date">1 сен 2020</span>
          </a>
          <div class="scroll-item ghost">
            <h2>Слайд 7</h2>
            <span class="scroll-item-date">Досвидули</span>
          </div>
        </div>
      </div>
    </div>
    <div class="scroll-position-wrapper">
      <button
        class="scroll-btn prev"
        ref="btnPrev"
        @click="prevBtn()"
        disabled
      ></button>
      <div class="scroll-position">
        <div ref="position" class="scroll-position-inner"></div>
      </div>
      <button class="scroll-btn next" ref="btnNext" @click="nextBtn()"></button>
    </div>

    <div class="info">
      <p>Это слайдер. Попробуйте прокрутить!</p>
      <p>
        <a
          target="_blank"
          href="https://tympanus.net/codrops/2019/07/10/how-to-add-smooth-scrolling-with-inner-image-animations-to-a-web-page/"
          >Вдохновленный этой демонстрацией.</a
        >
      </p>
      <p class="sub">С помощью мыши? Зажмите <b>Shift</b> и тащи</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'

@Component
export default class Slider extends Vue {
  public wrapper = this.$refs.wrapper
  public el = this.$refs.scroll
  public filler = this.$refs.scrollFiller
  public position = this.$refs.position
  public inner = this.$refs.inner
  public btns = { prev: this.$refs.btnPrev, next: this.$refs.btnNext }
  public lerp = (a: number, b: number, n: number) => {
    return (1 - n) * a + n * b
  }
  public padding = 20
  public scrollNow = 0
  public offset = 150
  public angle = 25
  public z = 15

  public animate() {
    let now = this.lerp(this.scrollNow, (this.$refs.wrapper as Element).scrollLeft, 0.15)
    ;(this as any).$gsap.set(this.$refs.scroll, { x: -now })
    ;(this as any).$gsap.set(this.$refs.position, {
      x: (now / (this as any).$refs.wrapper.offsetWidth) * 100 + '%',
    })

    document.querySelectorAll('.scroll-item').forEach((item: any) => {
      let elPos = item.offsetLeft + item.offsetWidth / 2 - this.scrollNow

      if (elPos > (this.$refs.wrapper as HTMLElement).offsetWidth - this.offset) {
        let q = ((this.$refs.wrapper as HTMLElement).offsetWidth - elPos) / this.offset
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

    if ((this.$refs.wrapper as HTMLElement).scrollLeft === 0) (this as any).btns.prev.disabled = true
    else if (
      (this.$refs.inner as HTMLElement).offsetWidth - (this as any).wrapper.scrollLeft ===
      (this.$refs.wrapper as HTMLElement).offsetWidth - this.padding * 2
    )
      (this as any).btns.next.disabled = true
    else {
      ;(this as any).btns.prev.disabled = false
      ;(this as any).btns.next.disabled = false
    }
    requestAnimationFrame(this.animate)
  }

  public nextBtn() {
    ;(this.$refs.wrapper as HTMLElement).scrollLeft +=
      (this as any).document.querySelector('.scroll-item').offsetWidth * 2 - 20
  }

  public prevBtn() {
    ;(this.wrapper as HTMLElement).scrollLeft -=
      (this as any).document.querySelector('.scroll-item').offsetWidth * 2 - 20
  }

  created() {
    this.animate()
    // ;(this as any).$refs.scrollFiller.style.width =
    //   (this as any).$refs.inner.offsetWidth + this.padding * 2 + 'px'

    // ;(this as any).$refs.position.style.width =
    //   ((this as any).$refs.wrapper.offsetWidth /
    //     ((this as any).$refs.inner.offsetWidth + this.padding * 2)) *
    //     100 +
    //   '%'
  }
}
</script>
<style lang="scss">
.scroll {
  &-wrapper {
    height: fit-content;
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
  }

  // this is the most problematic part that actually breaks the slider in Safari. I think the problem has something to do with 'position: sticky', but it doesn't seem fixable for now.
  padding: 20px 20px 40px;
  white-space: nowrap;
  position: sticky;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  &-filler {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  &-inner {
    width: fit-content;
    display: flex;
    align-items: stretch;

    & a:not(:last-child) {
      margin-left: 6px;
    }
  }

  &-item {
    width: 160px;
    border-radius: 16px;
    background-image: linear-gradient(130deg, #9457e2, #5029bb);
    transform: perspective(400px);
    box-shadow: 0 8px 20px 0 rgba(108, 79, 197, 0.44);
    padding: 20px 30px;
    vertical-align: top;
    color: white;
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
      margin-right: 0;
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
      margin-top: -10px;
      display: flex;
      align-items: center;
    }

    height: 1px;
    background-color: #f1f1f1;
    flex: 1;
    margin: 0 5px;

    &-inner {
      height: 1px;
      background-color: #d0d0d0;
    }
  }

  &-btn {
    display: block;
    appearance: none;
    border: none;
    background: none;
    width: 26px;
    height: 26px;
    background-color: white;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23aaa' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='9 18 15 12 9 6'%3E%3C/polyline%3E%3C/svg%3E");
    background-position: center;
    background-size: 20px;
    z-index: 9;
    cursor: pointer;
    opacity: 0.6;
    color: rgba(179, 179, 179, 0.7);
    transition-duration: 0.3s;

    &:hover {
      opacity: 1;
    }

    &.prev {
      transform: scaleX(-1);
    }

    &[disabled] {
      opacity: 0;
      pointer-events: none;
    }
  }
}

.info {
  padding: 10px;
  text-align: center;
  border-radius: 4px;
  box-shadow: 0 0 0 1px #ececec;
  margin-top: 30px;
  position: relative;

  p {
    color: #898e90;
    font-size: 0.9em;
    margin: 5px 10px;

    &.sub {
      font-size: 0.7em;
      margin-top: 7px;
      opacity: 0.5;
      line-height: 1;
    }

    a {
      color: #6c5dff;
      text-decoration: none;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
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
