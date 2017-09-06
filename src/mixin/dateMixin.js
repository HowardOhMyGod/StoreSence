export const dateOperate = {
  methods: {
    toDate(mileSecond) {
      if (mileSecond !== '-') {
        let date = new Date(mileSecond)
        let month = date.getMonth() + 1
        let day = date.getDate()
        let hours = date.getHours()
        let min = date.getMinutes()
        let year = date.getFullYear()

        if (min - 10 < 0) {
          min = `0${min}`
        }

        return `${year}-${month}-${day} ${hours}:${min}`
      } else {
        return '-'
      }
    }
  }
}
