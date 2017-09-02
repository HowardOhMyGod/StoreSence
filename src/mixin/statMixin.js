export const statOperate = {
  methods: {
    manageStat(stat) {
      if (stat == '-1') {
        return '未處理'
      } else if (stat == '0') {
        return '處理中'
      } else if (stat == '1'){
        return '已處理'
      }
    },
    manageStatStyle(stat) {
      if (stat == '-1') {
        return {'backgroundColor': '#2EA6E2'}
      } else if (stat == '0') {
        return {'backgroundColor': "#FFCC00"}
      } else if (stat == '1'){
        return {'backgroundColor': "gray"}
      }
    }
  }
}
