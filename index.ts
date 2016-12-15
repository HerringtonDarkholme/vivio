declare var Proxy: any;
import * as VueRouter from 'vue-router'
import * as Vue from 'vue'
import {create} from './src/store/opt'
import {getHelper} from './src/store/decorator'
export {getHelper} from './src/store/decorator'
export {create} from './src/store/opt'
export {Store} from './src/store/decorator'
import * as StoreInterface from './src/store/interface'
import {RouterOptions} from 'vue-router/types/router'

Vue.use(VueRouter)

import {HTML, Classes} from './src/template/interface'
import {rootProxy} from './src/template/implementation'
export {getResult, setRenderContext, getResults} from './src/template/implementation'

export function html<T>(comps?: Classes<T>): HTML<T> {
  let root = {
    __components__: comps || {}
  }
  return new Proxy(root, rootProxy) as any
}
export {Emitter} from './src/template/component'

export default {
  router(options?: VueRouter.RouterOptions) {
    return new VueRouter(options)
  },
  store: create,
  getHelper
}


// workaround
StoreInterface
export {RouterOptions}
