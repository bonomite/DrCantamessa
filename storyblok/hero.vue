<script setup>
import { ref, computed } from 'vue'

const props = defineProps({ blok: Object })
const title = computed(() => renderRichText(props.blok.title))
const image = props.blok.image
const bgImageUrl = `url(${image.filename})`
console.log('image', image)
console.log('bgImageUrl', bgImageUrl)
//console.log('blok', props.blok)
</script>
<template>
  <div v-editable="blok" class="hero w-full text-center">
    <div class="content">
      <div class="grid">
        <div class="col-4">
          <sb-image :src="image" size="427x0" />
        </div>
        <div class="col-8">
          <div v-html="title"></div>
          <p>{{ blok.text }}</p>
          <p>{{ blok.plain }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  background-image: v-bind(bgImageUrl);
  background-position: center;
  background-size: cover;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.85);
  }
  .content {
    color: white;
    position: relative;
    z-index: 2;
  }
}
</style>
