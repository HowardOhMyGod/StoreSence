<template lang="pug">
.topbar(:class='{open: menuOpen}', :style="menuStat")
  .pageNameBlock
    i#menuIcon.fa.fa-bars(aria-hidden='true', @click='menuOperation()')
    #pageName
      p {{pageTitle}}
  .userInfoBlock
    p(@click="shutdown") 何智誠
    i.fa.fa-caret-down(aria-hidden='true')
</template>

<script>
import {eventBus} from '../main'
import {restartMixin} from '../mixin/restartMixin'
export default {
  mixins: [restartMixin],
  data () {
    return {
      menuOpen: true,
      screenWidth: null,
      pageTitle: '異常警示'
    }
  },
  methods: {
    menuOperation () {
      if (this.screenWidth < 768) {
        this.menuOpen = !this.menuOpen
        eventBus.openSidemenu(this.menuOpen)
        console.log(this.menuOpen)
      }
    }
  },
  created () {
    this.screenWidth = window.innerWidth
    window.addEventListener('resize', () => {
    	this.screenWidth = window.innerWidth
    })

    eventBus.$on('navigate', (title) => {
      this.pageTitle = title
    })
  },
  computed: {
    menuStat() {
      if(this.screenWidth > 768) {
        return {
          'width': 'calc(100% - 200px)'
        }
      } else {
        this.menuOpen = false
        return {
          'width': '100%'
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  $colorBlue: #171E2E
  *
    position: relative
  .topbar.open
    width: calc(100% - 200px)
    transition: 0.2s width
  .topbar
    padding: 15px 15px
    display: flex
    align-items: top
    background-color: rgba(#333, 0.5)
    color: white
    position: fixed
    width: 100%
    transition: 0.2s width
    background-color: $colorBlue
    z-index: 1000
    *
      margin-bottom: 0px
    .userInfoBlock
      position: absolute
      right: 10%
      display: flex
      i
        font-size: 10px
        font-weight: 100
      p
        font-size: 18px
        margin-right: 7px
        font-weight: 500
    .pageNameBlock
      display: flex
      #menuIcon
        font-size: 20px
        margin-right: 10px
        vertical-align: top
        cursor: pointer
      #pageName
        vertical-align: top
        box-sizing: border-box
        p
          font-size: 18px
          font-weight: 500
          bottom: 2px

</style>
