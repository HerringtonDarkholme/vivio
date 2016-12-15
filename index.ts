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

export {
  Component, Lifecycle, Prop, p,
  Transition, Watch, Data, Mixin,
  Trait, Vue
} from 'av-ts'
Vue.use(VueRouter)

import {HTML, Classes} from './src/template/interface'
import {rootProxy} from './src/template/implementation'

export function html<T>(comps?: Classes<T>): HTML<T> {
  let root = {
    __components__: comps || {}
  }
  return new Proxy(root, rootProxy) as any
}

export {Emitter} from './src/template/component'
import {setRenderContext, getResult} from './src/template/implementation'
export {setRenderContext, getResult, getResults} from './src/template/implementation'

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
import {HTMLBrand} from './src/template/interface'
import {Component} from 'av-ts'
import {$$Prop} from 'av-ts/dist/src/interface'

export type ViewFunc = () => HTMLBrand
const VRENDER_KEY = '$$VRender' as $$Prop
const VRENDER = 'render'
export function Render(target: Vue, key: 'render', _: TypedPropertyDescriptor<ViewFunc>) {
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
