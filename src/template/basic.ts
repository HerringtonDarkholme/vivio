export type Literal<Tag> = {
  (str: TemplateStringsArray, ...args: any[]): Tag
} & Tag

export type Else<T> = T & { else: T }

export type WithElse<Parent> = {
  [K in keyof Parent]: Else<Parent[K]>
}

export type Close<Parent, End extends string> = {
  [K in End]: () => Parent
} & {
  parent: Parent
}

export type Common<T> = {
  class(nameHash: {[k: string]: boolean}): Common<T>
  on(handlerHash: {[k: string]: Function}): Common<T>
  props(nameHash: {[k: string]: any}): Common<T>
  style(nameHash: {[k: string]: any}): Common<T>
  attrs(nameHash: {[k: string]: any}): Common<T>
  asSlot(name: string): Common<T>
  ref(name: string): Common<T>
  key(k: any): Common<T>
  directives(d: any): Common<T>
} & T

export type If<Original, Enhanced> = {
  if(condition: boolean): Enhanced
} & Original

export type For<P> = {
  <A>(list: A[], func: (h: P, t: A, i: number) => P): P
}

export type Basic = string | number | boolean

export type Interpolate<T> = {
  (str: TemplateStringsArray, ...args: any[]): T
  (...strings: Basic[]): T
}
