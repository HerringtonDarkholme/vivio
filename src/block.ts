import {Phrase} from './phrase'
import {Void} from './void'
import {Text} from './text'
import {ComponentB} from './component'
import {Literal, Common, Close, WithElse, Template} from './basic'
import {List, Media, ObjectP, Select, Table, Dl} from './special'
import {Class, HTMLBrand} from './interface'

// export type BlockTags =
//   'a' | 'article' | 'aside' | 'blockquote' |
//   'canvas' | 'div' | 'fieldset' | 'figure' | 'footer' |
//   'form' | 'header' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' |
//   'h6' | 'iframe' | 'nav' | 'p' | 'section'
//    | 's' | 'address' | 'map' | 'u'

export type BB<EndTag, Comps> = {
  // [K in BlockTags]: Block<B<EndTag, Comps>, K, Comps>
  a: Block<B<EndTag, Comps>, 'a', Comps>
  article: Block<B<EndTag, Comps>, 'article', Comps>
  aside: Block<B<EndTag, Comps>, 'aside', Comps>
  blockquote: Block<B<EndTag, Comps>, 'blockquote', Comps>
  canvas: Block<B<EndTag, Comps>, 'canvas', Comps>
  div: Block<B<EndTag, Comps>, 'div', Comps>
  fieldset: Block<B<EndTag, Comps>, 'fieldset', Comps>
  figure: Block<B<EndTag, Comps>, 'figure', Comps>
  footer: Block<B<EndTag, Comps>, 'footer', Comps>
  form: Block<B<EndTag, Comps>, 'form', Comps>
  header: Block<B<EndTag, Comps>, 'header', Comps>
  h1: Block<B<EndTag, Comps>, 'h1', Comps>
  h2: Block<B<EndTag, Comps>, 'h2', Comps>
  h3: Block<B<EndTag, Comps>, 'h3', Comps>
  h4: Block<B<EndTag, Comps>, 'h4', Comps>
  h5: Block<B<EndTag, Comps>, 'h5', Comps>
  h6: Block<B<EndTag, Comps>, 'h6', Comps>
  iframe: Block<B<EndTag, Comps>, 'iframe', Comps>
  nav: Block<B<EndTag, Comps>, 'nav', Comps>
  p: Block<B<EndTag, Comps>, 'p', Comps>
  section: Block<B<EndTag, Comps>, 'section', Comps>

  // [K in PhraseTag]: Phrase<B<EndTag, Comps>, K, Comps>
  abbr: Phrase<B<EndTag, Comps>, 'abbr', Comps>
  b: Phrase<B<EndTag, Comps>, 'b', Comps>
  cite: Phrase<B<EndTag, Comps>, 'cite', Comps>
  code: Phrase<B<EndTag, Comps>, 'code', Comps>
  em: Phrase<B<EndTag, Comps>, 'code', Comps>
  i: Phrase<B<EndTag, Comps>, 'i', Comps>
  small: Phrase<B<EndTag, Comps>, 'small', Comps>
  strong: Phrase<B<EndTag, Comps>, 'strong', Comps>
  button: Phrase<B<EndTag, Comps>, 'button', Comps>
  caption: Phrase<B<EndTag, Comps>, 'caption', Comps>
  label: Phrase<B<EndTag, Comps>, 'label', Comps>
  legend: Phrase<B<EndTag, Comps>, 'legend', Comps>
  meter: Phrase<B<EndTag, Comps>, 'meter', Comps>
  progress: Phrase<B<EndTag, Comps>, 'progress', Comps>
  q: Phrase<B<EndTag, Comps>, 'q', Comps>
  span: Phrase<B<EndTag, Comps>, 'span', Comps>
  time: Phrase<B<EndTag, Comps>, 'time', Comps>

  // [K in VoidTags]: Void<B<EndTag, Comps>>
  br: Void<B<EndTag, Comps>>
  embed: Void<B<EndTag, Comps>>
  hr: Void<B<EndTag, Comps>>
  img: Void<B<EndTag, Comps>>
  input: Void<B<EndTag, Comps>>
  area: Void<B<EndTag, Comps>>

  // [K in TextTags]: Text<B<EndTag, Comps>>
  style: Text<B<EndTag, Comps>, 'style'>
  script: Text<B<EndTag, Comps>, 'script'>
  pre: Text<B<EndTag, Comps>, 'pre'>
  textarea: Text<B<EndTag, Comps>, 'textarea'>

  // specific tags
  ul: List<B<EndTag, Comps>, 'ul', Comps>
  ol: List<B<EndTag, Comps>, 'ol', Comps>
  video: Media<B<EndTag, Comps>, 'video'>
  audio: Media<B<EndTag, Comps>, 'audio'>
  object: ObjectP<B<EndTag, Comps>>,
  select: Select<B<EndTag, Comps>>,
  table: Table<B<EndTag, Comps>, Comps>,
  dl: Dl<B<EndTag, Comps>, Comps>

  // copmonents for programmatic usage
  tag<C>(comp: Class<C>): ComponentB<B<EndTag, Comps>, 'tag', C, Comps>
  tag(str: string): Block<B<EndTag, Comps>, 'tag', Comps>
  children(...children: Array<string|HTMLBrand>): B<EndTag, Comps>
  template: Template<B<EndTag, Comps>>
}

export type BC<EndTag, Comps> = {
  [K in keyof Comps]: ComponentB<B<EndTag, Comps>, K, Comps[K], Comps>
}

export type B<EndTag, Comps> =
  BB<EndTag, Comps> & BC<EndTag, Comps> & EndTag

export type If<Parent, End extends string, Comps> = {
  if<P>(this: {parent: P}, condition: boolean): Common<B<Close<WithElse<P>, End>, Comps>, Close<WithElse<P>, End>>
} & Common<B<Close<Parent, End>, Comps>, Close<Parent, End>>

// Literal > If > Start > For
export type Block<Parent, End extends string, Comps> =
  Literal<
    If< Parent, End, Comps >
  >
