import {VoidTags, Void} from './void'
import {Literal, If, Common, Close, WithElse} from './basic'

export type PhraseTags =
  'abbr' | 'b'  | 'bdo' | 'cite' | 'code' | 'dfn'   | 'em'     | 'i'   | 'kbd' |
  'rp' | 'rt'  | 'ruby' | 'samp' | 'small' | 'strong' | 'sub' | 'sup' | 'button' |
  'caption' | 'label' | 'legend' | 'meter' | 'progress' | 'q' | 'span' | 'time' |
  'ins' | 'del' // actually transparent content, put in phrase

export type PP<EndTag> = {
  [K in PhraseTags]: Phrase<P<EndTag>, K>
}
export type PV<EndTag> = {
  [K in VoidTags]: Void<P<EndTag>>
}
export type P<EndTag> = PP<EndTag> & PV<EndTag> & EndTag

export type Phrase<Parent, End extends string> =
  Literal<
    If<
      Common<P<Close<Parent, End>>, Close<Parent, End>>,
      Common<P<Close<WithElse<Parent>, End>>, Close<WithElse<Parent>, End>>
    >
  >
