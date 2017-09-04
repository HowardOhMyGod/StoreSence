const apiDomain = 'https://storesenseapi.wise-paas.com'
// https://store-sense-api-server.herokuapp.com


export const errorReq = function (self) {
    return new Promise((resolve, reject) => {
        let vue = self
        let domain = `${apiDomain}/errorReport`
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
    let domain = `${apiDomain}/warnType`

    vue.$http.get(domain).then((res) => {
      resolve(res.body)
    })
  })
}

export const warnTypeDetail = function(self, type, devId) {
  return new Promise((resolve, reject) => {
    let vue = self
    let domain = `${apiDomain}/warnTypeDetail?type=${type}&devId=${devId}`

    vue.$http.get(domain).then((res) => {
      resolve(res.body)
    })
  })
}

export const cpuDetect = function(self) {
  return new Promise((resolve, reject) => {
    let vue = self
    let domain = `${apiDomain}/swMonitor/system`

    vue.$http.get(domain).then((res) => {
      resolve(res.body)
    })
  })
}

export const getProcessInfo = function(self) {
  return new Promise((resolve, reject) => {
    let vue = self
    let domain = `${apiDomain}/swMonitor/process`

    vue.$http.get(domain).then((res) => {
      resolve(res.body.plist)
    })
  })
}

export const killProcess = function(self, pid) {
  return new Promise((resolve, reject) => {
    let vue = self
    let domain = `${apiDomain}/swMonitor/killProcess`

    vue.$http.post(domain, {pid}).then((res) => {
      if (res.body.result) {
        resolve(true)
      } else {
        reject('Kill process request fail.')
      }
    })
  })
}

export const getErrorHistory = function(self, model, num) {
  return new Promise((resolve, reject) => {
    let vue = self
    let domain = `${apiDomain}/errorReport`
    domain += `?deviceModel=${model}&deviceNum=${num}`

    vue.$http.get(domain).then((res) => {
      if (res.body.devices.length > 0) {
        resolve(res.body.devices)
      } else {
        reject('Request error Histroy fail.')
      }
    })

  })
}

export const devTypeError = function(self, devType) {
  return new Promise((resolve, reject) => {
    let vue = self
    let domain = `${apiDomain}/errorReport`
    domain += `?devType=${devType}`

    vue.$http.get(domain).then((res) => {
      if (res.body.devices.length > 0) {
        resolve(res.body.devices)
      } else {
        reject('Request error Histroy fail.')
      }
    })
  })
}
