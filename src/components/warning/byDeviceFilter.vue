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
          p(@click="navigatePage()") 更新資訊
      hr
      .downBar
        .repairStatus
          p.notyet 未處理
          p 處理中
          p 已完成
        .areaRoutes
          p {{currentStorePath}}
</template>

<script>
import {eventBus} from '../../main'
import {areaFilterMixin} from '../../mixin/areaFilter'
export default {
  mixins: [areaFilterMixin],
  data () {
    return {
      filterBarBlockOpen: null
    }
  },
  methods: {
    navigatePage() {
      this.$router.push(`/warning/store/${this.selectArea.selectStore}`)
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
    height: 90px
    background-color: $colorWhite
    transform: translateY(-130px)
    transition: 0.3s
    z-index: 500
    width: 100%
    position: fixed
  .filterBar
    padding: 10px 20px
    position: absolute
    width: 100%
    .areaFilter
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
    .downBar
      display: flex
      background-color: #fff
      margin-left: -20px
      margin-right: -20px
      padding-left: 20px
      // box-shadow: 0px 2px 15px -5px rgba(black, 0.7)
      box-shadow: 0px 15px 10px -15px #111
      z-index: 2000
      .repairStatus, .areaRoutes
        display: flex
        margin-left: 10px
        margin-top: 10px
        p
          margin-right: 10px
          font-size: 14px
      .areaRoutes
        font-weight: 700
        top: 1px
      .repairStatus
        p
          border-radius: 20px
          padding: 1px 5px
        .notyet
          background-color: #BBBBBB
          color: white
          font-weight: 600
</style>
