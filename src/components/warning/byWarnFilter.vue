<template lang="pug">
  .filterBarBlock(:class="{open: filterBarBlockOpen}")
    .filterBar
      .areaFilter
        span 分店選擇 :
        select#selCountry(name="country" v-model="selectArea.selectCountry")
          option(v-for="(country, id) in areaFilters.countrys",:value="id") {{country.name}}
        select#selCity(name="city" v-model="selectArea.selectCity")
          option(v-for="(city, id) in cityList",:value="id") {{city.name}}
        select#selectDistrict(name="district" v-model="selectArea.selectDistrict")
          option(v-for="(district, id) in districtList", :value="id") {{district.name}}
        select#selectStore(name="store", v-model="selectArea.selectStore")
          option(v-for="(store, id) in storeList", :value="store") {{store}}
        span#updateBtn
          p 更新資訊
      hr
      .deviceFilter
        span 設備選擇 :
        select(name="deviceType")
          option(value='' v-for="type in deviceTypeList") {{type}}
        span 異常類別 :
        select
          option(value='' v-for="type in errorTypes")  {{type}}
      .areaRoutes
        p {{currentStorePath}}
      //- hr
      //- .downBar
      //-   .repairStatus
      //-     p.notyet 未處理
      //-     p 處理中
      //-     p 已完成
</template>

<script>
import {eventBus} from '../../main'
import {areaFilterMixin} from '../../mixin/areaFilter'
export default {
  mixins: [areaFilterMixin],
  data () {
    return {
      filterBarBlockOpen: null,
      deviceTypeList: ['所有設備','UPOS', 'Touch-PC', 'MPOS', 'Signage Box'],
      errorTypes: ['所有異常', '觸控不準', '觸控無反應', '螢幕黑屏', '軟體當機', 'CPU異常', '停留在windows畫面']
    }
  },
  computed: {
    currentStorePath () {
      return `分店 > ${this.country} / ${this.city} / ${this.district} / ${this.store}`
    },
    country () {
      return this.areaFilters.countrys[this.selectArea.selectCountry].name
    },
    city () {
      return this.cityList[this.selectArea.selectCity].name
    },
    district () {
      return this.districtList[this.selectArea.selectDistrict].name
    },
    store () {
      if (this.selectArea.selectStore){
        return this.selectArea.selectStore
      } else {
        return ''
      }

    }
  },
  created () {
    eventBus.$on('filterMenu', (open) => {
      this.filterBarBlockOpen = open
    })
  }
}
</script>

<style lang="sass" scoped>
  $colorWhite: #fff
  $colorDarkBlue: #2EA6E2
  *
    position: relative
    // border: solid 1px black
  hr
    padding: 0px
    margin: 0px -20px
  .filterBarBlock
    height: 96px
    background-color: $colorWhite
    transform: translateY(-130px)
    transition: 0.3s
    position: fixed
    width: 100%
    top: 230px
    z-index: 500
    box-shadow: 0px 15px 5px -15px #111
  .filterBar
    padding: 10px 20px
    position: absolute
    width: 100%
    .areaRoutes
      font-weight: 700
      margin-top: 20px
      margin-left: 10px
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
      #updateBtn
        margin-left: 10px
        cursor: pointer
        p
          padding: 3px 10px
          width: 150px
          text-align: center
          bottom: 5px
          background-color: $colorDarkBlue
          color: white
          border-radius: 4px
        p:hover
          background-color: rgba(#03D04D, 0.8)
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
    .downBar
      display: flex
      background-color: #fff
      margin-left: -20px
      margin-right: -20px
      padding-left: 20px
      box-shadow: 0 3px 2px -2px rgba(black, 0.1)
      .repairStatus, .areaRoutes
        display: flex
        margin-left: 10px
        margin-top: 10px
        p
          margin-right: 10px
          font-size: 14px
      .repairStatus
        p
          border-radius: 20px
          padding: 1px 5px
        .notyet
          background-color: #BBBBBB
          color: white
          font-weight: 600
</style>
