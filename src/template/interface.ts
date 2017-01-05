import {B} from './block'
import {Comp} from '../core/interface'

export interface BaseComp extends Comp<{}, {}, {}, {}, {}, {}, {}, {}> {}

export interface Comps {
  [k: string]: BaseComp
}

export declare class HTMLBrand {
  htmlBrand: {}
}

export interface TransitionProp {
    name?: string,
    appear?: boolean,
    css?: boolean,
    mode?: string,
    type?: string,
    enterClass?: string,
    leaveClass?: string,
    enterActiveClass?: string,
    leaveActiveClass?: string,
    appearClass?: string,
    appearActiveClass?: string,
}

export interface TransitionEvent {
  beforeEnter(el: HTMLElement, done: () => void): void
  enter(el: HTMLElement, done: () => void): void
  afterEnter(el: HTMLElement, done: () => void): void
  beforeLeave(el: HTMLElement, done: () => void): void
  leave(el: HTMLElement, done: () => void): void
  afterLeave(el: HTMLElement, done: () => void): void
  beforeAppear(el: HTMLElement, done: () => void): void
  appear(el: HTMLElement, done: () => void): void
  afterAppear(el: HTMLElement, done: () => void): void
}

export interface VueLocation {
  path?: string
  name?: string
  params?: any
}

export interface KeepAlive {
    props: {
      include?: string | RegExp,
      exclude?: string | RegExp
    }
}

export interface RouterLink {
    props: {
      to: string | VueLocation,
      replace?: boolean,
      append?: boolean,
      tag?: string,
      activeClass?: string,
      exact?: boolean,
      events?: string[],
    }
}

export interface RouterView {
    props: {
      name?: string,
    }
}

export interface Transition {
    props:  TransitionProp
    $emit: TransitionEvent
}

export interface TransitionGroup {
    props: TransitionProp & { tag?: string, moveClass?: string },
    $emit: TransitionEvent
}

export interface BuiltinComponents {
  keepAlive: KeepAlive,
  transition: Transition
  transitionGroup: TransitionGroup
  routerLink: RouterLink
  routerView: RouterView
}

export type HTML<Comps> = B<HTMLBrand, Comps&BuiltinComponents>
