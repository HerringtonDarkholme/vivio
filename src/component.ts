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

export type Common<T, EndTag, Comp> =
  CompStart<For<Interpolate<T>, EndTag>, Comp>


export type ComponentB<Parent, End extends string, Comp, Comps> =
  Literal<
    If<
      Common<B<Close<Parent, End>, Comps>, Close<Parent, End>, Comp>,
      Common<B<Close<WithElse<Parent>, End>, Comps>, Close<WithElse<Parent>, End>, Comp>
    >
  >

export type ComponentP<Parent, End extends string, Comp, Comps> =
  Literal<
    If<
      Common<P<Close<Parent, End>, Comps>, Close<Parent, End>, Comp>,
      Common<P<Close<WithElse<Parent>, End>, Comps>, Close<WithElse<Parent>, End>, Comp>
    >
  >
