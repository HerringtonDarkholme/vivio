import {Void} from './void'
import {Block} from './block'
import {Text} from './text'
import {Literal, If, Common, Close, WithElse} from './basic'
import {HTML} from './interface'

export type ListTags = 'ul' | 'ol'

export type L<EndTag, Comps> = { li: Block<L<EndTag, Comps>, 'li', Comps> } & EndTag
export type List<Parent, End extends string, Comps> =
  Literal<
    If<
      Common<L<Close<Parent, End>, Comps>, Close<Parent, End>>,
      Common<L<Close<WithElse<Parent>, End>, Comps>, Close<WithElse<Parent>, End>>
    >
  >

export type MediaTags = 'audio' | 'video'
export type MV<EndTag> = { source: Void<M<EndTag>>, track: Void<M<EndTag>> } & EndTag
export type M<EndTag> = MV<EndTag> & EndTag & { fallback(h: HTML<{}>): M<EndTag> }
export type Media<Parent, End extends string> =
  Literal<
    If<
      Common<M<Close<Parent, End>>, Close<Parent, End>>,
      Common<M<Close<WithElse<Parent>, End>>, Close<WithElse<Parent>, End>>
    >
  >

export type OV<EndTag> = { param: Void<O<EndTag>> } & EndTag
export type O<EndTag> = OV<EndTag> & EndTag & {fallback(h: HTML<{}>): O<EndTag>}
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
export type TC<EndTag, Comps> = { [K in CellTags]: Block<TC<EndTag, Comps>, K, Comps>} & EndTag
export type TR<Parent, Comps> =
  Literal<
    If<
      Common<TC<Close<Parent, 'tr'>, Comps>, Close<Parent, 'tr'>>,
      Common<TC<Close<WithElse<Parent>, 'tr'>, Comps>, Close<WithElse<Parent>, 'tr'>>
    >
  >
export type TP<EndTag, Comps> = { tr: TR<TP<EndTag, Comps>, Comps>} & EndTag
export type TabelPart<Parent, End extends string, Comps> =
  Literal<
    If<
      Common<TP<Close<Parent, End>, Comps>, Close<Parent, End>>,
      Common<TP<Close<WithElse<Parent>, End>, Comps>, Close<WithElse<Parent>, End>>
    >
  >
export type TabelParts = 'thead' | 'tbody' | 'tfoot'
export type T<EndTag, Comps> = {[K in TabelParts]: TabelPart<T<EndTag, Comps>, K, Comps>} & EndTag
export type Table<Parent, Comps> =
  Literal<
    If<
      Common<T<Close<Parent, 'table'>, Comps>, Close<Parent, 'tr'>>,
      Common<T<Close<WithElse<Parent>, 'table'>, Comps>, Close<WithElse<Parent>, 'table'>>
    >
  >


export type D<EndTag, Comps> = { dt: Block<D<EndTag, Comps>, 'dt', Comps>, dd: Block<D<EndTag, Comps>, 'dd', Comps>} & EndTag
export type Dl<Parent, Comps> =
  Literal<
    If<
      Common<D<Close<Parent, 'dl'>, Comps>, Close<Parent, 'dl'>>,
      Common<D<Close<WithElse<Parent>, 'dl'>, Comps>, Close<WithElse<Parent>, 'dl'>>
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


