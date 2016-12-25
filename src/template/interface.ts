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

export interface VueLocation {
  path?: string
  name?: string
  params?: any
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
  routerLink: {
    props: {
      to: string | VueLocation,
      replace: boolean,
      append: boolean,
      tag: string,
      activeClass: string,
      exact: boolean,
      events: string[],
    }
  },
  routerView: {
    props: {
      name: string,
    }
  }
}

export type HTML<Comps> = B<HTMLBrand, Comps&BuiltinComponents>
