<template lang="pug">
  .periInfoBlock
    .periTopBar
      h3 周邊設備
    .periInfo
      p.title 連接設備名稱
      .infos
        .left
          .periList(v-for="peri in periDevices.slice(0, 2)")
            p.periDev {{peri}}
            p.connect 連線
        .right
          .periList(v-for="peri in periDevices.slice(2, 4)")
            p.periDev {{peri}}
            p.connect 連線
</template>

<script>
export default {
  data() {
    return {
      periDevices: ['RFID', 'Barcode', 'Printer', 'Card Reader']
    }
  }
}
</script>

<style lang="sass" scoped>
  $colorWhite: #fff
  *
    // border: solid 1px black
  .periInfoBlock
    margin-top: 30px
    .periInfo
      padding: 10px 15px
      box-shadow: 0px 0px 3px rgba(black, 0.3)
      background-color: $colorWhite
      .title
        font-size: 15px
        font-weight: 600
      .infos
        display: flex
        margin-top: 20px
        .left, .right
          flex: 1
          .periList
            display: flex
            p
              width: 120px
            .periDev
              font-weight: 600
            .connect
              color: green
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
