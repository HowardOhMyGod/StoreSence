<template lang="html">
  <div class="sidemenu" :style="menuStatus">
    <div class="logo">
      <img src="" alt="Logo">
    </div>
    <div class="title" v-for="(option, id) in menuOptions" @click="openSubMenu(id)">
      <i class="fa fa-caret-down" aria-hidden="true"></i>
      <p class="optionName">{{option.name}}</p>
      <div class="submenu" v-if="submenuOpen(option)">
        <p class="subOptions" v-for="sub in option.submenu">> {{sub}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {eventBus} from '../main'
export default {
  data() {
    return {
      menuOptions: [{
        name: 'Dashboard',
        submenu: [],
        open: false
      }, {
        name: '異常警示',
        submenu: ['全部警示',
        '連線狀態',
        '使用紀錄',
        '生命週期',
        '硬體異常',
        '軟體異常',
        '定位防盜'],
        open: false
      }, {
        name: '設備監控',
        submenu: [],
        open: false
      }, {
        name: '數據分析',
        submenu: [],
        open: false
      }, {
        name: '設定',
        submenu: ['語言', '登出'],
        open: false
      }],
      menuOpen: true
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
    }
  },
  created () {
    eventBus.$on('openMenu', (open) => {
      this.menuOpen = open
    })
  },
  computed: {
    menuStatus () {
      if (this.menuOpen) {
        return {
          'transform': 'translateX(0px)'
        }
      } else {
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
  @mixin size($w, $h)
    width: $w
    height: $h
  *
    border: solid 1px black
    position: relative;
  .sidemenu
    +size($menuWidth, 100%)
    overflow-y: scroll
    position: fixed
    min-width: 200px
    margin: 0;
    z-index: 4
    transition: 0.3s
    .logo
      display: flex
      align-items: center
      justify-content: center
      padding: 10px
      img
        +size(80px, 80px)
    .title
      cursor: pointer
      .optionName
        font-size: 18px;
        margin-left: 10px;
        margin-top: 10px;
        display: inline-block
      i
        margin-left: 30px;
        transform: rotate(-90deg)
        font-size: 16px;
      .submenu
        padding: 5px;
        .subOptions
          font-size: 16px;
          width: 50%
          left: 15%





</style>
