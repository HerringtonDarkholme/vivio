import {PhraseTags, Phrase} from './phrase'
import {VoidTags, Void} from './void'
import {ComponentTags, ComponentB} from './component'
import {Literal, If, Common, Close, WithElse} from './basic'
import {List, Media, ObjectP, Select, Table, Dl} from './special'
import {Class} from './interface'

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
  [K in PhraseTags]: Phrase<B<EndTag, Comps>, K, Comps>
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
  ul: List<B<EndTag, Comps>, 'ul', Comps>
  ol: List<B<EndTag, Comps>, 'ol', Comps>
  video: Media<B<EndTag, Comps>, 'video'>
  audio: Media<B<EndTag, Comps>, 'audio'>
  object: ObjectP<B<EndTag, Comps>>,
  select: Select<B<EndTag, Comps>>,
  table: Table<B<EndTag, Comps>, Comps>,
  dl: Dl<B<EndTag, Comps>, Comps>
  tag<C>(comp: Class<C>): ComponentB<B<EndTag, Comps>, 'tag', C, Comps>
}

export type B<EndTag, Comps> =
  BK<EndTag, Comps> & BB<EndTag, Comps> & BC<EndTag, Comps> & BP<EndTag, Comps> & BV<EndTag, Comps> & BS<EndTag, Comps> & EndTag

// Literal > If > Start > For
export type Block<Parent, End extends string, Comps> =
  Literal<
    If<
      Common<B<Close<Parent, End>, Comps>, Close<Parent, End>>,
      Common<B<Close<WithElse<Parent>, End>, Comps>, Close<WithElse<Parent>, End>>
    >
  >
