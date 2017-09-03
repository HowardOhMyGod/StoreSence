<template lang="pug">
.detailBlock(:class="{open: detailOpen}")
  .head
    i(class="fa fa-desktop")
    i(class="fa fa-times", @click="detailOpen = false")
    h4 {{$route.params.device}}
  .body
    .deviceInfo
      h4 設備資訊
      //- p 設備類別 : {{deviceDetail.deviceType}}
      p 設備型號 : {{$route.params.device}}
      p 設備編號 : {{deviceDetail.deviceNum}}
      p 設備名稱 : {{deviceDetail.deviceName}}
      p CPU使用率 : 50
      p RAM使用率 : 20
    .remoteControl
      h4 遠端操作
      .powerActions
        p 電源管理
        select
          option(v-for="option in powerActions") {{option}}
      .remoteActions
        p 遠端控制
        select
          option(v-for="option in remoteActions") {{option}}
    .deviceMonitor(@click="navigateDevMonitor") 進入設備監控
</template>

<script>
import {eventBus} from '../../main'
export default {
  data() {
    return {
      powerActions: ['開機', '重開機', '關機'],
      remoteActions: ['遠端桌面', '遠端CMD'],
      deviceDetail: {},
      detailOpen: false
    }
  },
  methods: {
    navigateDevMonitor() {
        this.$router.push({
          path: `/device/detail/${this.$route.params.device}_${this.deviceDetail.deviceNum}`
        })
    }
  },
  created() {
    // listen for open
    let vue = this
    eventBus.$on('openControl', (deviceDetail) => {
      vue.deviceDetail = deviceDetail
      vue.detailOpen = true
    })
  }
}
</script>

<style lang="sass" scoped>
  $tableWidth: 130px
  $colorWhite: #fff
  $colorBlue: #F0FAFC
  $borderColor: rgba(black, 0.1)
  $colorDarkBlue: #2EA6E2

  .detailBlock.open
    transform: translateX(0px)
    transition: 0.2s
  .detailBlock
    position: fixed
    width: 230px
    height: 90vh
    background-color: #eee
    right: 0px
    top: 196px
    z-index: 1000
    background-color: $colorWhite
    box-shadow: 0px 0px 8px rgba(black, 0.6)
    transition: 0.2s
    transform: translateX(230px)
    .head
      display: flex
      padding: 10px 15px
      // background-color: $colorDarkBlue
      // color: $colorWhite
      i
        height: 18px
        font-size: 20px
        vertical-align: top
        cursor: pointer
      .fa-times
        position: absolute
        right: 15px
        top: 8px
        font-size: 16px
      .fa-desktop
        left: 10px
      h4
        vertical-align: top
        margin: 0px
        margin-left: 20px
        font-weight: 600
    .body
      padding: 5px 20px
      .deviceInfo, .remoteControl
        h4
          margin: 0px
          padding-bottom: 10px
          border-bottom: solid black 1px
          font-weight: 600
      .deviceInfo
        p
          margin: 0px
          margin-top: 6px
      .deviceMonitor
        text-align: center
        margin-top: 20px
        padding: 4px 0px
        cursor: pointer
        border-radius: 3px
        background-color: $colorDarkBlue
        color: white
      .deviceMonitor:hover
        box-shadow: 0px 0px 5px rgba(black, 0.7)
      .remoteControl
        margin-top: 15px
        .powerActions, .remoteActions
          margin: 0px
          margin-top: 6px
          select
            width: 100%
          p
            font-weight: 600
            margin-bottom: 5px
            font-size: 16px
</style>
