import {Void} from './void'
import {Block} from './block'
import {Text} from './text'
import {Literal, If, Common, Close, WithElse, For} from './basic'
import {HTMLBrand} from './interface'

// export type ListTags = 'ul' | 'ol'
export type L<EndTag, Comps> = {
  li: Block<L<EndTag, Comps>, 'li', Comps>
  for: For<L<EndTag, Comps>>
} & EndTag
export type List<Parent, End extends string, Comps> =
  Literal<
    If<
      Common<L<Close<Parent, End>, Comps>>,
      Common<L<Close<WithElse<Parent>, End>, Comps>>
    >
  >

export type MIf<Parent, End extends string> = {
  if<Pt>(this: {parent: Pt}, condition: boolean): Common<M<Close<WithElse<Pt>, End>>>
} & Common<M<Close<Parent, End>>>
// export type MediaTags = 'audio' | 'video'
export type MV<EndTag> = { source: Void<M<EndTag>>, track: Void<M<EndTag>> } & EndTag
export type M<EndTag> = MV<EndTag> & EndTag & { fallback(h: HTMLBrand): M<EndTag> }
export type Media<Parent, End extends string> =
  Literal<
    MIf<Parent, End>
  >

export type OV<EndTag> = { param: Void<O<EndTag>> } & EndTag
export type O<EndTag> = OV<EndTag> & EndTag & {fallback(h: HTMLBrand): O<EndTag>}
export type ObjectP<Parent> =
  Literal<
    If<
      Common<O<Close<Parent, 'object'>>>,
      Common<O<Close<WithElse<Parent>, 'object'>>>
    >
  >

export type _optgroup<EndTag> = {
  option: Text<Optgroup<EndTag>, 'option'>
  for: For<_optgroup<EndTag>>
}
export type Optgroup<Parent> =
  Literal<
    If<
      Common<_optgroup<Close<Parent, 'optgroup'>>>,
      Common<_optgroup<Close<WithElse<Parent>, 'optgroup'>>>
    >
  >
export type S<EndTag> = {
  optgroup: Optgroup<EndTag>,
  option: Text<S<EndTag>, 'option'>
  for: For<S<EndTag>>
} & EndTag
export type Select<Parent> =
  Literal<
    If<
      Common<S<Close<Parent, 'select'>>>,
      Common<S<Close<WithElse<Parent>, 'select'>>>
    >
  >

// export type CellTags = 'td' | 'th'
export type TC<EndTag, Comps> = {
  // [K in CellTags]: Block<TC<EndTag, Comps>, K, Comps>
  td: Block<TC<EndTag, Comps>, 'td', Comps>
  th: Block<TC<EndTag, Comps>, 'th', Comps>
  for: For<TC<EndTag, Comps>>
} & EndTag
export type TR<Parent, Comps> =
  Literal<
    If<
      Common<TC<Close<Parent, 'tr'>, Comps>>,
      Common<TC<Close<WithElse<Parent>, 'tr'>, Comps>>
    >
  >
export type TP<EndTag, Comps> = {
  tr: TR<TP<EndTag, Comps>, Comps>
  for: For<TP<EndTag, Comps>>
} & EndTag
export type TabelPart<Parent, End extends string, Comps> =
  Literal<
    If<
      Common<TP<Close<Parent, End>, Comps>>,
      Common<TP<Close<WithElse<Parent>, End>, Comps>>
    >
  >
export type TabelParts = 'thead' | 'tbody' | 'tfoot'
export type T<EndTag, Comps> = {[K in TabelParts]: TabelPart<T<EndTag, Comps>, K, Comps>} & EndTag
export type Table<Parent, Comps> =
  Literal<
    If<
      Common<T<Close<Parent, 'table'>, Comps>>,
      Common<T<Close<WithElse<Parent>, 'table'>, Comps>>
    >
  >


export type D<EndTag, Comps> = {
  dt: Block<D<EndTag, Comps>, 'dt', Comps>,
  dd: Block<D<EndTag, Comps>, 'dd', Comps>
  for: For<D<EndTag, Comps>>
} & EndTag
export type Dl<Parent, Comps> =
  Literal<
    If<
      Common<D<Close<Parent, 'dl'>, Comps>>,
      Common<D<Close<WithElse<Parent>, 'dl'>, Comps>>
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


