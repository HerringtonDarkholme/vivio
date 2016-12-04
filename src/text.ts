import {Literal, Common, WithElse, Close} from './basic'
// export type TextTags = 'style' | 'script' | 'pre' | 'textarea'

export type If<Parent, End extends string> = {
  if<Pt>(this: {parent: Pt}, condition: boolean): Common<T<Close<WithElse<Pt>, End>>, Close<WithElse<Pt>, End>>
} & Common<T<Close<Parent, End>>, Close<Parent, End>>
export type T<EndTag> = EndTag
export type Text<Parent, End extends string> =
  Literal<
    If<Parent, End>
  >
