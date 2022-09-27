<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'
import { formatDate } from '~/utilities/helpers.js'
const route = useRoute()
const story = await useAsyncStoryblok(route.fullPath, { version: 'published' })
console.log('story = ', story.value)
const description = computed(() =>
  renderRichText(story.value.content.description)
)
const date = computed(() => formatDate(story.value.first_published_at))
const dateUpdated = computed(() => formatDate(story.value.published_at))
const patientName = story.value.content.patient_name
const performedBy = story.value.content.performed_by

const poster = story.value.content.poster
const video = story.value.content.video
const embed = story.value.content.embedcode
// const {
//   data: articles,
//   pending,
//   error,
//   refresh,
// } = await useFetch(
//   `${config.STORYBLOK_API_URL}/stories/${route.fullPath}?token=${config.STORYBLOK_API_KEY_PREVIEW}&version=published`
// )

//console.log('articles = ', articles)
</script>

<template>
  <div>
    <Head>
      <Link rel="canonical" v-if="story" :href="story.url" />
    </Head>
    <section class="article-page">
      <div class="content">
        <div class="grid">
          <div class="col-12 lg:col-7">
            <EmbedComp v-if="embed" :code="embed" class="embed" />
            <video v-else-if="video" controls autoplay muted class="video">
              <source :src="video.filename" type="video/mp4" />
            </video>
            <sb-image
              v-else
              :src="story.content.poster"
              size="786x442"
              class="poster"
            />
          </div>
          <div class="col-12 lg:col-5 flex flex-column justify-content-between">
            <div>
              <h1 class="text-primary">{{ story.content.title }}</h1>
              <p v-if="patientName" class="p-small">
                Patient name: {{ patientName }}
              </p>
              <p v-if="performedBy" class="p-small">
                Performed by: {{ performedBy }}
              </p>
              <div v-if="description" v-html="description" class="mt-2" />
            </div>
            <div class="mt-2">
              <p class="p-small">Published: {{ date }}</p>
              <p v-if="date !== dateUpdated" class="p-small">
                Updated: {{ dateUpdated }}
              </p>
            </div>
          </div>
          <div class="col-12">
            <StoryblokComponent v-if="story" :blok="story.content" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.article-page {
  .embed {
  }
  .video {
    position: relative;
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
  }
  .poster {
  }
}
</style>
