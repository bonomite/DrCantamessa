<script setup>
import { watch, computed, onMounted, onBeforeMount } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import breakpoint from 'primevue-designer/src/assets/themes/drcantamessa/viva-light/breakpoints.module.scss'
const currentBreakpoint = useCurrentBreakpoint()

const isMounted = ref(false)

const isXs = useMediaQuery(`(max-width: ${breakpoint.xs}px`)
const isSm = useMediaQuery(`(max-width: ${breakpoint.sm}px`)
const isMd = useMediaQuery(`(max-width: ${breakpoint.md}px`)
const isLg = useMediaQuery(`(max-width: ${breakpoint.lg}px`)
const isXl = useMediaQuery(`(max-width: ${breakpoint.xl}px`)
const isXxl = useMediaQuery(`(max-width: ${breakpoint.xxl}px`)
const isXxxl = useMediaQuery(`(max-width: ${breakpoint.xxxl}px`)

const getResponsiveSize = computed(() => {
  return isXs.value
    ? breakpoint.xs
    : isSm.value
    ? breakpoint.sm
    : isMd.value
    ? breakpoint.md
    : isLg.value
    ? breakpoint.lg
    : isXl.value
    ? breakpoint.xl
    : isXxl.value
    ? breakpoint.xxl
    : isXxxl.value
    ? breakpoint.xxxl
    : breakpoint.xxxl
})

onMounted(() => {
  currentBreakpoint.value = getResponsiveSize.value
  localStorage.setItem('drCantamessaBreakpoint', getResponsiveSize.value)
  isMounted.value = true
})
watch([isXs, isSm, isMd, isLg, isXl, isXxl, isXxxl], () => {
  //console.log('breakpoint watch changed')
  if (isMounted.value) {
    currentBreakpoint.value = getResponsiveSize.value
    localStorage.setItem('drCantamessaBreakpoint', getResponsiveSize.value)
  }
})
</script>

<template>
  <!-- <div class="breakpoints" v-if="isMounted">size = {{ getResponsiveSize }}</div> -->
</template>
