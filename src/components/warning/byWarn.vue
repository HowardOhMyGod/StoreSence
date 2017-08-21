<template lang="pug">
  .byWarnInfo
    byWarnFilter
    transition(name="fade" mode="out-in" appear)
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
  .fade-enter-active, .fade-leave-active
    transition: opacity 0.3s
    // transition: transform 0.4s
  .fade-enter, .fade-leave-active
    opacity: 0
    // transform: translateX(-100%)

</style>
