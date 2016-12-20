import * as VueRouter from 'vue-router'
import * as Vue from 'vue'
import {store} from './src/store/opt'
import {vuexInit} from './src/store/helper'
import {component} from './src/core'

Vue.use(VueRouter)
Vue.mixin({ beforeCreate: vuexInit })

export default {
  router(options?: VueRouter.RouterOptions) {
    return new VueRouter(options)
  },
  store,
  component,
}

// workaround
import {Extends} from './src/core/interface'
import {Opt} from './src/store/interface'
import {RouterOptions} from 'vue-router/types/router'
export {RouterOptions}
export {Opt}
export {Extends}
