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

export type CompStart<Tag, Comp> = {
  class(nameHash: {[k: string]: boolean}): CompStart<Tag, Comp>
  on<T>(this: ComponentEventAux<T>, handlerHash: Handlers<T>): CompStart<Tag, Comp>
  props<C, K extends keyof C>(this: ComponentPropAux<C, K>, nameHash: Partial<Pick<C, K>>): CompStart<Tag, Comp>
  nativeOn(handlerHash: {[k: string]: Function}): CompStart<Tag, Comp>
  domProps(nameHash: {[k: string]: any}): CompStart<Tag, Comp>
 // 'componentTag': Comp
} & Tag

export type For<T, Tag, EndTag, Comp> = {
  for<A>(list: A[], func: (t: A, i: number, h: CompStart<Tag, Comp>) => T): EndTag
} & Tag

export type Common<T, EndTag, Comp> =
  CompStart<For<T, Interpolate<T>, EndTag, Comp>, Comp>


export type CloseC<Parent, End extends string, Comp> =
  Close<Parent, End> & {componentTag: Comp}

export type BIf<Parent, End extends string, Comps, Comp> = {
  if<Pt>(this: {parent: Pt}, condition: boolean): Common<B<CloseC<WithElse<Pt>, End, Comp>, Comps>, Close<WithElse<Pt>, End>, Comp>
} & Common<B<CloseC<Parent, End, Comp>, Comps>, Close<Parent, End>, Comp>

export type ComponentB<Parent, End extends string, Comp, Comps> =
  Literal<
    BIf<Parent, End, Comps, Comp>
  >

export type PIf<Parent, End extends string, Comps, Comp> = {
  if<Pt>(this: {parent: Pt}, condition: boolean): Common<P<CloseC<WithElse<Pt>, End, Comp>, Comps>, Close<WithElse<Pt>, End>, Comp>
} & Common<P<CloseC<Parent, End, Comp>, Comps>, Close<Parent, End>, Comp>

export type ComponentP<Parent, End extends string, Comp, Comps> =
  Literal<
    PIf<Parent, End, Comps, Comp >
  >
