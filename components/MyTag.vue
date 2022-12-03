<script setup>
const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div v-if="article" class="my-tag">
    <div class="tags flex flex-row gap-2 mb-2">
      <Tag
        v-for="(tag, index) in props.article.content.tag"
        :key="tag"
        :value="tag"
        :aria-label="`${tag} Tag`"
        :tabindex="index"
        rounded
      />
    </div>
  </div>
</template>

<style lang="scss">
.my-tag {
  .tags .p-tag {
    background: var(--surface-border);
    text-transform: uppercase;
    font-size: 0.6em;
    color: var(--text-color-secondary);
    .p-tag-value {
      line-height: 0.5rem;
    }
  }
}
</style>
