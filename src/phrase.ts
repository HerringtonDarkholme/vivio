import {Void} from './void'
import {ComponentP} from './component'
import {Text} from './text'
import {Literal, Common, Close, WithElse} from './basic'
import {Media, ObjectP, Select} from './special'
import {Class, HTML} from './interface'

// export type PhraseTags =
//   'abbr' | 'b' | 'cite' | 'code' | 'em' | 'i' |
//   'small' | 'strong' | 'button' | 'caption' | 'label' |
//   'legend' | 'meter' | 'progress' | 'q' | 'span' | 'time'
//   |
//   'sub' | 'sup' | 'rp' | 'rt'  | 'ruby' | 'samp' |
//   'bdo' | 'dfn'   | 'kbd' |
//   'ins' | 'del' // actually transparent content, put in phrase

export type PP<EndTag, Comps> = {
  // [K in PhraseTags]: Phrase<P<EndTag, Comps>, K, Comps>
  abbr: Phrase<P<EndTag, Comps>, 'abbr', Comps>
  b: Phrase<P<EndTag, Comps>, 'b', Comps>
  cite: Phrase<P<EndTag, Comps>, 'cite', Comps>
  code: Phrase<P<EndTag, Comps>, 'code', Comps>
  em: Phrase<P<EndTag, Comps>, 'code', Comps>
  i: Phrase<P<EndTag, Comps>, 'i', Comps>
  small: Phrase<P<EndTag, Comps>, 'small', Comps>
  strong: Phrase<P<EndTag, Comps>, 'strong', Comps>
  button: Phrase<P<EndTag, Comps>, 'button', Comps>
  caption: Phrase<P<EndTag, Comps>, 'caption', Comps>
  label: Phrase<P<EndTag, Comps>, 'label', Comps>
  legend: Phrase<P<EndTag, Comps>, 'legend', Comps>
  meter: Phrase<P<EndTag, Comps>, 'meter', Comps>
  progress: Phrase<P<EndTag, Comps>, 'progress', Comps>
  q: Phrase<P<EndTag, Comps>, 'q', Comps>
  span: Phrase<P<EndTag, Comps>, 'span', Comps>
  time: Phrase<P<EndTag, Comps>, 'time', Comps>

  // text tag
  style: Text<P<EndTag, Comps>, 'style'>
  script: Text<P<EndTag, Comps>, 'script'>
  pre: Text<P<EndTag, Comps>, 'pre'>
  textarea: Text<P<EndTag, Comps>, 'textarea'>

  // [K in VoidTags]: Void<B<EndTag, Comps>>
  br: Void<P<EndTag, Comps>>
  embed: Void<P<EndTag, Comps>>
  hr: Void<P<EndTag, Comps>>
  img: Void<P<EndTag, Comps>>
  input: Void<P<EndTag, Comps>>
  area: Void<P<EndTag, Comps>>

  // special tag
  video: Media<P<EndTag, Comps>, 'video'>
  audio: Media<P<EndTag, Comps>, 'audio'>
  object: ObjectP<P<EndTag, Comps>>,
  select: Select<P<EndTag, Comps>>
  tag<C>(comp: Class<C>): ComponentP<P<EndTag, Comps>, 'tag', C, Comps>
  tag(str: string): Phrase<P<EndTag, Comps>, 'tag', Comps>
  // for programmatic usage
  children(...children: Array<string|HTML<{}>>): P<EndTag, Comps>
}

export type PC<EndTag, Comps> = {
  [K in keyof Comps]: ComponentP<P<EndTag, Comps>, K, Comps[K], Comps>
}

export type P<EndTag, Comps> = PC<EndTag, Comps> & PP<EndTag, Comps> &  EndTag

export type If<Parent, End extends string, Comps> = {
  if<Pt>(this: {parent: Pt}, condition: boolean): Common<P<Close<WithElse<Pt>, End>, Comps>, Close<WithElse<Pt>, End>>
} & Common<P<Close<Parent, End>, Comps>, Close<Parent, End>>

export type Phrase<Parent, End extends string, Comps> =
  Literal<
    If<Parent, End, Comps>
  >
