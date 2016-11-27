import {PhraseTags, Phrase} from './phrase'
import {VoidTags, Void} from './void'
import {ListTags, List} from './special'
import {Literal, If, Common, Close, WithElse} from './basic'

export type BlockTags =
  'a' | 'address' | 'article' | 'aside' | 'blockquote' |
  'canvas' | 'div' | 'fieldset' | 'figure' | 'footer' |
  'form' | 'header' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' |
  'h6' | 'iframe' | 'map' | 'nav' | 'p' | 's' | 'section' | 'u'

export type BB<EndTag> = {
  [K in BlockTags]: Block<B<EndTag>, K>
}

export type BP<EndTag> = {
  [K in PhraseTags]: Phrase<B<EndTag>, K>
}

export type BV<EndTag> = {
  [K in VoidTags]: Void<B<EndTag>>
}

export type B<EndTag> = BB<EndTag> & BP<EndTag> & BV<EndTag>  & {
  [K in ListTags]: List<B<EndTag>, K>
} & EndTag

// Literal > If > Start > For
export type Block<Parent, End extends string> =
  Literal<
    If<
      Common<B<Close<Parent, End>>, Close<Parent, End>>,
      Common<B<Close<WithElse<Parent>, End>>, Close<WithElse<Parent>, End>>
    >
  >
