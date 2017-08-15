<template lang="pug">
  .warningPage
    .selectBarBlock
      .selectBar(v-on:mouseover="mouseoverFilterMenu(1)", v-on:mouseleave="mouseoverFilterMenu(0)")
        .warningTypeBar
            h4.warningType(v-for="type in warningTypes",
            @click="selectWarnType(type, id)",
            :class="{selec: warnTypeSelClass(id)}") {{ type }}
            .searchBar
              i(class="fa fa-search" aria-hidden="true" )
              input(type="text" placeholder="收尋")#searchStore
        hr
        filterBar
    router-view
</template>

<script>
  import Filterbar from './Filterbar.vue'
  import {eventBus} from '../../main'
  export default {
    data () {
      return {
        warningTypes: ['全部警示', '系統偵測', '店員通報'],
        warningTypeSelected: ''
      }
    },
    components: {
      filterBar: Filterbar
    },
    methods: {
        mouseoverFilterMenu (status) {
          if (status == 1) {
            eventBus.warningFilterMenu(true)
          } else {
            eventBus.warningFilterMenu(false)
            }
        },
        selectWarnType(type, id) {
          if (type == '全部警示'){
            eventBus.selectWarnSourceType(null)
          } else if (type == '系統偵測'){
            eventBus.selectWarnSourceType('systerm')
          } else if (type == '店員通報'){
            eventBus.selectWarnSourceType('clerk')
          }

          this.warningTypeSelected = id
        },
        warnTypeSelClass (id) {
          if (this.warningTypeSelected == id) {
            return true
          } else {
            return false
          }
        }
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
      .selectBar:hover
        transform: translateY(0px)
      .selectBar
        position: fixed
        top: 55.56px
        width: 100%
        transition: 0.3s
        height: 80px
        // transform: translateY(-135px)
        .warningTypeBar
          display: flex
          padding: 10px 10px
          padding-left: 30px
          width: 100%
          background-color: $colorWhite
          z-index: 1000
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
            // border: solid 1px black
            margin: 0px
            font-weight: 700
            height: 25px
            cursor: pointer
            margin-right: 20px
            // padding-bottom: 10px
          .warningType.selec
            border-bottom: solid 2px #EC641D


</style>
