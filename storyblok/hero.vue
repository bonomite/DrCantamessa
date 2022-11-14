<script setup>
import { ref, computed } from 'vue'

const props = defineProps({ blok: Object })
const info = computed(() => renderRichText(props.blok.info))
const image = props.blok.image
const bgImage = props.blok.bgImage
const bgImageUrl = `url(${bgImage.filename})`
//console.log('image', image)
//console.log('bgImageUrl', bgImageUrl)
//console.log('blok', props.blok)
</script>
<template>
  <section v-editable="blok" class="hero w-full text-center">
    <div class="content p-0">
      <div class="grid align-items-center">
        <div class="col-12 md:col-4 px-4 md:px-2">
          <sb-image :src="image" size="427x0" />
        </div>
        <div class="col-12 pt-4 md:pt-2 md:col-8">
          <div v-html="info"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  background-image: v-bind(bgImageUrl);
  background-position: bottom;
  position: relative;
  background-repeat: no-repeat;
  background-size: contain;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    //background-color: rgba(0, 0, 0, 0.85);
  }

  .content {
    //color: white;
    position: relative;
    z-index: 2;
    .sb-image {
      background: #fff;
      border-radius: 50%;
      overflow: hidden;
      aspect-ratio: 1 / 1;
      border: 0.5rem solid var(--primary-color);
      box-shadow: 10px 10px 24px rgb(0 0 0 / 20%);
      //padding: 20px;
    }
  }
}
</style>
