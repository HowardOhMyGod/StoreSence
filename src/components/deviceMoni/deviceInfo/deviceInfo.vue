<template lang="pug">
  .deviceInfo
    .topMenuBar
      i(class="fa fa-angle-left" @click="$router.go(-1)")
      p.warnType(@click="$router.go(-1)") 回上一頁
      //- p.devType Touch-PC
    .infoBlock
      hostInfoBlock
      periInfoBlock
      img.operation(src="https://firebasestorage.googleapis.com/v0/b/storesense-1a3d1.appspot.com/o/%E5%AE%89%E5%85%A8%E7%AE%A1%E7%90%86.png?alt=media&token=7d719beb-2336-4e9f-a895-5bd743c3c2ec")
</template>

<script>
import hostInfoBlock from './hostInfo.vue'
import periInfoBlock from './Peripheral.vue'
export default {
  components: {
    hostInfoBlock,
    periInfoBlock
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
