import {Literal, If, Common, WithElse} from './basic'

export type VoidTags =
  'area' | 'br' | 'embed' | 'hr' | 'img' | 'input' | 'link'


export type V<EndTag> = EndTag
export type Void<Parent> =
  Literal<
    If<
      Common<V<() => Parent>, () => Parent>,
      Common<V<() => WithElse<Parent>>, () => WithElse<Parent>>
    >
  >
