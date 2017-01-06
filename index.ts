import * as VueRouter from 'vue-router'
import * as Vue from 'vue'
import {store} from './src/store/opt'
import {vuexInit} from './src/store/helper'
import {component} from './src/core'
import {Comp} from './src/core/interface'
import {BaseStore} from './src/store/interface'
import {p} from './src/core'
export {html} from './src/template'

Vue.use(VueRouter)
Vue.mixin({beforeCreate: vuexInit})

export interface InitDef {
  component?: Comp<{},{},{},{},{},{},{},{}>
  store?: BaseStore
  router?: VueRouter
  el?: string
}

const defaultComponent = component()
  .render(h => h.div`#app`.routerView.routerView().div())
  .done()

function start(initDef: InitDef = {}) {
  const {
    component: comp = defaultComponent,
    store, router,
    el = '#app'
  } = initDef
  if (!comp['el']) {
    comp['el'] = el
  }
  if (store) {
    comp['store']  = store
  }
  if (router) {
    comp['router'] = router
  }
  return new Vue(comp)
}

export default {
  router(options?: VueRouter.RouterOptions) {
    return new VueRouter(options)
  },
  store,
  component,
  start,
  p
}

// workaround
import * as CoreInterface from './src/core'
import {Extends, HotModule} from './src/core/interface'
import {RouterOptions} from 'vue-router/types/router'
import * as StoreInterface from './src/store/interface'
export {
  Extends, HotModule,
  CoreInterface, StoreInterface, RouterOptions,
  p, Vue
}
