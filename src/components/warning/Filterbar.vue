<template lang="pug">
  .filterBar
    .areaFilter
      select#selCountry(name="country" v-model="selectArea.selectCountry")
        option(v-for="(country, id) in areaFilters.countrys",:value="id") {{country.name}}
      select#selCity(name="city" v-model="selectArea.selectCity")
        option(v-for="(city, id) in cityList",:value="id") {{city.name}}
      select#selStore(name="store" v-model="selectArea.selectStore")
        option(value='' selected) 選擇店家
        option(v-for="store in storeList" :value="store") {{store}}
      .searchBar
        i(class="fa fa-search" aria-hidden="true" )
        input(type="text" placeholder="收尋")#searchStore
    .deviceFilter
      select(name="deviceType")
        option(value='' selected) 設備類型
      select
        option(value='' selected) 設備型號
      select
        option(value='' selected) 設備名稱
    .repairStatusFilter
      .repairFilter
        p 未處理
        p 已處理
      .update
        .updateTime
        .updateStatus
</template>

<script>
export default {
  data () {
    return {
      selectArea:{
        selectCountry: 0,
        selectCity: 0,
        selectStore: ''
      },
      areaFilters: {
        countrys: [{
          name: '台灣',
          citys: [{
            name: '台北市',
            stores: ['內湖','松山']
          } , {
            name: '新北市',
            stores: ['三重','蘆洲']
          }]
        },{
          name: '中國',
          citys: [{
            name: '上海',
            stores: ['上海1','上海2']
          } , {
            name: '北京',
            stores: ['北京1','北京2']
          }]
        }]
      }
    }
  },
  computed: {
    // return cityList base on country
    cityList() {
      return this.areaFilters.countrys[this.selectArea.selectCountry].citys
    },
    // return storeList base on city
    storeList() {
      return this.areaFilters.countrys[this.selectArea.selectCountry].citys[this.selectArea.selectCity].stores
    }
  }
}
</script>

<style lang="sass" scoped>
  *
    position: relative
  .filterBar
    padding: 10px 20px
    .areaFilter, .deviceFilter
      display: flex
      padding-left: 10px
      select
        padding: 4px 5px
        margin-right: 10px
        width: 100px
        font-weight: 900
      .searchBar
        padding: 3px 10px
        border: solid 1px black
        i
          font-size: 16px
          top: 5px

        input
          padding: 4px 5px
          vertical-align: top
          border: none
    .deviceFilter
      margin-top: 10px
    .repairStatusFilter
      .repairFilter
        display: flex
        padding: 10px 10px
        p
          margin: 0px
          margin-right: 10px
</style>
