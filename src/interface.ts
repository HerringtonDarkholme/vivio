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
    props: keyof Transition,
    $emit: {}
}

export type BuiltinComponents = {
  keepAlive: {
    $emit: {},
    props: 'include' | 'exclude',
    include: string | RegExp,
    exclude: string | RegExp
  },
  transition: Transition,
  transitionGroup: Transition & { tag: string, moveClass: string },
  slot: {
    $emit: {},
    name: string,
    props: string,
    [k: string]: any
  }
}

export type HTML<Comps> = B<HTMLBrand, Comps & BuiltinComponents>
