import {Literal, Interpolate, Close, WithElse} from './basic'
import {B} from './block'
import {P} from './phrase'

export type Emitter<T> = <K extends keyof T>(key: K, payload: T[K]) => void

export type ComponentEventAux<T> = {
  'componentTag': {
    $emit: Emitter<T>
  }
}
export type ComponentPropAux<C, K> = {
  'componentTag': C & {props: K}
}

export type Handlers<T> = {
  [K in keyof T]: (t: T[K]) => void
}

export type Common<T, EndTag> = {
  class(nameHash: {[k: string]: boolean}): Common<T, EndTag>
  on<E>(this: ComponentEventAux<E>, handlerHash: Handlers<E>): Common<T, EndTag>
  props<C, K extends keyof C>(this: ComponentPropAux<C, K>, nameHash: Partial<Pick<C, K>>): Common<T, EndTag>
  nativeOn(handlerHash: {[k: string]: Function}): Common<T, EndTag>
  domProps(nameHash: {[k: string]: any}): Common<T, EndTag>
  for<A>(list: A[], func: (t: A, i: number, h: Common<T, EndTag>) => T): EndTag
 // 'componentTag': Comp
} & Interpolate<T>


export type CloseC<Parent, End extends string, Comp> =
  Close<Parent, End> & {componentTag: Comp}

export type BIf<Parent, End extends string, Comps, Comp> = {
  if<Pt>(this: {parent: Pt}, condition: boolean): Common<B<CloseC<WithElse<Pt>, End, Comp>, Comps>, Close<WithElse<Pt>, End>>
} & Common<B<CloseC<Parent, End, Comp>, Comps>, Close<Parent, End>>

export type ComponentB<Parent, End extends string, Comp, Comps> =
  Literal<
    BIf<Parent, End, Comps, Comp>
  >

export type PIf<Parent, End extends string, Comps, Comp> = {
  if<Pt>(this: {parent: Pt}, condition: boolean): Common<P<CloseC<WithElse<Pt>, End, Comp>, Comps>, Close<WithElse<Pt>, End>>
} & Common<P<CloseC<Parent, End, Comp>, Comps>, Close<Parent, End>>

export type ComponentP<Parent, End extends string, Comp, Comps> =
  Literal<
    PIf<Parent, End, Comps, Comp >
  >
