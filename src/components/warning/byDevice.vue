<template lang="pug">
  .storeWarningInfo
    filterBar
    .container(:style="filterMenuStyle")
      .leftBlock
        .row
          .warningListBlock.col-md-12.col-sm-9(v-for="(group, groupId) in groups")
            .floor
              h3 {{group.groupName}}
            .warningListTable
              .fields
                .fieldName(v-for="field in fields")
                  p {{field}}
                  i.fa.fa-caret-down
              .warningDevice(v-for="(device, deviceId) in group.devices"
              @click="selectedDevice(groupId, deviceId)", :class="{selected: selectedStyle(groupId, deviceId)}")
                .status.data
                  p {{manageStat(device.manageStat)}}
                .location.data 內湖門市
                .deviceType.data {{device.deviceModel}}
                .warnType.data {{device.errorType}}
                .sourceType.data {{device.sourceType}}
                .occurTime.data {{device.occurTime}}
                .finishTime.data 2017-3-20 10:05
                .staff.data 何智誠
    .detailBlock(:class="{open: detailOpen}")
      .head
        i(class="fa fa-arrow-right", @click="detailOpen = false")
        h4 {{selectedDev.deviceModel}}
      .body
        .deviceInfo
          h4 設備資訊
          p 設備類別 : {{selectedDev.deviceType}}
          p 設備型號 : {{selectedDev.deviceModel}}
          p 設備名稱 : {{selectedDev.deviceName}}
          p CPU使用率 : 20%
          p RAM使用率 : 30%
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
        .deviceMonitor 進入設備監控
</template>

<script>
import {warningDevice, warningDeviceTwo} from '../../data/warningDevice'
import {storeOneSysterm, storeOneClerk} from '../../data/warningDevice'
import {eventBus} from '../../main'
import FilterBar from './byDeviceFilter.vue'
export default {
  data() {
    return {
      fields: ['處理狀態', '所在位置', '設備型號', '異常類別','通報類型', '發生時間',' 完成時間', '處理人員'],
      powerActions: ['開機', '重開機', '關機'],
      remoteActions: ['遠端桌面', '遠端CMD'],
      originGroups: warningDevice.groups,
      groups: warningDevice.groups,
      selectedDev: warningDevice.groups[0].devices[0],
      selectedId: {
        groupId: 0,
        deviceId: 0
      },
      deviceMonitor: {
        cpu: 0,
        ram: 0
      },
      filterMenuStyle: {},
      sourceType: null,
      detailOpen: false
    }
  },
  components: {
    filterBar: FilterBar
  },
  methods: {
    manageStat(stat) {
      if (stat == '-1') {
        return '未處理'
      } else if (stat == '0') {
        return '處理中'
      } else if (stat == '1'){
        return '已處理'
      }
    },
    selectedDevice(groupId, deviceId) {
      this.selectedDev = this.groups[groupId].devices[deviceId]
      this.selectedId.deviceId = deviceId
      this.selectedId.groupId = groupId
      this.detailOpen = true
    },
    selectedStyle(groupId, deviceId) {
      if((deviceId == this.selectedId.deviceId) &&
      (groupId == this.selectedId.groupId)) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    setInterval(() => {
      this.deviceMonitor = {
        cpu: parseInt(Math.random() * 50),
        ram: parseInt(Math.random() * 50)
      }
    }, 800)

    // listen for change source type from warning Type bar
    eventBus.$on('selectWarnSourceType', (type) => {
      this.sourceType = type
      console.log(this.sourceType)
    })
  }
}
</script>

<style lang="sass" scoped>
  $colorGray: #F4F4F4
  $colorWhite: #fff
  $colorRed: #CC031C
  $colorYellow: #FFA60A
  $colorLightBlue: #2DB9F6
  *
    // border: solid 1px black
    position: relative

  .storeWarningInfo
    width: calc(100%)
    top: 30px
    z-index: 0
    .detailBlock.open
      transform: translateX(0px)
      transition: 0.2s
    .detailBlock
      position: fixed
      width: 230px
      height: 92vh
      background-color: #eee
      right: 0px
      top: 193px
      z-index: 1000
      background-color: $colorWhite
      box-shadow: 0px 0px 3px rgba(black, 0.6)
      transition: 0.2s
      transform: translateX(250px)
      .head
        display: flex
        padding: 10px 10px
        background-color: $colorYellow
        color: $colorWhite
        i
          height: 18px
          font-size: 20px
          vertical-align: top
          cursor: pointer
        h4
          vertical-align: top
          margin: 0px
          margin-left: 20px
          font-weight: 600
      .body
        padding: 10px 20px
        .deviceInfo, .remoteControl
          h4
            margin: 0px
            margin-top: 10px
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
          padding: 2px 0px
          border: solid 1px black
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


    .container
      margin: 0px
      padding: 0px
      width: 100%
      display: flex
      transition: 0.3s
      top: -40px
      .leftBlock
        position: absolute
        width: 100%
        background-color: grey
        .row
          background-color: $colorGray
          .deviceDetail
            position: fixed
            right: 2%
            width: 300px
            height: 100vh
          .warningListBlock
            padding: 10px 35px
            margin-bottom: -20px
            .fields, .warningDevice
              background-color: $colorWhite
              margin-bottom: 5px
              box-shadow: 0px 0px 6px rgba(black, 0.1)
            .floor
              padding: 10px 10px
              margin-bottom: 5px
              h3
                margin: 0px
                font-size: 20px
                font-weight: 600
            .warningDevice.selected
              box-shadow: 0px 0px 5px rgba(black, 0.7)
            .warningDevice
              display: flex
              padding: 10px 10px
              &:hover
                cursor: pointer
              .data
                width: 130px
                margin: 0px
              .status
                p
                  padding: 2px 10px
                  display: inline-block
                  margin: 0px
                  font-size: 14px
                  background-color: $colorRed
                  border-radius: 4px
                  color: $colorWhite
            .warningListTable
              // border: solid 2px black
              padding: 10px 15px
              // background-color: $colorWhite
              .fields
                display: flex
                padding: 5px 10px
                background-color: $colorWhite
                .fieldName
                  display: flex
                  width: 130px
                  align-items: center
                  font-weight: 600
                  p
                    letter-spacing: 2px
                    margin-right: 10px
                    top: 5px
</style>
