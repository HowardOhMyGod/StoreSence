import {RMM, restartReq} from '../data/rmmConfig.js'

export const restartMixin = {
  methods: {
    shutdown() {
      restartReq.request.item[0]['@value'] = '0000000BAB9863D6'
      this.$http.post(`${RMM.domain}/PowerMgmt`, restartReq, {headers: RMM.header})
        .then((res) => {
          console.log(res)
        })
    }
  }
}
