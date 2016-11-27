import {Literal, If, Common, WithElse, Close} from './basic'
export type TextTags = 'style' | 'script' | 'pre' | 'textarea'

export type T<EndTag> = EndTag
export type Text<Parent, End extends string> =
  Literal<
    If<
      Common<T<Close<Parent, End>>, Close<Parent, End>>,
      Common<T<Close<WithElse<Parent>, End>>, Close<WithElse<Parent>, End>>
    >
  >
