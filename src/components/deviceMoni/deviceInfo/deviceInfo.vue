<template lang="pug">
  .deviceInfo
    .topMenuBar
      i(class="fa fa-angle-left" @click="$router.go(-1)")
      p.warnType(@click="$router.go(-1)") 回上一頁
      //- p.devType Touch-PC
    .infoBlock
      hostInfoBlock
      controlBlock
      warnHistory
</template>

<script>
import hostInfoBlock from './hostInfo.vue'
import warnHistory from './warnHistory.vue'
import controlBlock from './controlBlock.vue'
export default {
  components: {
    hostInfoBlock,
    warnHistory,
    controlBlock
  }
}
</script>

<style lang="sass" scoped>
  *
    // border: solid 1px black
    position: relative
  .deviceInfo
    width: 100%
    .topMenuBar
      display: flex
      padding: 10px 10px
      background-color: #fff
      i
        height: 20px
        font-size: 26px
      .warnType, .devType
        font-size: 17px
        margin: 0px
        font-weight: 600
      i, .warnType
        margin-right: 13px
        cursor: pointer
    .infoBlock
      padding: 20px 100px
      .operation
        margin-top: 20px
        width: 100%
</style>
