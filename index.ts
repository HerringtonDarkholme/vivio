import {HTML, Classes} from './src/interface'
import {proxyHandler, COMPONENT_KEY, closeTag} from './src/implementation'

export default function h<T>(comps?: Classes<T>): HTML<T> {
  function html(this: any) {
    return closeTag.apply(this, arguments)
  }
  html[COMPONENT_KEY] = comps || {}
  return new Proxy(html, proxyHandler)
}

export {Emitter} from './src/component'
export {setRenderContext, getResult} from './src/implementation'
