<script setup>
const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
})

const isVertical = ref(props.blok.vertical)
const isPlaying = ref(false)
const desc = computed(() => renderRichText(props.blok.description))
const caption = computed(() => renderRichText(props.blok.caption))
</script>
<template>
  <div
    v-if="blok"
    v-editable="blok"
    class="blok video-blok mb-3 flex"
    :class="[{ vertical: isVertical }]"
  >
    <div class="col-12 md:col-10 lg:col-8 xl:col-6 mx-auto">
      <h3>{{ blok.title }}</h3>
      <div class="title mb-3" v-html="desc" />
      <div
        v-if="blok.poster_If_Not_AutoPlay && !blok.autoplay && !isPlaying"
        class="poster"
        @click="isPlaying = true"
      >
        <sb-image :src="blok.poster_If_Not_AutoPlay" />
      </div>
      <video
        v-else
        :controls="blok.controls"
        autoplay
        :muted="blok.autoplay"
        :loop="blok.loop"
        class="video"
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
  }
  .poster {
    cursor: pointer;
    position: relative;
    display: block;
    &:after {
      content: '';
      box-sizing: border-box;
      width: 34px;
      height: 34px;
      border-style: solid;
      border-width: 20px 0px 20px 40px;
      border-color: transparent transparent transparent #ffffff;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
    &:before {
      content: '';
      box-sizing: border-box;
      width: 34px;
      height: 34px;
      border-style: solid;
      border-width: 32px 0px 32px 55px;
      border-color: transparent transparent transparent var(--primary-color);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
  }
  .caption {
    font-size: 0.75rem;
    color: var(--text-color-secondary);
  }
  &.vertical {
    .video {
      max-width: 364px;
      margin: auto;
      aspect-ratio: 9 / 16;
    }
    .caption {
      max-width: 364px;
      margin: auto;
    }
  }
}
</style>
