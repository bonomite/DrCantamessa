<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  code: {
    type: String,
    default: null,
  },
})

const isYoutube = ref(props.code.includes('https://www.youtube.com/embed'))
</script>

<template>
  <div
    class="streamfield-embed"
    :class="[{ youtube: isYoutube }]"
    v-html="props.code"
  />
</template>

<style lang="scss">
.streamfield-embed {
  &.youtube {
    iframe {
      aspect-ratio: 16 / 9 !important;
      width: 100% !important;
      height: 100% !important;
    }
  }
  .twitter-tweet {
    max-width: 100% !important;
    @include media('<lg') {
      justify-content: center;
    }
    iframe {
      width: 550px !important;
      max-width: 100% !important;
      flex-grow: unset !important;
    }
  }
}
</style>
