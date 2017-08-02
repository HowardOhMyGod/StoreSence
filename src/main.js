import Vue from 'vue'
import App from './App.vue'

export const eventBus = new Vue({
  methods: {
    openSidemenu (open) {
      this.$emit('openMenu', open)
    }
  }
})

new Vue({
  el: '#app',
  render: h => h(App)
})
