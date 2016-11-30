import {Literal, If, Start, For, WithElse} from './basic'

export type VoidTags =
  'br' | 'embed' | 'hr' | 'img' | 'input'
  // | 'area'


export type V<EndTag> = EndTag
export type Void<Parent> =
  Literal<
    If<
      Start<For<V<() => Parent>, V<() => Parent>, () => Parent>>,
      Start<For<V<() => Parent>, V<() => WithElse<Parent>>, () => WithElse<Parent>>>
    >
  >
