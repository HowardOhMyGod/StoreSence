<template lang="pug">
  .warningPage
    .selectBarBlock
      .selectBar
        .warningTypeBar
            h4.warningType(v-for="type in warningTypes") {{ type }}
            .searchBar
              i(class="fa fa-search" aria-hidden="true" )
              input(type="text" placeholder="收尋")#searchStore
        hr
        filterBar
    <router-view></router-view>
</template>

<script>
  import Filterbar from './Filterbar.vue'
  export default {
    data () {
      return {
        warningTypes: ['全部警示', '系統偵測', '店員通報']
      }
    },
    components: {
      filterBar: Filterbar
    }
  }
</script>

<style lang="sass" scoped>
  $colorGray: #F4F4F4
  $colorWhite: #fff
  *
    position: relative
    // border: solid 1px black
  hr
    margin: 0px
    padding: 0px
  .warningPage
    position: absolute
    width: calc(100% - 200px)
    height: 100%
    background-color: $colorGray
    .selectBarBlock
      height: 200px
      width: 100%
      z-index: 500
      .selectBar
        position: fixed
        top: 55.56px
        width: 100%
        .warningTypeBar
          display: flex
          padding: 10px 10px
          padding-left: 30px
          width: 100%
          background-color: $colorWhite
          .searchBar
            margin: 0px
            border: solid 1px black
            bottom: 6px
            padding: 2px 0px
            padding-left: 5px
            position: absolute
            right: 17%
            border-radius: 5px
            i
              font-size: 16px
              top: 1px
              margin-right: 2px
            input
              padding: 0px 3px
              vertical-align: top
              border: none
          .warningType
            width: 100px
            margin: 0px
            font-weight: 700
            // border: solid 1px black
            height: 20px


</style>
