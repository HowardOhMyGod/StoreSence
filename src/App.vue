<template lang="pug">
  .content
    sideMenu
    mainView
</template>

<script>
  import Sidemenu from './components/Sidemenu.vue'
  import Mainview from './components/Mainview.vue'
  import {cpuDetect} from './request/errorReport'

  export default {
    components: {
      sideMenu: Sidemenu,
      mainView: Mainview
    },
    mounted() {
      // detect CPU
      let sysDetectInterval = setInterval(() => {
        cpuDetect(this).then((result) => {
          console.log(result.monitor)
          if (result.monitor.cpu > 70) {
            console.log('Excess to clear!')
            clearInterval(sysDetectInterval)
          }
        })
      }, 6000)






    }
  }
</script>

<style lang="sass">
  $colorGray: #F4F4F4
  *
    font-family: 微軟正黑體
    // border: solid 1px black
  html, body
    margin: 0
    padding: 0
    background-color: $colorGray
    overflow-x: hidden
  .content
    display: flex
    overflow-x: hidden
    user-select: none
    width: 100%
</style>
