<script setup>
import { ref, computed, onMounted } from 'vue'
import { ShareNetwork } from 'vue-social-sharing'
import { copyToClipBoard, shareAPI, isMobileBrowser } from '~/utilities/helpers'
import { useToast } from 'primevue/usetoast'

const config = useRuntimeConfig()
const props = defineProps({
  story: {
    type: Object,
    default: {},
  },
})

//const emit = defineEmits(["change", "click"]);
//console.log('props.story', props.story)
const url = config.BASE_URL + props.story.full_slug
const title = props.story.content.title
const desc = props.story.content.description.content[0].content[0].text
const tags = props.story.tag_list

const shareMenu = ref()
const shareItems = ref([
  {
    label: 'Twitter',
    icon: 'pi pi-twitter',
    command: () => {
      var twitterShare = document.getElementsByClassName('twitterShareRef')
      twitterShare[0].click()
      console.log('twitter= ', twitterShare[0])
      //gaEvent('Click Tracking', 'Episode Share Tools', 'Twitter')
    },
  },
  {
    label: 'Facebook',
    icon: 'pi pi-facebook',
    command: () => {
      console.log('facebook')
      var facebookShare = document.getElementsByClassName('facebookShareRef')
      facebookShare[0].click()
      //gaEvent('Click Tracking', 'Episode Share Tools', 'Facebook')
    },
  },
  {
    label: 'Email',
    icon: 'pi pi-envelope',
    command: () => {
      console.log('email')
      var emailShare = document.getElementsByClassName('emailShareRef')
      emailShare[0].click()
      //gaEvent('Click Tracking', 'Episode Share Tools', 'Email')
    },
  },
  {
    label: 'Copy link',
    icon: 'pi pi-link',
    command: () => {
      shareAPI(
        {
          title: title,
          text: desc,
          url: url,
        },
        'Link copied to the clipboard'
      )
      //gaEvent('Click Tracking', 'Episode Share Tools', 'Copy link')
    },
  },
])
const toggleShare = (event) => {
  if (navigator.canShare && isMobileBrowser()) {
    shareAPI(
      {
        title: title,
        text: desc,
        url: url,
      },
      'Link copied to the clipboard'
    )
  } else {
    shareMenu.value.toggle(event)
  }
  //gaEvent('Click Tracking', 'Episode Tools', 'Share Menu')
}
// lifecycle hooks
onMounted(() => {})
</script>

<template>
  <div>
    <div class="article-social-share">
      <Button
        icon="pi pi-share-alt"
        class="p-button-rounded p-button-sm"
        @click="toggleShare"
        aria-haspopup="true"
        aria-controls="overlay_menu"
        aria-label="share"
        label="Share"
      />
      <Menu
        ref="shareMenu"
        :model="shareItems"
        :popup="true"
        class="episode-tools-menu"
      />
      <div class="hidden">
        <ShareNetwork
          class="facebookShareRef"
          network="facebook"
          :url="url"
          :title="title"
          :description="desc"
          :hashtags="tags.join()"
          >Share on Facebook</ShareNetwork
        >
        <ShareNetwork
          class="twitterShareRef"
          network="twitter"
          :url="url"
          :title="title"
          :description="desc"
          :hashtags="tags.join()"
          twitter-user="drcantamessa"
          >Share on Twitter</ShareNetwork
        >
        <ShareNetwork
          class="emailShareRef"
          network="email"
          :url="url"
          :title="title"
          :description="desc"
          :hashtags="tags.join()"
          >Share on Email</ShareNetwork
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.article-social-share {
  .p-button-sm {
    @include media('<sm') {
      font-size: 0.75rem;
    }
  }
}
</style>
