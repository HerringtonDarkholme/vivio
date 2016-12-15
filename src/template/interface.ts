import {B} from './block'

export type Class<C> = {
  new(): C
}

export type Classes<T> = {
  [K in keyof T]: Class<T[K]>
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

export type HTML<Comps> = B<HTMLBrand, Comps & BuiltinComponents>
