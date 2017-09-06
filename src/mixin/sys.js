export const sysInfo = {
  data(){
    return {
      sys: {
        cpu: 0,
        ram: 0
      },
      net: {
        r: 0,
        s: 0
      }
    }
  },
  mounted() {
    setInterval(() => {
      this.sys = {
        cpu: Math.floor(Math.random()*10 + 20),
        ram: Math.floor(Math.random()*15 + 30)
      }
      this.net = {
        r: Math.floor(Math.random()*100 + 20),
        s: Math.floor(Math.random()*100 + 20)
      }
    }, 1000)
  }
}
