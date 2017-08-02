<template lang="html">
  <div class="topbar" :class="{open: menuOpen}">
    <div class="pageNameBlock">
      <i id="menuIcon"
       class="fa fa-bars"
       aria-hidden="true"
       @click="menuOperation()"
       ></i>
      <div id="pageName">
        <p>異常警示</p>
      </div>
    </div>
    <div class="userInfoBlock">
      <p>何智誠</p>
      <i class="fa fa-caret-down" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script>
import {eventBus} from '../main'
export default {
  data () {
    return {
      menuOpen: true
    }
  },
  methods: {
    menuOperation () {
      this.menuOpen = !this.menuOpen
      eventBus.openSidemenu(this.menuOpen)

    }
  }
}
</script>

<style lang="sass" scoped>
  *
    position: relative;
  .topbar.open
    width: calc(100% - 200px)
    transition: 0.2s width
  .topbar
    padding: 15px 15px;
    display: flex
    align-items: top
    background-color: rgba(#333, 0.5);
    color: white
    position: fixed;
    width: 100%
    transition: 0.2s width
    *
      margin-bottom: 0px;
    .userInfoBlock
      position: absolute;
      right: 10%
      display: flex
      i
        font-size: 20px;
      p
        font-size: 18px;
        margin-right: 7px;
        font-weight: 900
    .pageNameBlock
      display: flex
      #menuIcon
        font-size: 26px;
        margin-right: 10px;
        vertical-align: top
        cursor: pointer
      #pageName
        vertical-align: top
        box-sizing: border-box
        p
          font-size: 18px;
          font-weight: 700;
</style>
