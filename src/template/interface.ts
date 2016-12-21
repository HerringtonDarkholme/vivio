import {B} from './block'
import {Comp} from '../core/interface'

export interface BaseComp extends Comp<{}, {}, {}, {}, {}, {}, {}, {}> {}

export interface Comps {
  [k: string]: BaseComp
}

export declare class HTMLBrand {
  htmlBrand: {}
}

export interface Transition {
    name: string,
    appear: boolean,
    css: boolean,
    mode: string,
    type: string,
    enterClass: string,
    leaveClass: string,
    enterActiveClass: string,
    leaveActiveClass: string,
    appearClass: string,
    appearActiveClass: string,
}

export interface BuiltinComponents {
  keepAlive: {
    props: {
      include: string | RegExp,
      exclude: string | RegExp
    }
  },
  transition: {
    props:  Transition
  }
  transitionGroup: {
    props: Transition & { tag: string, moveClass: string },
  },
  // slot: {
  //   $emit: {},
  //   props: {
  //     name: string,
  //     [k: string]: any
  //   },
  // }
}

export type HTML<Comps> = B<HTMLBrand, Comps&BuiltinComponents>
