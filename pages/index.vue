<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
//   propVar: {
//     type: Boolean,
//     default: false,
//   },
});

//const emit = defineEmits(["change", "click"]);

// lifecycle hooks
onMounted(() => {

});
</script>

<template>
  <div>  
    <div class="comp-name">
        Index page
    </div>
  </div>
</template>

<style lang="scss">
.comp-name{

}
</style>
