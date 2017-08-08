import WarnPage from './components/warning/Warning.vue'
import DataBoard from './components/dataBoard/DataBoard.vue'
import StoreWarn from './components/warning/StoreWarn.vue'


export const routes = [
  {path: '', redirect: {path:'/warning'}},
  {path: '/warning', component: WarnPage, children: [
    {path: 'store', component: StoreWarn}
  ]},
  {path: '/data', component: DataBoard}
]
