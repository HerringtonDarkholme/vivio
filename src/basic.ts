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

export type Common<T, EndTag> = {
  class(nameHash: {[k: string]: boolean}): Common<T, EndTag>
  on(handlerHash: {[k: string]: Function}): Common<T, EndTag>
  props(nameHash: {[k: string]: any}): Common<T, EndTag>
  style(nameHash: {[k: string]: any}): Common<T, EndTag>
  attrs(nameHash: {[k: string]: any}): Common<T, EndTag>
  slotName(name: string): Common<T, EndTag>
  ref(name: string): Common<T, EndTag>
  key(k: any): Common<T, EndTag>
  directives(d: any): Common<T, EndTag>
  for<A>(list: A[], func: (t: A, i: number, h: Common<T, EndTag>) => T): EndTag
} & Interpolate<T>

export type If<Original, Enhanced> = {
  if(condition: boolean): Enhanced
} & Original

export type Interpolate<T> = T & {
  $(str: TemplateStringsArray, ...args: any[]): Interpolate<T>
}
