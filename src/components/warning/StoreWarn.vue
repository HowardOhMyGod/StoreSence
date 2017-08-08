<template lang="pug">
  .storeWarningInfo
    .container
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
                .occurTime.data {{device.occurTime}}
                .warnType.data {{device.errorType}}
                .deviceName.data {{device.deviceName}}
                .deviceType.data {{device.deviceType}}
      .rightBlock
        .row
          .deviceDetailInfo.col-md-12
            .headBar
              i(class="fa fa-arrow-right")
              h3 {{selectedDev.deviceName}}
            .bodyBar
              .deviceInfo
                h4 設備資訊 - {{selectedDev.errorType}}
                p CPU使用率: {{device.cpu}} %
                p 記憶體使用率: {{device.ram}} %
              .control
                h4 遠端操作
                .power
                  h5 電源管理
                  select
                    option(value='' v-for="power in powerActions") {{power}}
                .remote
                  h5 遠端控制
                  select
                    option(:value='remote' v-for="remote in remoteActions") {{remote}}
              .detailMonitor
                p 進入設備監控
</template>

<script>
import {warningDevice} from '../../data/warningDevice'
export default {
  data() {
    return {
      fields: ['處理狀態', '發生時間', '異常類別', '設備名稱', '設備類型'],
      powerActions: ['開機', '重開機', '關機'],
      remoteActions: ['遠端桌面', '遠端CMD'],
      groups: warningDevice.groups,
      selectedDev: warningDevice.groups[0].devices[0],
      selectedId: {
        groupId: 0,
        deviceId: 0
      },
      device: {
        cpu: 0,
        ram: 0
      }
    }
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
      this.device = {
        cpu: parseInt(Math.random() * 50),
        ram: parseInt(Math.random() * 50)
      }
      console.log('Time')
    }, 800)
  }
}
</script>

<style lang="sass" scoped>
  $colorGray: #F4F4F4
  $colorWhite: #fff
  $colorRed: #CC031C
  $colorYellow: #FFA60A
  *
    // border: solid 1px black
    position: relative

  .storeWarningInfo
    width: calc(100%)
    top: 30px
    z-index: 0
    .container
      margin: 0px
      width: 100%
      display: flex
      .rightBlock
        position: fixed
        width: 250px
        right: 5%
        .row
          .deviceDetailInfo
            padding: 0px
            padding-bottom: 10px
            margin-top: 10px
            background-color: $colorWhite
            box-shadow: 0px 0px 8px rgba(black, 0.1)
            .bodyBar
              padding: 0px 30px
              margin-top: 20px
              .deviceInfo
                h4
                  font-weight: 600
                  font-size: 20px
                  padding-bottom: 10px
                  border-bottom: solid 1px black
                p
                  letter-spacing: 1px
              .detailMonitor
                margin-top: 10px
                p
                  font-size: 18px
                  border: solid 1px black
                  text-align: center
              .control
                margin-top: 20px
                h4
                  font-weight: 600
                  font-size: 20px
                  padding-bottom: 10px
                  border-bottom: solid 1px black
                .power, .remote
                  h5
                    font-size: 18px
                  select
                    width: 100%
                    height: 30px

            .headBar
              display: flex
              align-items: center
              padding: 10px 15px
              background-color: $colorYellow
              i
                font-size: 20px
                margin-right: 20px
              h3
                margin: 0px
                font-size: 18px
                font-weight: 600
      .leftBlock
        position: absolute
        width: 70%
        background-color: grey
        .row
          background-color: $colorGray
          .deviceDetail
            position: fixed
            right: 2%
            width: 300px
            height: 100vh

          .warningListBlock
            padding: 10px 60px
            .floor, .fields, .warningDevice
              background-color: $colorWhite
              margin-bottom: 5px
              box-shadow: 0px 0px 6px rgba(black, 0.1)
            .floor
              padding: 10px 15px
              h3
                margin: 0px
                font-size: 20px
                font-weight: 600
            .warningDevice.selected
              box-shadow: 0px 0px 10px rgba(black, 0.4)
            .warningDevice
              display: flex
              padding: 10px 10px
              &:hover
                cursor: pointer
              .data
                width: 160px
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
              .fields
                display: flex
                padding: 5px 10px
                background-color: $colorWhite
                .fieldName
                  display: flex
                  width: 160px
                  align-items: center
                  font-weight: 600
                  p
                    letter-spacing: 2px
                    margin-right: 20px
                    top: 5px
</style>
