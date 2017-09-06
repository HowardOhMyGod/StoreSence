export const areaFilters = {
    countrys: [{
        name: '台灣',
        citys: [{
          name: '所有縣市',
          districts: [{
            name: '所有地區',
            stores: ['所有店家']
          }]
        },{
            name: '台北市',
            districts: [{
                name: '內湖區',
                stores:['文德店', '大湖店']
            }, {
                name: '松山區',
                stores:['機場店', '饒河店']
            }]
        }, {
            name: '新北市',
            districts: [{
                name: '蘆洲區',
                stores:['徐匯店', '三和店']
            }, {
                name: '三重區',
                stores:['五華店', '台北橋店']
            }]
        }]
    }]
}
