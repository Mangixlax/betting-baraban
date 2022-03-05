<template>
  <main>
    <Slider />
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Slider from '~/components/Slider/Slider.vue'
@Component({
  components: {
    Slider
  }
})
export default class Index extends Vue {

}
</script>
