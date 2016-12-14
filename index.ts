/// <reference types='kilimanjaro/dist/src/interface' />

declare var Proxy: any;
import * as VueRouter from 'vue-router'
import * as Vue from 'vue'
import {create, Store, getHelper} from 'kilimanjaro'
import * as StoreInterface from 'kilimanjaro/dist/src/interface'
import {RouterOptions} from 'vue-router/types/router'

export * from 'av-ts'
Vue.use(VueRouter)

import {HTML, Classes} from './src/interface'
import {rootProxy} from './src/implementation'

export function html<T>(comps?: Classes<T>): HTML<T> {
  let root = {
    __components__: comps || {}
  }
  return new Proxy(root, rootProxy) as any
}

export {Emitter} from './src/component'
import {setRenderContext, getResult} from './src/implementation'
export {setRenderContext, getResult, getResults} from './src/implementation'

export default {
  router(options?: VueRouter.RouterOptions) {
    return new VueRouter(options)
  },
  create, Store, getHelper
}


// workaround
StoreInterface
export {RouterOptions}
import {HTMLBrand} from './src/interface'
import {Component} from 'av-ts'
import {$$Prop} from 'av-ts/dist/src/interface'

export type ViewFunc = () => HTMLBrand
const VRENDER_KEY = '$$VRender' as $$Prop
const VRENDER = 'vrender'
export function VRender(target: Vue, key: 'vrender', _: TypedPropertyDescriptor<ViewFunc>) {
  target[VRENDER_KEY] = true
}
Component.register(VRENDER_KEY, function(proto, instance, options) {
  if (proto[VRENDER_KEY]) {
    let vrender = proto[VRENDER]
    options['render'] = function() {
      setRenderContext(this)
      let tree = vrender.call(this)
      return getResult(tree)
    }
    delete proto[VRENDER]
  }
})
