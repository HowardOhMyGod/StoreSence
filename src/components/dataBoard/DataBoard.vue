<template lang="pug">
  .dataPage
    filterBar
</template>

<script>
import dataFilterBar from './Filterbar.vue'
export default {
  components: {
    filterBar: dataFilterBar
  }
}
</script>

<style lang="sass" scoped>
  *
    // border: solid 1px black
    position: relative
  .dataPage
    top: 55.56px
    position: absolute
    width: calc(100% - 200px)
    padding: 20px 50px

</style>
