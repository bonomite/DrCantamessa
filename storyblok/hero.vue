<script setup>
import { ref, computed } from 'vue'
//import Storyblok from 'storyblok-js-client'
// const Api = new Storyblok({
//   accessToken: 'QIRAaXc7bUjk6LURNINMnwtt',
// })
// console.log(
//   'Storyblok',
//   new StoryblokClient({
//     accessToken: 'QIRAaXc7bUjk6LURNINMnwtt',
//   })
// )
//console.log('StoryblokClient', StoryblokClient)
//console.log('Api', Api)
//console.log('html', richTextResolver.render(props.title))
const props = defineProps({ blok: Object })
const title = computed(() => renderRichText(props.blok.title))
const bgImageUrl = `url(${props.blok.image})`
// console.log('bgImage', bgImage.value.filename)
// console.log('bgImageUrl', bgImageUrl)
// console.log('blok', props.blok)
</script>
<template>
  <div v-editable="blok" class="hero w-full p-8 text-center">
    <div class="content">
      <div v-html="title"></div>
      <p>{{ blok.text }}</p>
      <p>{{ blok.plain }}</p>
    </div>
  </div>
</template>

<style lang="scss">
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
