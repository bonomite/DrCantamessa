<script setup>
//defineProps({ blok: Object })
const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
})

const isVertical = ref(props.blok.vertical)
const desc = computed(() => renderRichText(props.blok.description))
const caption = computed(() => renderRichText(props.blok.caption))
</script>
<template>
  <div v-if="blok" v-editable="blok" class="blok video-blok mb-3 flex">
    <div class="col-12 md:col-10 lg:col-8 xl:col-6 mx-auto">
      <h3>{{ blok.title }}</h3>
      <div class="title mb-3" v-html="desc" />
      <sb-image
        v-if="blok.poster_If_Not_AutoPlay && !blok.autoplay"
        :src="blok.poster_If_Not_AutoPlay"
      />
      <video
        v-else
        :controls="blok.controls"
        :autoplay="blok.autoplay"
        :muted="blok.autoplay"
        :loop="blok.loop"
        class="video"
        :class="[{ vertical: isVertical }]"
      >
        <source :src="blok.video.filename" type="video/mp4" />
      </video>
      <div class="caption" v-html="caption" />
    </div>
  </div>
</template>

<style lang="scss">
.video-blok {
  .title {
  }
  .video {
    position: relative;
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    &.vertical {
      aspect-ratio: 9 / 16;
    }
  }
  .caption {
    font-size: 0.75rem;
    color: var(--text-color-secondary);
  }
}
</style>
