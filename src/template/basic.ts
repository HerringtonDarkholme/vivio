export interface _Literal<Tag> {
  (str: TemplateStringsArray, ...args: any[]): Tag
}
export type Literal<Tag> = _Literal<Tag> & Tag

export interface ComponentTag<Comp> {
  componentTag: Comp
}

export type Else<T> = T & { else: T }

export type WithElse<Parent> = {
  [K in keyof Parent]: Else<Parent[K]>
}

export interface WithParent<Parent> {
  parent: Parent
}
export type Close<Parent, End extends string> = {
  [K in End]: () => Parent
} & WithParent<Parent>

export interface ComponentSlotAux<T> {
  parent: ComponentTag<{$slots: T}>
}

// useful for finding ROOT, not used for compile time performance
// export type RecurseRef<T> = {
//   __ref: T
// } | {parent: RecurseRef<T>}

export interface VDom<T> {
  class(nameHash: {[k: string]: boolean}): Common<T>
  class(...names: string[]): Common<T>
  on(handlerHash: {[k: string]: Function}): Common<T>
  props(nameHash: {[k: string]: any}): Common<T>
  style(nameHash: {[k: string]: any}): Common<T>
  attrs(nameHash: {[k: string]: any}): Common<T>
  asSlot<S>(this: ComponentSlotAux<S>, name: keyof S): Common<T>
  ref(name: string): Common<T>
  key(k: any): Common<T>
  directives(d: any): Common<T>
}

export type Common<T> = VDom<T> & T

export type If<Original, Enhanced> = {
  if(condition: boolean): Enhanced
} & Original

export type ForTag<T> = {'@forTag': any} & T
export interface For<P> {
  <A>(list: A[], func: (h: P, t: A, i: number) => ForTag<never>): P
}

export type Basic = string | number | boolean

export interface Interpolate<T> {
  (str: TemplateStringsArray, ...args: any[]): T
  (...strings: Basic[]): T
}
