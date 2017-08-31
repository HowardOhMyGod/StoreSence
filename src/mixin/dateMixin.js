export const dateOperate = {
  methods: {
    toDate(mileSecond) {
      if (mileSecond !== '-') {
        let date = new Date(mileSecond).toLocaleDateString()
        let dateTemp = date.split('/')
        date = `${dateTemp[2]}-${dateTemp[0]}-${dateTemp[1]}`

        let time = new Date(mileSecond).toLocaleTimeString().split(' ')[0]
        time = time.split(':')[0] + ':' + time.split(':')[1]
        return `${date} ${time}`
      } else {
        return '-'
      }
    }
  }
}
