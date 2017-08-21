<template lang="pug">
  .hostInfoBlock
    .topDeviceBar
      .deviceName
        h3 UTC520-F
      .controlBar
        .selc
          p.remoteControl(@click="dropDownMenu(1)") 遠端控制
          i(class="fa fa-angle-down")
          .dropDown(v-if="remOpen")
            ul
              li 遠端桌面
              li 遠端CMD
        .selc
          p(@click="dropDownMenu(0)") 電源管理
          i(class="fa fa-angle-down")
          .dropDown(v-if="powerOpen")
            ul
              li 重開機
              li 關機
              li 開機
        .selc
          p 擷取快照
    .infoBlock
      .statusListBlock.info
        .power.data
          span.title 電源狀態
          span : 離線
        .cpu.data
          span.title CPU:
          span  15%
        .ram.data
          span.title RAM:
          span  45%
        .disk.data
          span.title 硬碟狀態：
          span 警告
        .net.data
          span.title 網路狀態：
          span S/0 kbps R/0 kbps
        .ip.data
          span.title IP位置:
          span 172.16.17.36
      .statusDetailBlock.info
        .diskDetail
          p SanDisk Ultra II 240GB
        .diskDetail
          p 硬碟健康度: 33%
          .graphic
            .wholeBar
              .progressBar
            .divideTitle
              .devide(v-for="i in [1,2,3,4]")
                .level
                  p {{i*25}}%
        .diskDetail.temp
          p 硬碟溫度: 47 ℃
        .diskDetail.hour
          p 累計運行小時: 217 hours
</template>

<script>
export default {
  data() {
    return {
      remOpen: false,
      powerOpen: false
    }
  },
  methods: {
    dropDownMenu(type) {
      if (type) {
        this.remOpen = !this.remOpen
        this.powerOpen = false
      } else {
        this.powerOpen = !this.powerOpen
        this.remOpen = false
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  $colorWhite: #fff
  $colorDarkBlue: #2EA6E2
  *
    position: relative
    // border: solid 1px black
  .infoBlock
    // height: 250px
    display: flex
    .statusListBlock
      margin-right: 10px
    .statusListBlock, .statusDetailBlock
      box-shadow: 0px 0px 2px rgba(black, 0.3)
    .statusDetailBlock
      .diskDetail
        p
          font-size: 15px
          font-weight: 600
        .graphic
          height: 40px
          padding-left: 20px
          padding-right: 20px
          margin-top: 20px
          margin-bottom: 20px
          .divideTitle
            display: flex
            width: 98%
            left: 3px
            .devide:first-child:before
              content: '0%'
              position: absolute
              top: 8px
              left: -5px
              font-size: 16px
              font-weight: 600
            .devide
              flex: 1
              height: 10px
              border-left: solid 1px rgba(black, 0.4)
              .level
                top: 10px
                left: 20px
                text-align: right
            .devide:last-child
              border-right: solid 1px rgba(black, 0.4)
          .wholeBar
            height: 10px
            border-radius: 8px
            background-color: #DEDEDE
            .progressBar
              position: absolute
              height: 9px
              border-radius: 8px
              width: 33%
              background-color: #FE2701
  .info
    flex: 1
    background-color: $colorWhite
    padding: 13px 15px
    .data
      margin-bottom: 10px
      letter-spacing: 1px
      font-size: 15px
      .title
        font-weight: 600
  .topDeviceBar
    display: flex
    padding: 10px 15px
    background-color: $colorWhite
    margin-bottom: 8px
    box-shadow: 0px 0px 3px rgba(black, 0.3)
    .deviceName
      h3
        margin: 0px
        font-size: 20px
        font-weight: 600
    .controlBar
      display: flex
      position: absolute
      right: 20px
      margin: 0px
      .selc
        display: flex
        color: white
        margin-left: 15px
        border-radius: 3px
        background-color: $colorDarkBlue
        padding: 2px 0px
        cursor: pointer
        .dropDown
          position: absolute
          width: 100%
          background-color: $colorWhite
          top: 25px
          z-index: 600
          color: rgba(black, 0.7)
          ul
            padding: 0px
            margin: 0px
            padding: 5px 25px
            box-shadow: 0px 0px 5px rgba(black, 0.7)
            li
              list-style-type: none
              margin-bottom: 5px
              font-size: 15px
              cursor: pointer
        i
          top: 3px
          right: 7px
      p
        width: 120px
        margin: 0px
        font-size: 15px
        text-align: center
        border-radius: 3px
        font-weight: 600
</style>
