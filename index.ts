import * as VueRouter from 'vue-router'
import * as Vue from 'vue'
import {create} from './src/store/opt'
import {getHelper} from './src/store/decorator'
export {getHelper} from './src/store/decorator'
export {create} from './src/store/opt'
export {Store} from './src/store/decorator'
import * as StoreInterface from './src/store/interface'
import {RouterOptions} from 'vue-router/types/router'
export {Extends} from './src/core/interface'

Vue.use(VueRouter)

export {getResult, setRenderContext, getResults} from './src/template/implementation'
export {Emitter} from './src/template/component'
export {html} from './src/template'

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
