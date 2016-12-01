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

export type Start<T, EndTag> = {
  class(nameHash: {[k: string]: boolean}): Start<T, EndTag>
  on(handlerHash: {[k: string]: Function}): Start<T, EndTag>
  props(nameHash: {[k: string]: any}): Start<T, EndTag>
  for<A>(list: A[], func: (t: A, i: number, h: Start<T, EndTag>) => T): EndTag
} & Interpolate<T>

export type If<Original, Enhanced> = {
  if(condition: boolean): Enhanced
} & Original

export type Interpolate<T> = T & {
  $(str: TemplateStringsArray, ...args: any[]): Interpolate<T>
}

export type Common<T, EndTag> = Start<T, EndTag>
