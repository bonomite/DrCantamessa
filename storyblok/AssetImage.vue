<script setup>
import { useGlobalMaxContentWidth } from '@/composables/states'
const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
})
const globalMaxContentWidth = useGlobalMaxContentWidth()

const isEnlarge = ref(props.blok.enlarge)
const isFullWidth = ref(props.blok.full_width)
const desc = computed(() => renderRichText(props.blok.description))
const caption = computed(() => renderRichText(props.blok.caption))
const width = computed(() => props.blok.width)
const height = computed(() => props.blok.height)
</script>
<template>
  <div
    v-if="blok"
    v-editable="blok"
    class="blok image-blok mb-3 flex flex-column"
  >
    <div class="col-12 md:col-10 lg:col-8 xl:col-6 mx-auto">
      <h3>{{ blok.title }}</h3>
      <div class="title mb-1" v-html="desc" />
    </div>
    <div
      :class="
        isFullWidth ? 'col-12' : 'col-12 md:col-10 lg:col-8 xl:col-6 mx-auto'
      "
    >
      <sb-image
        :src="blok.image"
        :preview="isEnlarge"
        :size="
          isFullWidth
            ? null
            : `${width || globalMaxContentWidth}x${height || 0}`
        "
      />
      <div class="caption" v-html="caption"></div>
    </div>
  </div>
</template>
