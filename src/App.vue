<template lang="pug">
  .content
    sideMenu
    mainView
</template>

<script>
  import Sidemenu from './components/Sidemenu.vue'
  import Mainview from './components/Mainview.vue'

  export default {
    components: {
      sideMenu: Sidemenu,
      mainView: Mainview
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
  .content
    display: flex
    overflow-x: hidden
    user-select: none
    width: 100%
</style>
