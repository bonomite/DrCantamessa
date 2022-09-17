<script setup>
import { ref, computed, onMounted } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'
const currentBreakpoint = useCurrentBreakpoint()
const props = defineProps({
  src: {
    type: Object,
    default: null,
  },
  loading: {
    type: String,
    default: 'lazy',
  },
  size: {
    type: String,
    default: '',
  },
  quality: {
    type: Number,
    default: 70,
  },
  greyscale: {
    type: Boolean,
    default: false,
  },
  density: {
    type: Array,
    default() {
      return [2, 3]
    },
  },
})
const imageRef = ref(false)
const ready = ref(props.size ? true : false)
const focusPoint = props.src.focus
let transformedUrl = null
let transformedUrlToken = null

const maxWidth = computed(() => {
  const str = props.src.filename.split('/')[5]
  return str.split('x')[0]
})
const maxHeight = computed(() => {
  const str = props.src.filename.split('/')[5]
  return str.split('x')[1]
})
const sizeWidth = Number(props.size ? props.size.split('x')[0] : maxWidth.value)
const sizeHeight = Number(
  props.size ? props.size.split('x')[1] : maxHeight.value
)

const transformUrl = () => {
  const image = props.src.filename
  const size = props.size || `${currentBreakpoint.value}x0`
  const quality = props.quality
  const grey = props.greyscale
  if (!image) return ''
  transformedUrl = `${image}/m/${size}/filters:format(webp):quality(${quality})${
    grey ? ':grayscale()' : ''
  }${focusPoint ? `:focal(${focusPoint})` : ''}`
  // add width token
  const transformedUrlTokenW = transformedUrl.replace(
    transformedUrl.split('/')[9].split('x')[0],
    'TOKENWIDTH'
  )
  // add height token
  transformedUrlToken = transformedUrlTokenW.replace(
    transformedUrl.split('/')[9].split('x')[1],
    'TOKENHEIGHT'
  )
  return transformedUrl
}

const srcset = () => {
  const template = transformedUrlToken
  const responsiveWidth = Number(currentBreakpoint.value)
  const theWidth = props.size ? sizeWidth : responsiveWidth
  const theHeight = props.size ? sizeHeight : 0
  if (template && props.density) {
    let srcset = ''
    let lastImage = false
    for (const densitySize of props.density) {
      /* continue if it is NOT the lastImage and the image has more pixels than its rendered area */
      if (!lastImage && maxWidth.value > theWidth) {
        let width = Math.round(theWidth * densitySize)
        let height = Math.round(theHeight * densitySize)

        /* the image no longer has enough resolution to support the next srcset, use its maximum size and make it the last on the srcset list */
        if (width > maxWidth.value || height > maxHeight.value) {
          lastImage = true
        }
        //if we are on the last size in the array set lastImage to true
        if (props.density.length - 1 === props.density.indexOf(densitySize)) {
          lastImage = true
        }
        const url = template
          .replace('TOKENWIDTH', width)
          .replace('TOKENHEIGHT', height)
          //remove original qaulity filter
          .replace(`:quality(${props.quality})`, '')
        // lower the quasliy for the larger images
        const quality = props.quality - (densitySize - 1) * 5
        srcset += `${url}:quality(${quality}) ${densitySize}x${
          !lastImage ? ',' : ''
        } `
      }
    }
    //console.log('srcset -= ', srcset)
    return srcset
  } else {
    return undefined
  }
}
// lifecycle hooks
onMounted(() => {
  ready.value = true
})
</script>

<template>
  <div class="sb-image">
    <div
      v-if="!ready"
      class="loading-indication"
      :style="`aspect-ratio: ${sizeWidth} / ${sizeHeight};`"
    >
      <ProgressSpinner
        strokeWidth="8"
        animationDuration=".5s"
        style="height: 80%"
      />
    </div>
    <img
      v-else
      ref="imageRef"
      class="image"
      :style="`aspect-ratio: ${sizeWidth} / ${sizeHeight};`"
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
    display: block;
    width: 100%;
    height: auto;
  }
}
</style>
