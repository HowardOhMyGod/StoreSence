<template lang="pug">
  .warnMsgDetailInfo
    detailMenu
    .topbar
      .pageInfo(@click="backToMsg")
        i(class="fa fa-angle-left")
        h4.warnType 回上一頁
      h4.deviceType {{$route.params.device}} - {{$route.params.type}}
    .container
      .row
        .detailBlock.col-12-md
          .tableWraper
            .fieldBlock
              .field(v-for="field in fieldNames")
                h5.fieldName {{field}}
                i(class="fa fa-caret-down")
            .deviceList(v-for="errMsg in warnDetail.errorList")
              .status.data
                p(:style="manageStatStyle(errMsg.manageStat)") {{manageStat(errMsg.manageStat)}}
              .deviceModel.data {{$route.params.device}}
              .warnType.data {{$route.params.type}}
              .location.data {{errMsg.location}}
              .occurTime.data {{toDate(errMsg.occurTime)}}
              .finishTime.data {{toDate(errMsg.finishTime)}}
              .staff.data {{errMsg.staff}}
</template>

<script>
import detailMenu from '../detailMenu.vue'
// import {warnDetail} from '../../../data/warnMsgDetail'
import {eventBus} from '../../../main'
import {warnTypeDetail} from '../../../request/errorReport'
import {dateOperate} from '../../../mixin/dateMixin'
import {statOperate} from '../../../mixin/statMixin'

export default {
  mixins: [dateOperate, statOperate],
  data () {
    return {
      fieldNames: ['處理狀態', '設備型號',
      '異常類別', '所在位置',
      '發生時間', '完成時間', '處理人員'],
      warnDetail: {}
    }
  },
  methods: {
    backToMsg() {
      this.$router.push({path: '/warning/warnMsg/all'})
    },
    openControlMenu(deviceDetail){
      eventBus.openControlMenu(deviceDetail)
    }
  },
  components: {
    detailMenu
  },
  mounted() {
    warnTypeDetail(this, this.$route.params.type).then((res) => {
      this.warnDetail = res
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
  *
    // border: solid 1px black
    position: relative
  .warnMsgDetailInfo
    width: 100%
    top: 40px
    .topbar
      display: flex
      padding: 5px 30px
      h4
        font-weight: 600
      .pageInfo
        display: flex
        cursor: pointer
        h4
          margin-right: 30px
          font-weight: 600
        i
          font-size: 28px
          top: 4px
          margin-right: 10px

    .container
      padding: 0px 130px
      .row
        .detailBlock
          margin-left: -20px
          margin-top: 20px
          .tableWraper
            padding: 10px 20px
            padding-bottom: 20px
            background: $colorWhite
            width: calc(100%)
            border-radius: 3px
            box-shadow: 0px 0px 3px rgba(black, 0.3)
            .deviceList
              display: flex
              padding: 8px 5px
              cursor: pointer
              // border-left: solid 1px $borderColor
              // border-right: solid 1px $borderColor
              .data
                width: $tableWidth
              .status
                p
                  display: inline-block
                  padding: 2px 4px
                  margin: 0px
                  border-radius: 4px
                  background-color: $colorDarkBlue
                  color: $colorWhite
            .fieldBlock
              display: flex
              margin-bottom: 5px
              .field
                display: flex
                .fieldName
                  font-size: 17px
                  font-weight: 600
                  width: $tableWidth
                i
                  height: 20px
                  position: absolute
                  right: 40px
                  top: 10px
            .deviceList:nth-child(odd)
              background-color: $colorBlue
            .deviceList:nth-child(2)
              border-top: solid 1px $borderColor
            .deviceList:nth-last-child(1)
              border-bottom: solid 1px $borderColor

</style>
