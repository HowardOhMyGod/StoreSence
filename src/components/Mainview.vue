<template lang="pug">
  #mainView(:style="menuStatus")
    topBar
    <router-view></router-view>
</template>

<script>
  import Topbar from './Topbar.vue'
  import {eventBus} from '../main'
  import WarningPage from './warning/Warning.vue'

  export default {
    components: {
      topBar: Topbar,
      warningPage: WarningPage
    },
    data () {
      return {
        menuOpen: true,
        screenWidth: null
      }
    },
    created () {
      window.addEventListener('resize', () => {
      	this.screenWidth = window.innerWidth
      })

      this.screenWidth = window.innerWidth
      if (this.screenWidth < 768) {
        this.menuOpen = false
      }

      eventBus.$on('openMenu', (open) => {
        this.menuOpen = open
      })

    },
    computed: {
      menuStatus () {
        if (this.menuOpen || (!this.menuOpen && this.screenWidth > 768)){
          return {
            'margin-left': '200px'
          }
        } else {
          return {
            'margin-left': '0px'
          }
        }
      }
    }
  }
</script>

<style lang="sass" scoped>

  #mainView
    /*width: 100%*/
    overflow-x: hidden
    height: 2000px
    margin-left: 200px
    transition: 0.2s
</style>
