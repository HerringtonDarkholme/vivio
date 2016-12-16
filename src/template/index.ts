import {HTML, Classes} from './interface'
declare var Proxy: any;
import {rootProxy} from './implementation'

export function html<T>(comps?: Classes<T>): HTML<T> {
  let root = {
    __components__: comps || {}
  }
  return new Proxy(root, rootProxy) as any
}
