<template lang="pug">
  .byWarnInfo
    byWarnFilter
    router-view
</template>

<script>
import byWarnFilter from './byWarnFilter.vue'
export default {
  components: {
    byWarnFilter
  }
}
</script>

<style lang="sass">
  .byWarnInfo
    // height: 1200px
</style>
