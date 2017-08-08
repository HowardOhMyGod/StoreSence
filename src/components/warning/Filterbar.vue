<template lang="pug">
  .filterBarBlock
    .filterBar
      .areaFilter
        span 分店選擇 :
        select#selCountry(name="country" v-model="selectArea.selectCountry")
          option(v-for="(country, id) in areaFilters.countrys",:value="id") {{country.name}}
        select#selCity(name="city" v-model="selectArea.selectCity")
          option(value='', selected) 選擇縣市
          option(v-for="(city, id) in cityList",:value="id") {{city.name}}
        select#selectDistrict(name="district" v-model="selectArea.selectDistrict")
          option(value='', selected) 選擇地區
          option(v-for="(district, id) in districtList", :value="id") {{district.name}}
        select#selectStore(name="store", v-model="selectArea.selectStore")
          option(value='', selected) 選擇店家
          option(v-for="(store, id) in storeList", :value="id") {{store}}
      hr
      .deviceFilter
        span 設備選擇 :
        select(name="deviceType")
          option(value='' selected) 設備類型
        select
          option(value='' selected) 設備型號
        select
          option(value='' selected) 設備名稱
        span 異常類別 :
        select
          option(value='' selected) 全部異常
        span#updateBtn
          p(@click="navigatePage()") 更新資訊
      hr
      .downBar
        .repairStatus
          p 未處理
          p 處理中
          p 已完成
        .areaRoutes
          p 分店 > 台灣 > 新北市 > 內湖區 > 環山門市
</template>

<script>
import {areaFilterMixin} from '../../mixin/areaFilter'
export default {
  mixins: [areaFilterMixin],
  methods: {
    navigatePage() {
      this.$router.push('/warning/store')
    }
  }
}
</script>

<style lang="sass" scoped>
  $colorWhite: #fff
  *
    position: relative
    // border: solid 1px black
  hr
    padding: 0px
    margin: 0px -20px
  .filterBarBlock
    height: 96px
    z-index: 1000
    background-color: $colorWhite
  .filterBar
    padding: 10px 20px
    position: absolute
    width: calc(100% - 200px)
    .areaFilter, .deviceFilter
      display: flex
      padding-left: 10px
      select
        padding: 2px 5px
        margin-right: 10px
        width: 150px
        font-weight: 900
        border-radius: 5px
      span
        margin-right: 15px
        top: 3px
        height: 20px
        font-size: 14px
        font-weight: 600
    .areaFilter
      padding-bottom: 10px
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
        text-shadow: none
    .deviceFilter
      margin-top: 10px
      margin-bottom: 10px
      #updateBtn
        margin-left: 10px
        p
          border: solid 1px black
          padding: 3px 10px
          width: 150px
          text-align: center
          bottom: 5px
    .downBar
      display: flex
      background-color: #fff
      margin-left: -20px
      margin-right: -20px
      padding-left: 20px
      .repairStatus, .areaRoutes
        display: flex
        margin-left: 10px
        margin-top: 10px
        p
          margin-right: 10px
          font-size: 14px
      .areaRoutes
        position: absolute
        right: 20px
</style>
