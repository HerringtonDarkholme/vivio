import * as VueRouter from 'vue-router'
import * as Vue from 'vue'
import {create} from './src/store/opt'
import * as StoreInterface from './src/store/interface'
import {RouterOptions} from 'vue-router/types/router'
import {Core} from './src/core/impl'
import {Extends} from './src/core/interface'

export type ComponentDef = Extends<never, never, never, never, never, never, never, never>
Vue.use(VueRouter)

export default {
  router(options?: VueRouter.RouterOptions) {
    return new VueRouter(options)
  },
  store: create,
  component(): ComponentDef {
    return new Core as any
  }
}


// workaround
StoreInterface
export {RouterOptions}
