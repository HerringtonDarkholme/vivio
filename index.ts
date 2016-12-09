import {HTML, Classes} from './src/interface'
import {rootProxy} from './src/implementation'

export default function h<T>(comps?: Classes<T>): HTML<T> {
  let root = {
    __components__: comps || {}
  }
  return new Proxy(root, rootProxy) as any
}

export {Emitter} from './src/component'
export {setRenderContext, getResult} from './src/implementation'
