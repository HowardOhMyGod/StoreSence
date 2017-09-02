<template lang="pug">
  .periInfoBlock
    .periTopBar
      h3 設備異常紀錄
    .warningListTable
      .fields
        .fieldName(v-for="field in fields")
          p {{field}}
          i.fa.fa-caret-down
      .warningDevice(v-for="device in warnList")
        .status.data
          p(:style="manageStatStyle(device.manageStat)") {{manageStat(device.manageStat)}}
        .location.data {{device.location}}
        .deviceType.data {{device.deviceModel}}
        .warnType.data {{device.errorType}}
        .sourceType.data {{device.sourceType}}
        .occurTime.data {{toDate(device.occurTime)}}
        .finishTime.data {{toDate(device.finishTime)}}
        .staff.data {{device.staff}}
</template>

<script>
import {errorReq, cpuDetect} from '../../../request/errorReport'
import {dateOperate} from '../../../mixin/dateMixin'
import {statOperate} from '../../../mixin/statMixin'
export default {
  mixins: [dateOperate, statOperate],
  data() {
    return {
      warnList: [],
      fields: ['處理狀態', '所在位置', '設備型號', '異常類別','通報類型', '發生時間',' 完成時間', '處理人員']
    }
  },
  mounted() {
    errorReq(this).then((warnObj) => {
      this.warnList = warnObj.touchPC
    })
  }
}
</script>

<style lang="sass" scoped>
  $colorWhite: #fff
  *
    // border: solid 1px black
  .periInfoBlock
    margin-top: 30px
    .warningListTable
      .warningDevice
        display: flex
        padding: 10px 10px
        background-color: white
        margin-top: 10px
        box-shadow: 0px 0px 3px rgba(black, 0.3)
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
            border-radius: 4px
            color: white
      .fields
        display: flex
        padding: 5px 10px
        background-color: $colorWhite
        box-shadow: 0px 0px 3px rgba(black, 0.3)
        .fieldName
          display: flex
          width: 130px
          align-items: center
          font-weight: 600
          p
            letter-spacing: 2px
            margin: 0px
            margin-right: 10px
            top: 5px
          i
            height: 10px
            vertical-align: top
    .periTopBar
      padding: 10px 15px
      box-shadow: 0px 0px 3px rgba(black, 0.3)
      background-color: $colorWhite
      margin-bottom: 8px
      h3
        margin: 0px
        font-size: 20px
        font-weight: 600
</style>
