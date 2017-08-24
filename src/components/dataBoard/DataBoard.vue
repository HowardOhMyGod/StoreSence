<template lang="pug">
  .dataPage
    .topColorBlock
    filterBar
    .infoBlock
      .dataBlock
        .topBar
          h4.deviceType Touch-PC
          .icons
            i(class="fa fa-print")
            i(class="fa fa-download")
        .grath
          doughnut
        .statusBar
          .all.status
            i(class="fa fa-circle")
            p 總件數 : 5
          .notFinish.status
            i(class="fa fa-exclamation-triangle")
            p 未處理 : 5
          .processing.status
            i(class="fa fa-spinner")
            p 處理中 : 5
          .finish.status
            i(class="fa fa-check")
            p 已處理 : 5
        .dataTableBlock
          .detailTable
            h4.title 問題設備列表 - {{warnType}}
            .fieldBlock
              h5.field(v-for="field in deviceFields") {{field}}
            .deviceList(v-for="device in boardData.devices" @click="toDeviceDetail(device.deviceModel)")
              .devModel.data {{device.deviceModel}}
              .occurTime.data {{device.occurTime}}
              .location.data {{device.location}}
          .counterTable
            h4.title 門市異常次數
            .storeFieldBlock
              h5.storeField(v-for="field in storeFields") {{field}}
            .storeList(v-for="store in boardData.stores" @click="toWarnPage()")
              .store.sdata {{store.store}}
              .counter.sdata {{store.times}}
</template>

<script>
import dataFilterBar from './Filterbar.vue'
import Doughnut from './Doughnut.vue'
import {eventBus} from '../../main'
export default {
  data () {
    return {
      deviceFields: ['設備型號', '發生時間', '所在位置'],
      storeFields: ['店家', '發生次數'],
      boardData: {},
      warnType: ''
    }
  },
  methods: {
    toDeviceDetail(device) {
      this.$router.push({path: `/device/detail/${device}`})
    },
    toWarnPage() {
      this.$router.push({path: `/warning/device`})
    }
  },
  components: {
    filterBar: dataFilterBar,
    doughnut: Doughnut
  },
  created() {
    eventBus.$on('passData', (data, type) => {
      this.boardData = data
      this.warnType = type
    })
  }
}
</script>

<style lang="sass" scoped>
  $colorLightBlue: #27A3DF
  $colorWhite: #fff
  $colorBlue: #F0FAFC
  *
    // border: solid 1px black
    position: relative
  .dataPage
    top: 55px
    position: absolute
    width: calc(100% - 200px)
    padding: 20px 50px
    display: flex
    .infoBlock
      display: flex
      position: absolute
      width: 70%
      .dataBlock
        position: absolute
        width: 100%
        background-color: $colorWhite
        padding: 10px 25px
        padding-bottom: 20px
        margin-bottom: 20px
        box-shadow: 0px 0px 5px rgba(black, 0.4)
        .dataTableBlock
          // height: 300px
          display: flex
          margin-top: 30px
          .detailTable
            flex: 2
            margin-right: 30px
            padding: 15px 20px
            box-shadow: 0px 0px 3px rgba(black, 0.4)
            border-radius: 4px
            h4
              margin: 0px
              font-weight: 600
              margin-bottom: 15px
            .fieldBlock
              display: flex
              padding: 5px 5px
              margin-bottom: 10px
              h5
                width: 150px
                font-size: 15px
                font-weight: 600
                margin: 0px
            .deviceList:hover
              box-shadow: 0px 0px 2px rgba(black, 0.2)
              cursor: pointer
            .deviceList
              display: flex
              padding: 6px 5px
              border-top: solid 1px rgba(black, 0.1)
              .data
                width: 150px
            .deviceList:last-child
              border-bottom: solid 1px rgba(black, 0.1)
            .deviceList:nth-child(even)
              background-color: $colorBlue
          .counterTable
            flex: 1
            padding: 15px 20px
            box-shadow: 0px 0px 3px rgba(black, 0.4)
            border-radius: 4px
            h4
              margin: 0px
              font-weight: 600
              margin-bottom: 13px
            .storeList:hover
              box-shadow: 0px 0px 2px rgba(black, 0.2)
              cursor: pointer
            .storeList
              display: flex
              padding: 5px 5px
              border-top: solid 1px rgba(black, 0.1)
              .sdata
                flex: 1
            .storeList:nth-child(even)
              background-color: $colorBlue
            .storeList:last-child
              border-bottom: solid 1px rgba(black, 0.1)
            .storeFieldBlock
              display: flex
              padding: 5px 5px
              margin-bottom: 10px
              h5
                flex: 1
                margin: 0px
                font-size: 16px
                font-weight: 600
        .statusBar
          display: flex
          width: 490px
          left: 50%
          transform: translateX(-48%)
          .status
            display: flex
            margin-right: 20px
            i
              margin-right: 10px
              height: 20px
              font-size: 15px
              top: 4px
              color: $colorLightBlue
            p
              font-size: 15px
              font-weight: 600
        .grath
          height: 350px
          padding-top: 10px
        .topBar
          height: 40px
          display: flex
          padding: 8px 10px
          border-bottom: solid 1px rgba(black, 0.2)
          h4
            font-size: 17px
            margin: 0px
            font-weight: 600
            height: 20px
          .icons
            display: flex
            position: absolute
            right: 20px
            top: 5px
            i
              font-size: 24px
              margin-left: 20px
              color: $colorLightBlue
    .topColorBlock
      position: absolute
      background-color: $colorLightBlue
      width: 100%
      height: 190px
      margin: -20px -50px

</style>
