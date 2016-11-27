import {Literal, If, Common, WithElse} from './basic'

export type VoidTags =
  'br' | 'embed' | 'hr' | 'img' | 'input'
  // | 'area'


export type V<EndTag> = EndTag
export type Void<Parent> =
  Literal<
    If<
      Common<V<() => Parent>, () => Parent>,
      Common<V<() => WithElse<Parent>>, () => WithElse<Parent>>
    >
  >
