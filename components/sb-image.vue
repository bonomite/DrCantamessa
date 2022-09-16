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
//const loaded = ref(false)
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

const transformUrl = () => {
  const image = props.src.filename
  const option = props.options || `${currentBreakpoint.value}x0`
  if (!image) return ''
  transformedUrl = `${image}/m/${option}`
  transformedUrlToken = transformedUrl.replace(
    transformedUrl.split('/')[9].split('x')[0],
    '%TOKEN-WIDTH%'
  )
  //console.log('image= ', `${image}/m/${option}`)
  //console.log('transformedUrlToken= ', transformedUrlToken)
  return transformedUrl
}

// const handleImageLoad = () => {
//   imageRef.value.removeEventListener('load', handleImageLoad)
//   loaded.value = true
// }

const srcset = () => {
  const template = transformedUrlToken
  const responsiveWidth = Number(currentBreakpoint.value)
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
    //console.log('srcset -= ', srcset)
    return srcset
  } else {
    return undefined
  }
}
// lifecycle hooks
onMounted(() => {
  ready.value = true
  //console.log('imageRef.value = ', imageRef.value)
  // nextTick(() => {
  //   console.log('AFTER imageRef.value = ', imageRef.value)
  //   imageRef.value.addEventListener('load', handleImageLoad())
  // })
})
</script>

<template>
  <div class="sb-image">
    <div
      v-if="!ready"
      class="loading-indication"
      :style="`aspect-ratio: ${maxWidth} / ${maxHeight}`"
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
    display: block;
    width: 100%;
    height: auto;
  }
}
</style>
