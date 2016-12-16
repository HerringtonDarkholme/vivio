import {Extends} from './interface'
import {ComponentOptions} from 'vue/types/options'
// import {getResult, setRenderContext} from '../template/implementation'
// import {html} from '../template'
import * as Vue from 'vue'

export class Core implements Extends<{}, {}, {}, {}, {}, {}> {
  _options: ComponentOptions<Vue> = {}
  extends(opt: {}) {
    this._options.extends = opt
    return this
  }
  mixin(opt: {}) {
    let mixins = this._options.mixins = this._options.mixins || []
    mixins.push(opt)
    return this
  }
  props(opt: {}) {
    this._options.props = opt
    return this
  }
  data(fn: Function) {
    this._options.data = function(this: {}) {
      return fn.call(this, this)
    }
    return this
  }
  emit() {
    return this
  }
  scopedSlots() {
    return this
  }
  slots() {
    return this
  }
  computed(opt: {}) {
    let computed = this._options.computed = this._options.computed || {}
    for (let key of Object.keys(opt)) {
      computed[key] = opt[key]
    }
    return this
  }
  methods(opt: {}) {
    let methods = this._options.methods = this._options.methods || {}
    for (let key of Object.keys(opt)) {
      methods[key] = opt[key]
    }
    return this
  }
  components(opt: {}) {
    this._options.components = opt
    return this
  }
  render(fn: any) {
    // let h = (html as any)({})
    // this._options.render = function(this: any) {
    //   setRenderContext(this)
    //   let ret = fn.call(this, h, this)
    //   return getResult(ret)
    // }
    return this
  }
  watch(opt: {}) {
    let watch = this._options.watch = this._options.watch || {}
    for (let key of Object.keys(opt)) {
      watch[key] = opt[key]
    }
    return this
  }
  lifecycle(opt: {}) {
    for (let key of Object.keys(opt)) {
      this._options[key] = opt[key]
    }
    return this
  }
  options(opt: {}) {
    for (let key of Object.keys(opt)) {
      this._options[key] = opt[key]
    }
    return this
  }
  done() {
    return this._options as any
  }
  _props: {}
  _data: () => {}
  _computed: {}
  _methods: {}
  _components: {}
  _assorted: {
    $emit: {}
    $scopedSlots: {}
    $slots: {}
  }
}
