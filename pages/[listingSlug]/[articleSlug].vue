<script setup lang="ts">
import { computed } from 'vue'
import { formatDate } from '~/utilities/helpers.js'
const route = useRoute()
const story = await useAsyncStoryblok(route.fullPath, { version: 'published' })
//console.log('story = ', story.value)
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

//console.log('story = ', story)
</script>

<template>
  <div>
    <Head>
      <Link rel="canonical" v-if="story" :href="story.url" />
      <Meta name="og:title" v-if="story" :content="story.content.title" />
      <Meta
        name="og:description"
        v-if="story"
        :content="story.content.description.content[0].content[0].text"
      />
      <Meta
        name="og:image"
        v-if="story"
        :content="story.content.poster.filename"
      />
    </Head>
    <section class="article-page">
      <div class="content">
        <div class="grid justify-content-center">
          <div class="col-12 lg:col-6">
            <EmbedComp v-if="embed" :code="embed" class="embed" />
            <video
              v-else-if="video.filename"
              controls
              autoplay
              muted
              loop
              class="video"
            >
              <source :src="video.filename" type="video/mp4" />
            </video>
            <sb-image v-else :src="poster" size="786x442" class="poster" />
          </div>
          <div class="col-12 lg:col-6 flex flex-column justify-content-between">
            <div>
              <!-- <ArticleSocialShare :story="story" class="text-right" /> -->
              <h1 class="text-primary mb-2">
                {{ story.content.title }}
              </h1>
              <MyTag :article="story" />
              <p v-if="patientName" class="p-small">
                Patient name: {{ patientName }}
              </p>
              <p v-if="performedBy" class="p-small">
                Performed by: {{ performedBy }}
              </p>
              <div v-if="description" v-html="description" class="mt-2" />
            </div>
            <div class="mt-2 flex justify-content-between">
              <div>
                <p class="p-small">Published: {{ date }}</p>
                <p v-if="date !== dateUpdated" class="p-small">
                  Updated: {{ dateUpdated }}
                </p>
              </div>
              <ArticleSocialShare :story="story" class="text-right" />
            </div>
          </div>
          <div class="col-12">
            <divider class="my-4" />

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
