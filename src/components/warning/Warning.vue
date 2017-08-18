<template lang="pug">
  .warningPage
    .selectBarBlock
      .selectBar
        .warningTypeBar
            h4.warningType(v-for="(type,id) in warningTypes",
            @click="selectWarnType(type, id)",
            :class="{selec: warnTypeSelClass(id)}") {{ type }}
            .searchBar
              i(class="fa fa-search" aria-hidden="true" )
              input(type="text" placeholder="收尋")#searchStore
        hr
    router-view
</template>

<script>
  import {eventBus} from '../../main'
  export default {
    data () {
      return {
        warningTypes: ['設備類型', '異常類別'],
        warningTypeSelected: ''
      }
    },
    methods: {
        selectWarnType(type, id) {
          if (type == '設備類型'){
            this.$router.push({path: '/warning/device'})
          } else if (type == '異常類別'){
            this.$router.push({path: '/warning/warnMsg/all'})
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
      .selectBar
        position: fixed
        top: 55px
        width: 100%
        transition: 0.3s
        height: 40px
        z-index: 1000
        // transform: translateY(-135px)
        .warningTypeBar
          display: flex
          padding: 10px 0px
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
            margin: 0px
            font-weight: 700
            height: 25px
            cursor: pointer
            margin-right: 20px
          .warningType.selec
            border-bottom: solid 2px #2EA6E2
            color: #2EA6E2


</style>
