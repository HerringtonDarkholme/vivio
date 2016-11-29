import {VoidTags, Void} from './void'
import {ComponentTags} from './component'
import {Literal, If, Common, Close, WithElse} from './basic'
import {MediaTags, Media, ObjectP, Select} from './special'

export type PhraseTags =
  'abbr' | 'b' | 'cite' | 'code' | 'em' | 'i' |
  'small' | 'strong' | 'button' | 'caption' | 'label' |
  'legend' | 'meter' | 'progress' | 'q' | 'span' | 'time'
    // |
  // 'sub' | 'sup' | 'rp' | 'rt'  | 'ruby' | 'samp' |
  // 'bdo' | 'dfn'   | 'kbd' |
  // 'ins' | 'del' // actually transparent content, put in phrase

export type PP<EndTag> = {
  [K in PhraseTags]: Phrase<P<EndTag>, K>
}
export type PV<EndTag> = {
  [K in VoidTags]: Void<P<EndTag>>
}
export type PC<EndTag> = {
  [K in ComponentTags]: Phrase<P<EndTag>, K>
}

export type PS<EndTag> = {
  [K in MediaTags]: Media<P<EndTag>, K>
} & {
  object: ObjectP<P<EndTag>>,
  select: Select<P<EndTag>>
}

export type P<EndTag> = PC<EndTag> & PP<EndTag> & PV<EndTag> & EndTag

export type Phrase<Parent, End extends string> =
  Literal<
    If<
      Common<P<Close<Parent, End>>, Close<Parent, End>>,
      Common<P<Close<WithElse<Parent>, End>>, Close<WithElse<Parent>, End>>
    >
  >
