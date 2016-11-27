import {Void} from './void'
import {Block} from './block'
import {Text} from './text'
import {Literal, If, Common, Close, WithElse} from './basic'
import {HTML} from './interface'

export type ListTags = 'ul' | 'ol'

export type L<EndTag> = { li: Block<L<EndTag>, 'li'> } & EndTag
export type List<Parent, End extends string> =
  Literal<
    If<
      Common<L<Close<Parent, End>>, Close<Parent, End>>,
      Common<L<Close<WithElse<Parent>, End>>, Close<WithElse<Parent>, End>>
    >
  >

export type MediaTags = 'audio' | 'video'
export type MV<EndTag> = { source: Void<M<EndTag>>, track: Void<M<EndTag>> } & EndTag
export type M<EndTag> = MV<EndTag> & EndTag & { fallback(h: HTML): M<EndTag> }
export type Media<Parent, End extends string> =
  Literal<
    If<
      Common<M<Close<Parent, End>>, Close<Parent, End>>,
      Common<M<Close<WithElse<Parent>, End>>, Close<WithElse<Parent>, End>>
    >
  >

export type ObjectTags = 'object'
export type OV<EndTag> = { param: Void<O<EndTag>> } & EndTag
export type O<EndTag> = OV<EndTag> & EndTag & {fallback(h: HTML): O<EndTag>}
export type Object<Parent, End extends string> =
  Literal<
    If<
      Common<O<Close<Parent, End>>, Close<Parent, End>>,
      Common<O<Close<WithElse<Parent>, End>>, Close<WithElse<Parent>, End>>
    >
  >

export type Optgroup<EndTag> = {option: Text<Optgroup<EndTag>, 'option'>}
export type S<EndTag> = {
  optgroup: Optgroup<EndTag>,
  option: Text<S<EndTag>, 'option'>
} & EndTag
export type Select<Parent, End extends string> =
  Literal<
    If<
      Common<S<Close<Parent, End>>, Close<Parent, End>>,
      Common<S<Close<WithElse<Parent>, End>>, Close<WithElse<Parent>, End>>
    >
  >

export type Tabel =
'table' |
'tr' |
'tbody' |
'thead' |
'tfoot' |
'td' |
'th' |
'colgroup' | // only col
'col' // void

export type DL =
'dialog' |
'dl' |
'dd' |
'dt'

export type datalist =
  'datalist' | 'option'
export type Menu =
'menu' | 'menuitem' // void


// under head, void
export type MetadataContent =
  'base' | 'link' | 'meta' | 'title'


