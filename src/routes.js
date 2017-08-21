import WarnPage from './components/warning/Warning.vue'
import DataBoard from './components/dataBoard/DataBoard.vue'
import byDevice from './components/warning/byDevice.vue'
import byWarn from './components/warning/byWarn.vue'
import warnMsgAll from './components/warning/byWarnMsgContent/WarnAll.vue'
import warnMsgDetail from './components/warning/byWarnMsgContent/warnMsgDetail.vue'
import DevicePage from './components/deviceMoni/Device.vue'
import deviceInfo from './components/deviceMoni/deviceInfo/deviceInfo.vue'


export const routes = [{
        path: '',
        redirect: {
            path: '/warning/device'
        }
    },{
        path: '/warning',
        component: WarnPage,
        redirect: {path: '/warning/device'},
        children: [{
            path: 'device',
            component: byDevice
        },{
            path: 'warnMsg',
            component: byWarn,
            children: [{
              path: 'all',
              component: warnMsgAll
            },{
              path: ':type/:device',
              component: warnMsgDetail
            }]
        }]
    },{
        path: '/data',
        component: DataBoard
    },{
        path: '/device',
        component: DevicePage,
        children: [{
          path: 'detail/:name',
          component: deviceInfo
        }]
    },{
        path: '*',
        redirect: {
            path: '/warning/device'
        }
    }
]
