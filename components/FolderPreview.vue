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
      v-if="articles"
      class="folder-preview"
      v-for="(article, index) in articles.stories"
    >
      <div v-if="!article.is_startpage && article.parent_id > 0">
        name = {{ article.name }} {{ article.parent_id }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.folder-preview {
}
</style>
