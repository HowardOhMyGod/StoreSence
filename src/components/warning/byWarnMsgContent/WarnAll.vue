<template lang="pug">
  .allWarnMsgInfo
    .container
      .row
        .warnMsgBlock.col-md-6(v-for="i in [1,2,3,4,5,6]")
          h4.warnTitle 開機次數異常
          .tableWraper
            .fieldBlock
              h5.fieldName(v-for="field in fieldNames") {{field}}
            .deviceList(v-for="i in [1,2,3,4]")
              .deviceType.data UPOS-211
              .counter.data 11
              .location.data 內湖分店
              .occurTime.data 2017-5-21 9:30
              i(class="fa fa-angle-right")
</template>

<script>
export default {
  data() {
    return {
      fieldNames: ['設備型號', '發生次數', '所在位置', '發生時間']
    }
  }
}
</script>

<style lang="sass" scoped>
  $tableWidth: 110px
  $colorWhite: #fff
  $colorBlue: #F0FAFC
  *
    // border: solid 1px black
    position: relative
  .allWarnMsgInfo
    width: 100%
    top: 40px
    background-color: #eee
    .container
      padding: 0px 30px
      .row
        .warnMsgBlock
          margin-top: 10px
          margin-bottom: 20px
          .warnTitle
            font-weight: 600
            left: 5px
            margin-bottom: 20px
          .tableWraper
            padding: 10px 20px
            background-color: $colorWhite
            padding-bottom: 20px
            width: 520px
            border-radius: 3px
            box-shadow: 0px 0px 3px rgba(black, 0.3)
            .fieldBlock
              display: flex
              .fieldName
                width: $tableWidth
                font-size: 16px
                font-weight: 600
            .deviceList
              display: flex
              padding: 8px 4px
              padding-right: 10px
              .counter
                padding-left: 5px
              .occurTime
                margin-right: 10px
              i
                // left: 10px
                font-size: 16px
                font-weight: 600
                // margin-left: 10px
            .data
              width: $tableWidth
            .deviceList:nth-child(odd)
              background-color: $colorBlue

</style>
