<script setup>
import { ref, computed, onMounted, onBeforeMount, reactive } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import breakpoint from 'primevue-designer/src/assets/themes/drcantamessa/viva-light/breakpoints.module.scss'
import ProgressSpinner from 'primevue/progressspinner'
const props = defineProps({
  src: {
    type: Object,
    default: null,
  },
  loading: {
    type: String,
    default: 'lazy',
  },
  options: {
    type: String,
    default: '',
  },
  sizes: {
    type: Array,
    default() {
      return [2, 3]
    },
  },
})
const imageRef = ref(false)
const ready = ref(props.options ? true : false)
const loaded = ref(false)
let transformedUrl = null
let transformedUrlToken = null

const isXs = useMediaQuery(`(max-width: ${breakpoint.xs}px`)
const isSm = useMediaQuery(`(max-width: ${breakpoint.sm}px`)
const isMd = useMediaQuery(`(max-width: ${breakpoint.md}px`)
const isLg = useMediaQuery(`(max-width: ${breakpoint.lg}px`)
const isXl = useMediaQuery(`(max-width: ${breakpoint.xl}px`)
const isXxl = useMediaQuery(`(max-width: ${breakpoint.xxl}px`)
const isXxxl = useMediaQuery(`(max-width: ${breakpoint.xxxl}px`)

const maxWidth = computed(() => {
  const str = props.src.filename.split('/')[5]
  return str.split('x')[0]
})
const maxHeight = computed(() => {
  const str = props.src.filename.split('/')[5]
  return str.split('x')[1]
})

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

const transformUrl = () => {
  const image = props.src.filename
  const option = props.options || `${getResponsiveSize.value}x0`
  if (!image) return ''
  transformedUrl = `${image}/m/${option}`
  transformedUrlToken = transformedUrl.replace(
    transformedUrl.split('/')[9].split('x')[0],
    '%TOKEN-WIDTH%'
  )
  console.log('image= ', `${image}/m/${option}`)
  console.log('transformedUrlToken= ', transformedUrlToken)
  return transformedUrl
}

const handleImageLoad = () => {
  imageRef.value.removeEventListener('load', handleImageLoad)
  loaded.value = true
}

const srcset = () => {
  const template = transformedUrlToken
  const responsiveWidth = Number(getResponsiveSize.value)
  const optionsWidth = Number(props.options.split('x')[0])
  const theWidth = props.options ? optionsWidth : responsiveWidth
  if (template && props.sizes) {
    let srcset = ''
    let lastImage = false
    for (const size of props.sizes) {
      /* continue if it is NOT the lastImage and the image has more pixels than its rendered area */
      if (!lastImage && maxWidth.value > theWidth) {
        let width = Math.round(theWidth * size)
        let height = Math.round(props.height * size)

        /* the image no longer has enough resolution to support the next srcset, use its maximum size and make it the last on the srcset list */
        if (width > maxWidth.value || height > maxHeight.value) {
          //height = Math.round((height / width) * maxWidth.value)
          height = maxHeight.value
          width = maxWidth.value
          lastImage = true
        }
        //if we are on the last size in the array set lastImage to true
        if (props.sizes.length - 1 === props.sizes.indexOf(size)) {
          lastImage = true
        }
        const url = template.replace('%TOKEN-WIDTH%', width)
        srcset += `${url} ${size}x${!lastImage ? ',' : ''} `
      }
    }
    console.log('srcset -= ', srcset)
    return srcset
  } else {
    return undefined
  }
}

// lifecycle hooks
onMounted(() => {
  ready.value = true
  nextTick(() => imageRef.value.addEventListener('load', handleImageLoad()))
})
</script>

<template>
  <div class="sb-image">
    <div
      v-if="!ready && !loaded"
      class="loading-indication"
      :style="`aspect-ratio: ${maxWidth} / ${maxHeight}`"
    >
      <ProgressSpinner />
    </div>
    <img
      v-else
      ref="imageRef"
      class="image"
      :style="`aspect-ratio: ${maxWidth} / ${maxHeight}`"
      :src="transformUrl()"
      :srcset="srcset()"
      :alt="props.src.alt"
      :loading="props.loading"
    />
  </div>
</template>

<style lang="scss">
.sb-image {
  width: 100%;
  height: auto;
  .loading-indication {
    width: 100%;
    height: auto;
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .image {
    width: 100%;
    height: auto;
  }
}
</style>
