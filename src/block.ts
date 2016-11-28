import {PhraseTags, Phrase} from './phrase'
import {VoidTags, Void} from './void'
import {Literal, If, Common, Close, WithElse} from './basic'
import {ListTags, List, MediaTags, Media, ObjectP, Select, Table, Dl} from './special'

export type BlockTags =
  'a' | 'article' | 'aside' | 'blockquote' |
  'canvas' | 'div' | 'fieldset' | 'figure' | 'footer' |
  'form' | 'header' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' |
  'h6' | 'iframe' | 'nav' | 'p' | 'section'
   // |
  // 's' |
  // 'address' |
  // 'map' |
  // 'u'

export type BB<EndTag> = {
  [K in BlockTags]: Block<B<EndTag>, K>
}

export type BP<EndTag> = {
  [K in PhraseTags]: Phrase<B<EndTag>, K>
}

export type BV<EndTag> = {
  [K in VoidTags]: Void<B<EndTag>>
}

export type BS<EndTag> = {
  [K in ListTags]: List<B<EndTag>, K>
} & {
  [K in MediaTags]: Media<B<EndTag>, K>
} & {
  object: ObjectP<B<EndTag>>,
  select: Select<B<EndTag>>,
  table: Table<B<EndTag>>,
  dl: Dl<B<EndTag>>
}

export type B<EndTag> = BB<EndTag> & BP<EndTag> & BV<EndTag> & BS<EndTag> & EndTag

// Literal > If > Start > For
export type Block<Parent, End extends string> =
  Literal<
    If<
      Common<B<Close<Parent, End>>, Close<Parent, End>>,
      Common<B<Close<WithElse<Parent>, End>>, Close<WithElse<Parent>, End>>
    >
  >
