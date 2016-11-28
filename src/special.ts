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

export type OV<EndTag> = { param: Void<O<EndTag>> } & EndTag
export type O<EndTag> = OV<EndTag> & EndTag & {fallback(h: HTML): O<EndTag>}
export type ObjectP<Parent> =
  Literal<
    If<
      Common<O<Close<Parent, 'object'>>, Close<Parent, 'object'>>,
      Common<O<Close<WithElse<Parent>, 'object'>>, Close<WithElse<Parent>, 'object'>>
    >
  >

export type _optgroup<EndTag> = {option: Text<Optgroup<EndTag>, 'option'>}
export type Optgroup<Parent> =
  Literal<
    If<
      Common<_optgroup<Close<Parent, 'optgroup'>>, Close<Parent, 'optgroup'>>,
      Common<_optgroup<Close<WithElse<Parent>, 'optgroup'>>, Close<WithElse<Parent>, 'optgroup'>>
    >
  >
export type S<EndTag> = {
  optgroup: Optgroup<EndTag>,
  option: Text<S<EndTag>, 'option'>
} & EndTag
export type Select<Parent> =
  Literal<
    If<
      Common<S<Close<Parent, 'select'>>, Close<Parent, 'select'>>,
      Common<S<Close<WithElse<Parent>, 'select'>>, Close<WithElse<Parent>, 'select'>>
    >
  >

export type CellTags = 'td' | 'th'
export type TC<EndTag> = { [K in CellTags]: Block<TC<EndTag>, K>} & EndTag
export type TR<Parent> =
  Literal<
    If<
      Common<TC<Close<Parent, 'tr'>>, Close<Parent, 'tr'>>,
      Common<TC<Close<WithElse<Parent>, 'tr'>>, Close<WithElse<Parent>, 'tr'>>
    >
  >
export type TP<EndTag> = { tr: TR<TP<EndTag>>} & EndTag
export type TabelPart<Parent, End extends string> =
  Literal<
    If<
      Common<TP<Close<Parent, End>>, Close<Parent, End>>,
      Common<TP<Close<WithElse<Parent>, End>>, Close<WithElse<Parent>, End>>
    >
  >
export type TabelParts = 'thead' | 'tbody' | 'tfoot'
export type T<EndTag> = {[K in TabelParts]: TabelPart<T<EndTag>, K>} & EndTag
export type Table<Parent> =
  Literal<
    If<
      Common<T<Close<Parent, 'table'>>, Close<Parent, 'tr'>>,
      Common<T<Close<WithElse<Parent>, 'table'>>, Close<WithElse<Parent>, 'table'>>
    >
  >


export type D<EndTag> = { dt: Block<L<EndTag>, 'dt'>, dd: Block<L<EndTag>, 'dd'>} & EndTag
export type Dl<Parent> =
  Literal<
    If<
      Common<D<Close<Parent, 'dl'>>, Close<Parent, 'dl'>>,
      Common<D<Close<WithElse<Parent>, 'dl'>>, Close<WithElse<Parent>, 'dl'>>
    >
  >

// 'colgroup' | // only col
// 'col' // void

// export type DL = 'dialog'

// export type datalist =
//   'datalist' | 'option'
// export type Menu =
// 'menu' | 'menuitem' // void


// // under head, void
// export type MetadataContent =
//   'base' | 'link' | 'meta' | 'title'


