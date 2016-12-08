import {HTML, Classes} from './src/interface'
import {proxyHandler, TagTree, closeTag} from './src/implementation'

export default function h<T>(comps?: Classes<T>): HTML<T> {
  function html(this: any) {
    return closeTag.apply(this, arguments)
  }
  let _html: {__tagTree: TagTree} = html as any
  _html.__tagTree = {
    __components__: comps,
    lastIfValue: false,
    shouldRender: true,
    tagStack: [],
    result: undefined,
  }
  return new Proxy(html as any, proxyHandler)
}

export {Emitter} from './src/component'
export {setRenderContext, getResult} from './src/implementation'
