import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App.vue'
import {routes} from './routes'

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
  routes,
  mode: 'history'
})

export const eventBus = new Vue({
  methods: {
    // pass sidemenu open status to Sidemenu.vue and Mainview.vue
    openSidemenu (open) {
      this.$emit('openMenu', open)
    },
    // change topbar page title when navigating
    navigatePage (title) {
      this.$emit('navigate', title)
    },
    //open control menu in warnMsg detailMenu
    openControlMenu(deviceDetail) {
      this.$emit('openControl', deviceDetail)
    },
    // pass dataBoard data
    passDataBoardData(data, type) {
      this.$emit('passData', data, type)
    },
    // pass device detail from detail menu to device monitoring
    passDevDetail(devObj){
      console.log(devObj)
      this.$emit('passDevObj', devObj)
    }
  }
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
