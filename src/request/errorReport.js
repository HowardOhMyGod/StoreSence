export const errorReq = function (self) {
    return new Promise((resolve, reject) => {
        let vue = self
        let domain = 'https://store-sense-api-server.herokuapp.com/errorReport'
        let warnObj = {}

        vue.$http.get(domain).then((res) => {
          // POS warning Devices
            warnObj.touchPC = res.body.devices.filter((el) => {
                return el.deviceType == 'TouchPC'
            })
            // POS warning Devices
            warnObj.pos = res.body.devices.filter((el) => {
                return el.deviceType == 'Pos'
            })

            resolve(warnObj)
        })
    })
}

export const warnTypeReq = function(self) {
  return new Promise((resolve, reject) => {
    let vue = self
    let domain = 'https://store-sense-api-server.herokuapp.com/warnType'

    vue.$http.get(domain).then((res) => {
      resolve(res.body)
    })
  })
}

export const warnTypeDetail = function(self, type, devId) {
  return new Promise((resolve, reject) => {
    let vue = self
    let domain = `https://store-sense-api-server.herokuapp.com/warnTypeDetail?type=${type}&devId=${devId}`

    vue.$http.get(domain).then((res) => {
      resolve(res.body)
    })
  })
}

export const cpuDetect = function(self) {
  return new Promise((resolve, reject) => {
    let vue = self
    let domain = `https://store-sense-api-server.herokuapp.com/swMonitor/system`

    vue.$http.get(domain).then((res) => {
      resolve(res.body)
    })
  })
}

export const getProcessInfo = function(self) {
  return new Promise((resolve, reject) => {
    let vue = self
    let domain = `https://store-sense-api-server.herokuapp.com/swMonitor/process`

    vue.$http.get(domain).then((res) => {
      resolve(res.body.plist)
    })
  })
}

export const killProcess = function(self, pid) {
  return new Promise((resolve, reject) => {
    let vue = self
    let domain = 'https://store-sense-api-server.herokuapp.com/swMonitor/killProcess'

    vue.$http.post(domain, {pid}).then((res) => {
      if (res.body.result) {
        resolve(true)
      } else {
        reject('Kill process request fail.')
      }
    })
  })
}
