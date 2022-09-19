<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
const config = useRuntimeConfig()
const props = defineProps({
  to: {
    type: String,
    default: null,
  },
})

const {
  data: articles,
  pending,
  error,
  refresh,
} = await useFetch(
  `https://api-us.storyblok.com/v2/cdn/stories/?starts_with=${props.to}&token=${config.STORYBLOK_API_KEY_PREVIEW}&version=published`,
  { key: `articles-${props.to}` }
)

// axios
//   .get(
//     `https://api-us.storyblok.com/v2/cdn/stories/?starts_with=${props.to}&token=${config.STORYBLOK_API_KEY_PREVIEW}&version=published`
//   )
//   .then(function (response) {
//     // handle success
//     console.log('AXIOS = ', response.data.stories)
//     articles.value = response.data.stories
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error)
//   })
//   .then(function () {
//     // always executed
//   })

// lifecycle hooks

onMounted(() => {})
console.log('articles = ', articles.value)
</script>

<template>
  <div>
    <div
      v-if="articles && articles.stories.length > 0"
      class="folder-preview"
      v-for="(article, index) in articles.stories"
    >
      <div v-if="article.name !== 'index'">name = {{ article.name }}</div>
    </div>
  </div>
</template>

<style lang="scss">
.folder-preview {
}
</style>
