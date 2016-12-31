import {Literal, WithElse, For, ForTag} from './basic'

export type VoidTags =
  'br' | 'embed' | 'hr' | 'img' | 'input'
  // | 'area'

export type Common<T, EndTag> = {
  class(nameHash: {[k: string]: boolean}): Common<T, EndTag>
  on(handlerHash: {[k: string]: Function}): Common<T, EndTag>
  props(nameHash: {[k: string]: any}): Common<T, EndTag>
  for: For<Common<T, ForTag<EndTag>>>
} & T

export type If<Parent> = {
  if<P>(this: {parent: P}, condition: boolean): Common<V<WithElse<P>>, V<WithElse<P>>>
} & Common<V<Parent>, V<Parent>>

export interface V<Parent> {
  (): Parent
  parent: Parent
}

export type Void<Parent> =
  Literal<
    If< Parent >
  >
