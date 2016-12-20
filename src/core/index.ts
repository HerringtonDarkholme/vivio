import {Core} from './impl'
import {Extends} from './interface'
export type ComponentDef = Extends<never, never, never, never, never, never, never, never>

export function component(): ComponentDef {
  return new Core as ComponentDef
}
