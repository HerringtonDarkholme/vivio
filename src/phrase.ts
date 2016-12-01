import {VoidTags, Void} from './void'
import {ComponentP} from './component'
import {Literal, Common, Close, WithElse} from './basic'
import {Media, ObjectP, Select} from './special'
import {Class} from './interface'

export type PhraseTags =
  'abbr' | 'b' | 'cite' | 'code' | 'em' | 'i' |
  'small' | 'strong' | 'button' | 'caption' | 'label' |
  'legend' | 'meter' | 'progress' | 'q' | 'span' | 'time'
    // |
  // 'sub' | 'sup' | 'rp' | 'rt'  | 'ruby' | 'samp' |
  // 'bdo' | 'dfn'   | 'kbd' |
  // 'ins' | 'del' // actually transparent content, put in phrase

export type PP<EndTag, Comps> = {
  [K in PhraseTags]: Phrase<P<EndTag, Comps>, K, Comps>
}
export type PV<EndTag, Comps> = {
  [K in VoidTags]: Void<P<EndTag, Comps>>
}

export type PC<EndTag, Comps> = {
  [K in keyof Comps]: ComponentP<P<EndTag, Comps>, K, Comps[K], Comps>
}

export type PS<EndTag, Comps> = {
  video: Media<P<EndTag, Comps>, 'video'>
  audio: Media<P<EndTag, Comps>, 'audio'>
  object: ObjectP<P<EndTag, Comps>>,
  select: Select<P<EndTag, Comps>>
  tag<C>(comp: Class<C>): ComponentP<P<EndTag, Comps>, 'tag', C, Comps>
}

export type P<EndTag, Comps> = PC<EndTag, Comps> & PP<EndTag, Comps> & PV<EndTag, Comps> & EndTag

export type If<Parent, End extends string, Comps> = {
  if<Pt>(this: {parent: Pt}, condition: boolean): Common<P<Close<WithElse<Pt>, End>, Comps>, Close<WithElse<Pt>, End>>
} & Common<P<Close<Parent, End>, Comps>, Close<Parent, End>>

export type Phrase<Parent, End extends string, Comps> =
  Literal<
    If<Parent, End, Comps>
  >
