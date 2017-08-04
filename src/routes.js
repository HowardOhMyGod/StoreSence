import WarnPage from './components/warning/Warning.vue'
import DataBoard from './components/dataBoard/DataBoard.vue'


export const routes = [
  {path: '', redirect: {path:'/warning'}},
  {path: '/warning', component: WarnPage},
  {path: '/data', component: DataBoard}
]
