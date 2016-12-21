import {Literal, Close, WithElse, ComponentSlotAux} from './basic'
import {B} from './block'
import {P} from './phrase'
import {HTMLBrand} from './interface'
import {Emitter} from '../core/interface'


export interface ComponentEventAux<T> {
  'componentTag': {
    $emit: Emitter<T>
  }
}
export interface ComponentPropAux<C> {
  'componentTag': {props: C}
}

export interface ComponentScopedSlot<T, Slots extends string> {
  'componentTag': {
    $scopedSlots: {
      [K in Slots]: (t: T) => HTMLBrand
    }
  }
}

export type Handlers<T> = {
  [K in keyof T]: (t: T[K]) => void
}

export type Common<T> = {
  class(nameHash: {[k: string]: boolean}): Common<T>
  on<E>(this: ComponentEventAux<E>, handlerHash: Handlers<E>): Common<T>
  props<C>(this: ComponentPropAux<C>, nameHash: Partial<C>): Common<T>
  nativeOn(handlerHash: {[k: string]: Function}): Common<T>
  domProps(nameHash: {[k: string]: any}): Common<T>
  style(nameHash: {[k: string]: any}): Common<T>
  attrs(nameHash: {[k: string]: any}): Common<T>
  asSlot<T>(this: ComponentSlotAux<T>, name: keyof T): Common<T>
  ref(name: string): Common<T>
  key(k: any): Common<T>
  directives(d: any): Common<T>
  // we can introduce another type parameter for better error report
  // not now for less memory consumption
  scopedSlot<S>(this: ComponentScopedSlot<S, 'default'>, fn: (k: S) => HTMLBrand): Common<T>
  scopedSlot<S, K extends string>(this: ComponentScopedSlot<S, K>, key: K, fn: (k: S) => HTMLBrand): Common<T>
} & T


export type CloseC<Parent, End extends string, Comp> =
  Close<Parent, End> & {componentTag: Comp}

export type BIf<Parent, End extends string, Comps, Comp> = {
  if<Pt>(this: {parent: Pt}, condition: boolean): Common<B<CloseC<WithElse<Pt>, End, Comp>, Comps>>
} & Common<B<CloseC<Parent, End, Comp>, Comps>>

export type ComponentB<Parent, End extends string, Comp, Comps> =
  Literal<
    BIf<Parent, End, Comps, Comp>
  >

export type PIf<Parent, End extends string, Comps, Comp> = {
  if<Pt>(this: {parent: Pt}, condition: boolean): Common<P<CloseC<WithElse<Pt>, End, Comp>, Comps>>
} & Common<P<CloseC<Parent, End, Comp>, Comps>>

export type ComponentP<Parent, End extends string, Comp, Comps> =
  Literal<
    PIf<Parent, End, Comps, Comp >
  >
