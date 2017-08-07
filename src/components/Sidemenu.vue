<template lang="pug">
  .sidemenu(:style='menuStatus')
    .logo
      img(src="../assets/sidemenu/icon_logo.svg" style="transform: scale(0.6)")
    .title(v-for='(option, id) in menuOptions', :class="{selected: select(id)}")
      img.menuIcon(:src="option.icon")
      router-link(tag="p",
      class="optionName" ,
      :to="option.link",
      v-on:click.native="navigate(id)") {{option.name}}
      i.fa.fa-caret-down(v-if="option.submenu.length > 0", @click='openSubMenu(id)')
      .submenu(v-if='submenuOpen(option)')
        p.subOptions(v-for='sub in option.submenu') > {{sub}}
</template>

<script>
import {eventBus} from '../main'
export default {
  data() {
    return {
      menuOptions: [{
        name: 'Dashboard',
        submenu: [],
        open: false,
        link: '',
        icon: 'https://firebasestorage.googleapis.com/v0/b/storesense-1a3d1.appspot.com/o/sidemenu%2Ficon_dashboard_off.svg?alt=media&token=2cedae4d-a9d8-446c-a881-df89c038955c'
      }, {
        name: '異常警示',
        submenu: ['系統偵測',
        '店員回報'],
        open: false,
        link: '/warning',
        icon: 'https://firebasestorage.googleapis.com/v0/b/storesense-1a3d1.appspot.com/o/sidemenu%2Ficon_alert_off.svg?alt=media&token=8b36ec71-5b8d-4639-bf4f-a3e526ea01de'
      }, {
        name: '設備監控',
        submenu: ['你好'],
        open: false,
        link: '',
        icon: 'https://firebasestorage.googleapis.com/v0/b/storesense-1a3d1.appspot.com/o/sidemenu%2Ficon_device_off.svg?alt=media&token=1eddbd8f-b01a-4df7-b34a-bea7ed45ce72'
      }, {
        name: '數據分析',
        submenu: [],
        open: false,
        link: '/data',
        icon: 'https://firebasestorage.googleapis.com/v0/b/storesense-1a3d1.appspot.com/o/sidemenu%2Ficon_report_off.svg?alt=media&token=64f33bf5-94a6-4e8f-96e7-bc9ecce11f51'
      }, {
        name: '設定',
        submenu: ['語言', '登出'],
        open: false,
        link: '',
        icon: 'https://firebasestorage.googleapis.com/v0/b/storesense-1a3d1.appspot.com/o/sidemenu%2Ficon_setting_off.svg?alt=media&token=5165b5a9-ba66-4ec5-9645-cc4a7025b5e9'
      }],
      menuOpen: true,
      screenWidth: null,
      selected: 1
    }
  },
  methods: {
    openSubMenu (id) {
      this.menuOptions[id].open = !this.menuOptions[id].open
    },
    submenuOpen(option) {
      if (option.submenu.length > 0 && option.open) {
        return true
      } else {
        return false
      }
    },
    navigate(id) {
      eventBus.navigatePage(this.menuOptions[id].name)
      this.selected = id
    },
    select (id) {
      if (this.selected == id) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    // listen for sidemenu open status form everntBus
    eventBus.$on('openMenu', (open) => {
      this.menuOpen = open
    })

    this.screenWidth = window.innerWidth
    if (this.screenWidth) {
      this.menuOpen = false
    }

    window.addEventListener('resize', () => {
    	this.screenWidth = window.innerWidth
    })

  },
  computed: {
    menuStatus () {
      if (this.menuOpen || (!this.menuOpen && this.screenWidth > 768)) {
        return {
          'transform': 'translateX(0px)'
        }
      } else if (!this.menuOpen) {
        return {
          'transform': 'translateX(-200px)'
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  $menuWidth: 200px
  $menuFontColor: rgba(white, 0.7)
  $colorBlue: #171E2E

  @mixin size($w, $h)
    width: $w
    height: $h
  *
    // border: solid 1px black
    position: relative
  .sidemenu
    +size($menuWidth, 100%)
    position: fixed
    min-width: 200px
    margin: 0
    z-index: 4
    transition: 0.3s
    transform: translateX(0px)
    background-color: $colorBlue
    .logo
      display: flex
      align-items: center
      justify-content: center
      // padding: 10px
    .title.selected
      background-color: #262D3D
      border-left: solid 5px #EC641D
    .title
      cursor: pointer
      padding-left: 20px
      margin-right: 0px
      z-index: 50
      .menuIcon
        +size(18px, 18px)
        bottom: 2px
      .optionName
        font-size: 18px
        margin-left: 10px
        margin-top: 10px
        display: inline-block
        color: $menuFontColor
        font-weight: 500
      i
        margin-left: 30px
        transform: rotate(0deg)
        font-size: 16px
        color: rgba(white, 0.4)
        position: absolute
        right: 20px
        top: 12px
      .submenu
        padding: 5px
        .subOptions
          font-size: 16px
          width: 50%
          left: 15%
          color: $menuFontColor
</style>
