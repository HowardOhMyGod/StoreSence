<template lang="pug">
  .controlBlock
    .funcSelecBar
      .selec(v-for="(func, id) in funcs" ,
      @click="selectFunc(id)",
      :class="{click: selecClass(id)}") {{func.name}}
    .funcContentBlock
      transition(name="fade")
        table.processTable(v-if="plist.length > 0")
          tr
            th(v-for="field in pfields") {{field}}
          tr(v-for="p in plist", @click="clickProcess(p.pname, p.pid)")
            td {{p.pname}}
            td {{p.cpu}} %
            td {{(p.ram / 1024).toFixed(2)}} MB
            td {{isActive(p.isActive)}}
            td {{p.pid}}
    transition(name="pop")
      .confirmBlock(v-if="showNotify", :style="confirmBlockStyle")
        .confirmMsg
          h5#mainMsg 確認刪除{{delProcessName}}嗎?
        .checkButtons
          p.yes(@click="killCheck(true)") 刪除
          p.cancel(@click="killCheck(false)") 取消
</template>

<script>
import {getProcessInfo, killProcess} from '../../../request/errorReport'
export default {
  data() {
    return {
      funcs: [{
        'name': '軟體監控'
      }, {
        'name': '網路狀態'
      },{
        'name': '硬碟狀態'
      },{
        'name': '硬體狀態'
      }, {
        'name': '周邊設備'
      },{
        'name': '系統保護'
      },{
        'name': '備份還原'
      }],
      currentSelecFunc: 0,
      pfields: ['程序名稱', 'CPU 使用率', 'RAM 使用率', '狀態', 'PID'],
      plist: [],
      showNotify: false,
      delProcessName: '',
      delProcessId: ''
    }
  },
  methods: {
    selectFunc(id) {
      this.currentSelecFunc = id
    },
    selecClass(id) {
      if (this.currentSelecFunc == id) {
        return true
      } else {
        return false
      }
    },
    clickProcess(pname, pid) {
      this.showNotify = true
      this.delProcessName = pname
      this.delProcessId = pid
    },
    killCheck(kill){
      if (kill) {
        document.getElementById("mainMsg").innerHTML = `正在刪除${this.delProcessName}...`
        killProcess(this, this.delProcessId).then((res) => {
          if (res) {
            document.getElementById("mainMsg").innerHTML = `已刪除${this.delProcessName}`
          } else {
            document.getElementById("mainMsg").innerHTML = `暫時無法刪除${this.delProcessName}`
          }
          setTimeout(() => {
            this.showNotify = false
          }, 2000)
        }).catch((e) => {
          alert(e)
        })
      } else {
        this.showNotify = false
      }
    },
    isActive(active){
      if (active) {
        return '執行中'
      } else {
        return '-'
      }
    }
  },
  computed: {
    confirmBlockStyle() {
      return {'width': (this.delProcessName.length + 12) +'%'}
    }
  },
  mounted() {
    // setInterval(() => {
    //   getProcessInfo(this).then((plist) => {
    //     this.plist = plist
    //   })
    // }, 3000)

    getProcessInfo(this).then((plist) => {
      this.plist = plist
    })
  }
}
</script>

<style lang="sass" scoped>
  $colorGray: #F4F4F4
  $colorBlue: #F0FAFC
  $colorRed: #D50000
  *
    // border: solid 1px black

  .fade-enter-active, .fade-leave-active
    transition: opacity .5s
  .fade-enter, .fade-leave-to
    opacity: 0

  .pop-enter-active, .pop-leave-active
    transition: 0.2s
    transform: translateY(0%) scale(1)
  .pop-enter, .pop-leave-to
    opacity: 0
    transform: translateY(-20%) scale(0)

  .confirmBlock
    position: fixed
    top: 10%
    right: 1%
    z-index: 2000
    height: 85px
    width: 17%
    padding: 0px 10px
    background-color: white
    box-shadow: 0px 0px 10px rgba(black, 0.5)
    border-radius: 3px
    .confirmMsg
      h5
        font-size: 17px
        font-weight: 600
        margin-bottom: 20px
        letter-spacing: 2px
    .checkButtons
      display: flex
      .yes
        background-color: $colorRed
        color: white
      .cancel:hover
        background-color: $colorGray
      p
        margin: 0px
        margin-left: 10px
        padding: 4px 10px
        border-radius: 3px
        font-size: 12px
        cursor: pointer
        font-weight: 600
  .controlBlock
    margin-top: 30px
    box-shadow: 0px 0px 2px rgba(black, 0.3)
    .funcContentBlock
      height: 350px
      background-color: white
      padding: 10px 40px
      overflow-y: scroll
      .processTable
        font-family: arial, sans-serif
        border: none
        border-collapse: collapse
        width: 100%
        // box-shadow: 0px 0px 2px rgba(black, 0.3)
        td, th
          text-align: left
          padding: 8px
        th
          border-top: 1px solid #dddddd
        td
          border-top: 1px solid #dddddd
          cursor: pointer
        tr:nth-child(even)
          background-color: $colorGray

    .funcSelecBar
      display: flex
      background-color: $colorGray
      .selec
        font-size: 18px
        font-weight: 600
        padding: 10px 20px
        cursor: pointer
      .selec.click
        background-color: white

</style>
