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
  for<A>(list: A[], func: (h: Common<T, EndTag>, t: A, i: number) => T): EndTag
} & Interpolate<T>

export type If<Original, Enhanced> = {
  if(condition: boolean): Enhanced
} & Original

export type Interpolate<T> = T & {
  $(str: TemplateStringsArray, ...args: any[]): Interpolate<T>
  $(...strings: string[]): Interpolate<T>
}

export type SlotName<Tag> = {
  slotName<T>(this: {parent: {ComponentTag: {$scopedSlots: T}}}, key: keyof T): Tag
} & Tag

export type Template<Parent> = SlotName<{
  scope(f: () => any): {
    template(): Parent
  }
  template(): Parent
}>
