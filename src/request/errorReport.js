export const errorReq = function (self) {
    return new Promise((resolve, reject) => {
        let vue = self
        let domain = 'https://store-sense-api-server.herokuapp.com/errorReport'
        let warnObj = {}

        vue.$http.get(domain).then((res) => {
          // POS warning Devices
            warnObj.touchPC = res.body.devices.filter((el) => {
                return el.deviceType == 'touchPC'
            })
            // POS warning Devices
            warnObj.pos = res.body.devices.filter((el) => {
                return el.deviceType == 'pos'
            })

            resolve(warnObj)
        })
    })
}
