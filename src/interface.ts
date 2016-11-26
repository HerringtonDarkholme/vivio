export type BlockTags = 'div' | 'p'

export type HTML = {
  [K in BlockTags]: Block<HTML, K>
  // img: () => HTML
} & {
  ul: Ul<HTML>
}

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

export type Start<Tag, Parent, End extends string> = {
  class(nameHash: {[k: string]: boolean}): Start<Tag, Parent, End>
  on(handlerHash: {[k: string]: Function}): Start<Tag, Parent, End>
  for(list: number[], func: (t: number, i: number) => HTML): {}
} & Tag


// export type All<Parent, End extends string> = Block<Parent, End>

export type Common<T, Parent, End extends string> = Literal<Start<T, Parent, End>>


export type B<Parent, End extends string> =
{[K in BlockTags]: Block<B<Parent, End>, K>} & Close<Parent, End>

export type If<T, Parent, End extends string> = {
  if(condition: boolean): Start<T, WithElse<Parent>, End>
}

export type Block<Parent, End extends string> =
  Common<B<Parent, End> & If<B<Parent, End>, Parent, End>, Parent, End>

export type ulh<Parent> = {li: Block<ulh<Parent>, 'li'>, ul(): Parent}

export type Ul<Parent> =
  Common<ulh<Parent> & If<ulh<Parent>, Parent, 'ul'>, Parent, 'ul'>


declare var h: HTML

h = h
.div
.div()

var k = h.div

h = h.div
  .div
  .div()
  .div()

var j = h.div
  .div
  .div()

j = k

h = h.div
  .div
  .div()
  .div
  .div()
.div()

h = h.div
  .p
  .p()
  .div
  .div()
.div()


h.div
.for([], () => h)

var ul = h.ul

h = h.ul
  .li
  .li()
  .ul()

h = ul.ul()

ul.li
  .div

// k = h.div
//   .img()

// h = h.img()

// h = h.div.if(true)
//   .div()

// h = h.div.on({}).for([], _ => h)
//   .div()

// h.div.if(false)
//   .div()
//   .img.else()
//   .div.if(true)
//     .p.p()
//   .div()
//   .p.else.if(true)
//   .p()


// h = h.div`.test`
//     .div()

// k = h.div`.test`
//     .ul`.test2`
//     .ul()

h.div`.test`
  .if(true)

// // h.div
// //     .ul()
