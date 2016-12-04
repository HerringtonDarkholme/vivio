import {HTML, Classes} from './src/interface'
import {html} from './src/implementation'

export default function h<T>(comps: Classes<T>): HTML<T> {
  return html
}

export {Emitter} from './src/component'
export {html, setRenderContext} from './src/implementation'
