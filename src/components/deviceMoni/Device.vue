<template lang="pug">
  .devicePage
    router-view
</template>

<script>
import processMoni from './deviceInfo/processMoni.vue'
export default {
  components: {
    processMoni
  }
}
</script>

<style lang="sass" scoped>
  *
    position: relative
  .devicePage
    width: calc(100% - 200px)
    position: absolute
    top: 55px
</style>
