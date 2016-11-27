import {Block} from './block'
import {Literal, If, Common, Close, WithElse} from './basic'

export type ListTags = 'ul' | 'ol'

export type L<EndTag> = {
  li: Block<L<EndTag>, 'li'>,
} & EndTag

export type List<Parent, End extends string> =
  Literal<
    If<
      Common<L<Close<Parent, End>>, Close<Parent, End>>,
      Common<L<Close<WithElse<Parent>, End>>, Close<WithElse<Parent>, End>>
    >
  >

// need special
export type Text =
'style' |
'script' |
'pre' |
'textarea'

export type Media =
'audio' |
'video' |
'source' | // void
'track' | // void
'object' |
'param' // void

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

export type datalist =
  'datalist' | 'option'

export type DL =
'dialog' |
'dl' |
'dd' |
'dt'

export type Select =
'optgroup' |
'option' |
'select'

export type Menu =
'menu' | 'menuitem' // void


// under head, void
export type MetadataContent =
  'base' | 'link' | 'meta' | 'title'


