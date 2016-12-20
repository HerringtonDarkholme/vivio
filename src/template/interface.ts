import {B} from './block'
import {Comp} from '../core/interface'

export type BaseComp = Comp<{}, {}, {}, {}, {}, {}, {}, {}>

export type Comps = {
  [k: string]: BaseComp
}

export declare class HTMLBrand {
  htmlBrand: {}
}

export type Transition = {
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

export type BuiltinComponents = {
  keepAlive: {
    $emit: {},
    props: {
      include: string | RegExp,
      exclude: string | RegExp
    }
  },
  transition: {
    $emit: {}
    props:  Transition
  }
  transitionGroup: {
    $emit: {},
    props: Transition & { tag: string, moveClass: string },
  },
  slot: {
    $emit: {},
    props: {
      name: string,
      [k: string]: any
    },
  }
}

export type HTML<Comps> = B<HTMLBrand, Comps&BuiltinComponents>
