import {HTML, Comps} from './interface'
declare var Proxy: any;
import {rootProxy} from './implementation'

export function html<T extends Comps>(comps: T): HTML<T>
export function html(): HTML<never>
export function html<T extends Comps>(comps?: T): HTML<T> {
  let root = {
    __components__: comps || {}
  }
  return new Proxy(root, rootProxy)
}
