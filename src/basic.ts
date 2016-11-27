import {HTML} from './interface'

export type Literal<Tag> = {
  (str: TemplateStringsArray, ...args: any[]): Tag
} & Tag

export type Else<T> = T & { else: T }

export type WithElse<Parent> = {
  [K in keyof Parent]: Else<Parent[K]>
}

export type Close<Parent, End extends string> = {
  [K in End]: () => Parent
}

export type For<Tag, EndTag> = {
  // disable generic due to tsc bug
  for(list: any[], func: (t: any, i: number) => HTML): EndTag
} & Tag

export type Start<Tag> = {
  class(nameHash: {[k: string]: boolean}): Start<Tag>
  on(handlerHash: {[k: string]: Function}): Start<Tag>
} & Tag

export type If<Original, Enhanced> = {
  if(condition: boolean): Enhanced
} & Original

export type Interpolate<T> = T & {
  $(str: TemplateStringsArray, ...args: any[]): Interpolate<T>
}

export type Common<T, EndTag> =
  Start<For<Interpolate<T>, EndTag>>

