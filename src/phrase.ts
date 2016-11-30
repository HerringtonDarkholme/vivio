import {VoidTags, Void} from './void'
import {ComponentTags, ComponentP} from './component'
import {Literal, If, Common, Close, WithElse} from './basic'
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
  [K in ComponentTags]: Phrase<P<EndTag, Comps>, K, Comps>
}

export type PK<EndTag, Comps> = {
  [K in keyof Comps]: ComponentP<P<EndTag, Comps>, K, Comps[K], Comps>
}

export type PS<EndTag, Comps> = {
  video: Media<P<EndTag, Comps>, 'video'>
  audio: Media<P<EndTag, Comps>, 'audio'>
  object: ObjectP<P<EndTag, Comps>>,
  select: Select<P<EndTag, Comps>>
  tag<C>(comp: Class<C>): ComponentP<P<EndTag, Comps>, 'tag', C, Comps>
}

export type P<EndTag, Comps> = PK<EndTag, Comps> & PC<EndTag, Comps> & PP<EndTag, Comps> & PV<EndTag, Comps> & EndTag

export type Phrase<Parent, End extends string, Comps> =
  Literal<
    If<
      Common<P<Close<Parent, End>, Comps>, Close<Parent, End>>,
      Common<P<Close<WithElse<Parent>, End>, Comps>, Close<WithElse<Parent>, End>>
    >
  >
