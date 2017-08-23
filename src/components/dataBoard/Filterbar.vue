<template lang="pug">
  .dataFilterBar(class="scrollable")
    .storeLoca.selBar
      h4.title 分店選擇
      select#selCountry(name="country" v-model="selectArea.selectCountry")
        option(v-for="(country, id) in areaFilters.countrys",:value="id") {{country.name}}
      select#selCity(name="city" v-model="selectArea.selectCity")
        option(v-for="(city, id) in cityList",:value="id") {{city.name}}
      select#selectDistrict(name="district" v-model="selectArea.selectDistrict")
        option(v-for="(district, id) in districtList", :value="id") {{district.name}}
      select#selectStore(name="store", v-model="selectArea.selectStore")
        option(v-for="(store, id) in storeList", :value="id") {{store}}
    .deviceSelect.selBar
      h4.title 設備選擇
      select
        option(value='' selected) 設備類型
      select
        option(value='' selected) 設備型號
      select
        option(value='' selected) 設備名稱
    .warningType.selBar
      h4.title 異常類別
      select
        option(value='' selected) 全部異常
    .dateRange.selBar
      h4.title 時間範圍
      select
        option(value='' selected) 日
      select
        option(value='' selected) 2017-08-03
    .sumitBtn
      p 分析統計
</template>

<script>
import {areaFilterMixin} from '../../mixin/areaFilter'
export default {
  mixins: [areaFilterMixin]
}
</script>

<style lang="sass" scoped>
  $colorWhite: #fff
  $colorLightBlue: #27A3DF
  // *
  //   // border: solid 1px black
  .dataFilterBar
    position: fixed
    width: 250px
    right: 20px
    padding: 0px 30px
    padding-top: 5px
    height: calc(100vh - 100px)
    overflow-y: scroll
    box-shadow: 0px 0px 3px rgba(black, 0.3)
    background-color: $colorWhite
    .sumitBtn
      margin-top: 30px
      p
        border: solid 1px black
        padding: 3px 5px
        text-align: center
        font-size: 16px
        font-weight: 600
  .selBar
    margin-bottom: 30px
  .title
    margin-top: 20px
    font-size: 20px
    padding-bottom: 10px
    border-bottom: solid 2px black
    font-weight: 600
  select
    display: block
    width: 100%
    margin-bottom: 10px
    height: 28px
    font-size: 18px
    padding: 2px
</style>
