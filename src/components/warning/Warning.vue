<template lang="pug">
  .warningPage
    .selectBar
      .warningTypeBar
          h4.warningType(v-for="type in warningTypes") {{ type }}
      filterBar
</template>

<script>
  import Filterbar from './Filterbar.vue'
  export default {
    data () {
      return {
        warningTypes: ['全部警示', '連線狀態', '使用狀況', '生命週期', '硬體異常', '軟體異常', '定位防盜']
      }
    },
    components: {
      filterBar: Filterbar
    }
  }
</script>

<style lang="sass" scoped>
  *
    position: relative
  .warningPage
    .selectBar
      position: fixed
      top: 65px
      width: 100%
      .warningTypeBar
        display: flex
        padding: 10px
        padding-left: 30px
        width: 100%
        .warningType
          width: 100px
          margin: 0px
          font-weight: 700
</style>
