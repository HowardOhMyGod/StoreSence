import WarnPage from './components/warning/Warning.vue'
import DataBoard from './components/dataBoard/DataBoard.vue'
import StoreWarn from './components/warning/StoreWarn.vue'


export const routes = [{
        path: '',
        redirect: {
            path: '/warning/store'
        }
    },
    {
        path: '/warning',
        component: WarnPage,
        redirect: {path: '/warning/store/文德店'},
        children: [{
            path: 'store/:name',
            component: StoreWarn
        }]
    },
    {
        path: '/data',
        component: DataBoard
    },
    {
        path: '*',
        redirect: {
            path: '/warning/store/文德店'
        }
    }
]
