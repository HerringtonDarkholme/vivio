import {Literal, If, For, Interpolate, Close, WithElse} from './basic'
import {B} from './block'
import {P} from './phrase'

export type ComponentTags = 'component' | 'keepAlive' | 'transition' | 'transition-group' | 'slot'

export type ComponentEventAux<T> = {
  '@@componentTag': {
    $emit: T
  }
}
export type ComponentPropAux<C> = {
  '@@componentTag': C
}

export type CompStart<Tag, Comp> = {
  class(nameHash: {[k: string]: boolean}): CompStart<Tag, Comp>
  on<T>(this: ComponentEventAux<T>, handlerHash: T): CompStart<Tag, Comp>
  props<C>(this: ComponentPropAux<C>, nameHash: Partial<C>): CompStart<Tag, Comp>
  nativeOn(handlerHash: {[k: string]: Function}): CompStart<Tag, Comp>
  domProps(nameHash: {[k: string]: any}): CompStart<Tag, Comp>
 '@@componentTag': Comp
} & Tag

export type KB<EndTag, Comps> = {
  [K in keyof Comps]: ComponentB<KB<EndTag, Comps>, K, Comps[K], Comps>
} & B<EndTag, Comps>
export type KP<EndTag, Comps> = {
  [K in keyof Comps]: ComponentP<KP<EndTag, Comps>, K, Comps[K], Comps>
} & P<EndTag>

export type Common<T, EndTag, Comp> =
  CompStart<For<Interpolate<T>, EndTag>, Comp>


export type ComponentB<Parent, End extends string, Comp, Comps> =
  Literal<
    If<
      Common<KB<Close<Parent, End>, Comps>, Close<Parent, End>, Comp>,
      Common<KB<Close<WithElse<Parent>, End>, Comps>, Close<WithElse<Parent>, End>, Comp>
    >
  >

export type ComponentP<Parent, End extends string, Comp, Comps> =
  Literal<
    If<
      Common<KP<Close<Parent, End>, Comps>, Close<Parent, End>, Comp>,
      Common<KP<Close<WithElse<Parent>, End>, Comps>, Close<WithElse<Parent>, End>, Comp>
    >
  >
