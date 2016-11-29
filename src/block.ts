import {PhraseTags, Phrase} from './phrase'
import {VoidTags, Void} from './void'
import {ComponentTags, ComponentB} from './component'
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

export type BB<EndTag, Comps> = {
  [K in BlockTags]: Block<B<EndTag, Comps>, K, Comps>
}

export type BP<EndTag, Comps> = {
  [K in PhraseTags]: Phrase<B<EndTag, Comps>, K>
}

export type BV<EndTag, Comps> = {
  [K in VoidTags]: Void<B<EndTag, Comps>>
}

export type BC<EndTag, Comps> = {
  [K in ComponentTags]: Block<B<EndTag, Comps>, K, Comps>
}

export type BK<EndTag, Comps> = {
  [K in keyof Comps]: ComponentB<B<EndTag, Comps>, K, Comps[K], Comps>
}

export type BS<EndTag, Comps> = {
  [K in ListTags]: List<B<EndTag, Comps>, K, Comps>
} & {
  [K in MediaTags]: Media<B<EndTag, Comps>, K>
} & {
  object: ObjectP<B<EndTag, Comps>>,
  select: Select<B<EndTag, Comps>>,
  table: Table<B<EndTag, Comps>, Comps>,
  dl: Dl<B<EndTag, Comps>, Comps>
}

export type B<EndTag, Comps> = BK<EndTag, Comps> & BB<EndTag, Comps> & BC<EndTag, Comps> & BP<EndTag, Comps> & BV<EndTag, Comps> & BS<EndTag, Comps> & EndTag

// Literal > If > Start > For
export type Block<Parent, End extends string, Comps> =
  Literal<
    If<
      Common<B<Close<Parent, End>, Comps>, Close<Parent, End>>,
      Common<B<Close<WithElse<Parent>, End>, Comps>, Close<WithElse<Parent>, End>>
    >
  >
