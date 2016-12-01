import {Literal, Start, WithElse} from './basic'

export type VoidTags =
  'br' | 'embed' | 'hr' | 'img' | 'input'
  // | 'area'

export type If<Parent> = {
  if<P>(this: {parent: P}, condition: boolean): Start<V<WithElse<P>>, V<WithElse<P>>>
} & Start<V<Parent>, V<Parent>>

export type V<Parent> = (() => Parent) & {parent: Parent}
export type Void<Parent> =
  Literal<
    If< Parent >
  >
