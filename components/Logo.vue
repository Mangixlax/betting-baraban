<template>
  <NuxtLink
    :to="{ name: 'index' }"
    :class="$style['link']"
    title="ПроНовостройки"
  >
    <svg-icon name="logo" :class="$style['logo']"> </svg-icon>
  </NuxtLink>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component
export default class Logo extends Vue {}
</script>

<style lang="sass" module>
.link
  display: flex
  text-decoration: none
  align-items: center

.logo
  width: 26px
  height: 37px
</style>
