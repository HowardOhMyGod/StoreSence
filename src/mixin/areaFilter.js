import {areaFilters} from '../data/store'

export const areaFilterMixin = {
  data () {
    return {
      selectArea:{
        selectCountry: 0,
        selectCity: 0,
        selectDistrict: 0,
        selectStore: '文德店'
      },
      areaFilters
    }
  },
  computed: {
    // return cityList base on country
    cityList() {
      return this.areaFilters.countrys[this.selectArea.selectCountry].citys

    },
    districtList() {
      return this.cityList[this.selectArea.selectCity].districts

    },
    // return storeList base on city
    storeList() {
      return this.districtList[this.selectArea.selectDistrict].stores
    }
  }
}
