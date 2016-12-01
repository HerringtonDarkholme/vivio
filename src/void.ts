import {Literal, Start, For, WithElse} from './basic'

export type VoidTags =
  'br' | 'embed' | 'hr' | 'img' | 'input'
  // | 'area'

export type If<Parent> = {
  if<P>(this: {parent: P}, condition: boolean): Start<For<V<P>, V<WithElse<P>>, V<WithElse<P>>>>
} & Start<For<V<Parent>, V<Parent>, V<Parent>>>

export type V<Parent> = (() => Parent) & {parent: Parent}
export type Void<Parent> =
  Literal<
    If< Parent >
  >
