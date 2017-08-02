<template>
  <div class="content">
    <sideMenu></sideMenu>
    <mainView></mainView>
  </div>
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
  *
    font-family: 微軟正黑體
    /*border: solid 1px black*/
  html, body
    margin: 0
    padding: 0
  .content
    display: flex
    overflow-x: hidden
</style>
