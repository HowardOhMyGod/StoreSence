import {areaFilters} from '../data/store'

export const areaFilterMixin = {
  data () {
    return {
      selectArea:{
        selectCountry: 0,
        selectCity: 0,
        selectStore: ''
      },
      areaFilters
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
