<template lang="pug">
  .storeWarningInfo
    filterBar
    .container(:style="filterMenuStyle")
      .leftBlock
        .row
          .warningListBlock.col-md-12.col-sm-9(v-for="(group, groupId) in groups")
            .floor(v-if="group.devices.length > 0")
              h3 {{group.name}}
            transition(name="fade")
              .warningListTable(v-if="group.devices.length > 0")
                .fields
                  .fieldName(v-for="field in fields")
                    p {{field}}
                    i.fa.fa-caret-down
                .warningDevice(v-for="(device, deviceId) in group.devices"
                @click="selectedDevice(groupId, deviceId)", :class="{selected: selectedStyle(groupId, deviceId)}")
                  .status.data
                    p {{manageStat(device.manageStat)}}
                  .location.data {{device.location}}
                  .deviceType.data {{device.deviceModel}}
                  .warnType.data {{device.errorType}}
                  .sourceType.data {{device.sourceType}}
                  .occurTime.data {{toDate(device.occurTime)}}
                  .finishTime.data {{toDate(device.finishTime)}}
                  .staff.data {{device.staff}}
    .detailBlock(:class="{open: detailOpen}")
      .head
        i(class="fa fa-desktop")
        i(class="fa fa-times", @click="detailOpen = false")
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
        .deviceMonitor(@click="toDeviceDetail(selectedDev.deviceModel)") 進入設備監控
</template>

<script>
import {warningDevice, warningDeviceTwo} from '../../data/warningDevice'
import {storeOneSysterm, storeOneClerk} from '../../data/warningDevice'
import {eventBus} from '../../main'
import FilterBar from './byDeviceFilter.vue'
import {errorReq} from '../../request/errorReport'
export default {
  data() {
    return {
      fields: ['處理狀態', '所在位置', '設備型號', '異常類別','通報類型', '發生時間',' 完成時間', '處理人員'],
      powerActions: ['開機', '重開機', '關機'],
      remoteActions: ['遠端桌面', '遠端CMD'],
      selectedDev: warningDevice.groups[0].devices[0],
      selectedId: {
        groupId: 0,
        deviceId: 0
      },
      filterMenuStyle: {},
      groups: [{
        name: 'POS 機',
        devices: []
      },{
        name: 'Touch-PC',
        devices: []
      }],
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
    },
    toDeviceDetail(device) {
      this.$router.push({path: `/device/detail/${device}`})
    },
    toDate(mileSecond) {
      if (mileSecond !== '-') {
        let date = new Date(mileSecond).toLocaleDateString().replace(/\//g, '-')
        let time = new Date(mileSecond).toLocaleTimeString().split(' ')[0]
        time = time.split(':')[0] + ':' + time.split(':')[1]
        return `${time} ${date}`
      } else {
        return '-'
      }
    }
  },
  mounted() {
    // loading warning data
    setTimeout(() => {
      errorReq(this).then((warnObj) => {
        this.groups[0].devices = warnObj.pos
        this.groups[1].devices = warnObj.touchPC
      })
    }, 200)

  },
  created () {
    // listen for change source type from warning Type bar
    eventBus.$on('selectWarnSourceType', (type) => {
      this.sourceType = type
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
  $colorDarkBlue: #2EA6E2
  *
    // border: solid 1px black
    position: relative
  .fade-enter-active, .fade-leave-active
    transition: opacity .5s
  .fade-enter, .fade-leave-to
    opacity: 0

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
      z-index: 700
      background-color: $colorWhite
      box-shadow: 0px 0px 3px rgba(black, 0.6)
      transition: 0.2s
      transform: translateX(250px)
      .head
        display: flex
        padding: 10px 10px
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
          margin-left: 30px
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
          padding: 5px 0px
          cursor: pointer
          background-color: $colorDarkBlue
          border-radius: 4px
          color: white
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
              h4
                left: 50%
                // transform: translateX(-50%)
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
                  background-color: $colorDarkBlue
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
