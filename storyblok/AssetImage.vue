<script setup>
const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
})

const isEnlarge = ref(props.blok.enlarge)
const isFullWidth = ref(props.blok.full_width)
const desc = computed(() => renderRichText(props.blok.description))
const caption = computed(() => renderRichText(props.blok.caption))
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
      <sb-image :src="blok.image" :preview="isEnlarge" />
      <div class="caption" v-html="caption"></div>
    </div>
  </div>
</template>
