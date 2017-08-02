<template>
  <div id="mainView" :style="menuStatus">
    <topBar></topBar>
  </div>
</template>

<script>
  import Topbar from './Topbar.vue'
  import {eventBus} from '../main'
  export default {
    components: {
      topBar: Topbar
    },
    data () {
      return {
        menuOpen: true
      }
    },
    created () {
      eventBus.$on('openMenu', (open) => {
        this.menuOpen = open
      })
    },
    computed: {
      menuStatus () {
        if (this.menuOpen){
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
    height: 100%
    background-color: #eee;
    margin-left: 200px;
    transition: 0.2s
</style>
