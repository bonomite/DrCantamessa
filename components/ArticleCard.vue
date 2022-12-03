<script setup>
import { formatDate } from '~/utilities/helpers.js'
const props = defineProps({
  article: {
    type: Object,
    default: null,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
})

const desc = computed(() => renderRichText(props.article.content.description))
//console.log('article = ', props.article)
</script>

<template>
  <div>
    <div
      class="article-card flex flex-row relative grid mb-4 md:mb-6"
      :class="[{ featured: props.featured }]"
    >
      <nuxt-link
        :to="article.full_slug"
        :class="props.featured ? 'col-12 lg:col-8' : 'col-3'"
      >
        <sb-image
          :src="article.content.poster"
          :size="props.featured ? '' : '215x215'"
        />
        <!-- <nuxt-img
          format="webp"
          width="16"
          :height="props.featured ? '10' : '16'"
          :sizes="
            props.featured
              ? 'sm:326px md:703px lg:901px'
              : 'sm:116px md:186px lg:224px xl:290'
          "
          :src="article.content.poster.filename"
          style="width: 100%; height: auto"
        /> -->
      </nuxt-link>
      <div
        class="info flex flex-column justify-content-between"
        :class="props.featured ? 'col-12 lg:col-4 p-5' : 'col-9'"
      >
        <div>
          <nuxt-link class="title-link" :to="article.full_slug">
            <h5 class="title">{{ article.name }}</h5>
          </nuxt-link>
          <div class="tags flex flex-row gap-2 mb-2">
            <Tag
              v-for="(tag, index) in article.content.tag"
              :key="tag"
              :value="tag"
              :aria-label="`${tag} Tag`"
              :tabindex="index"
              rounded
            />
          </div>
          <div
            class="desc truncate"
            :class="props.featured ? '' : 'hide-on-mobile'"
            v-html="desc"
          />
          <!-- {{ props.article.content.description.content[0].content[0].text }} -->
          <!-- </div> -->
        </div>
        <div class="date">
          <p>Published: {{ formatDate(article.first_published_at) }}</p>
          <p v-if="article.first_published_at !== article.published_at">
            Updated: {{ formatDate(article.published_at) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.article-card {
  .title-link {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
    .title {
      margin-bottom: 0.5rem;
      @include media('<md') {
        font-size: 1.1em;
      }
    }
  }
  .tags .p-tag {
    background: var(--surface-border);
    text-transform: uppercase;
    font-size: 0.6em;
    color: var(--text-color-secondary);
    .p-tag-vale {
      line-height: 0.5rem;
    }
  }
  .desc {
    -webkit-line-clamp: 2;
    @include media('<md') {
      font-size: 0.85rem;
    }
    &.hide-on-mobile {
      @include media('<sm') {
        display: none;
      }
    }
  }
  .date {
    padding-top: 1rem;
    font-size: 0.75rem;
    color: var(--text-color-secondary);
    @include media('<sm') {
      padding-top: 0.25rem;
    }
  }
  &.featured {
    box-shadow: 0px 0px 24px rgb(0 0 0 / 20%);
    background: #ffffff;
    .title {
      margin-bottom: 0.5rem;
      @include media('<md') {
        font-size: 1.5em;
      }
    }
    .desc {
      -webkit-line-clamp: 10;
      @include media('<md') {
        font-size: 1rem;
      }
    }
  }
}
</style>
