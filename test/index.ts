import {setRenderContext} from '../index'

setRenderContext({
  _h: r,
  _s: (i: any) => i.toString(),
})

export function r(tag: string | Function, prop?: any, children?: any) {
  return {tag, prop, children}
}


// var j = h.div
//   .div
//   .div()

// j = k

// h = h.div
//   .div
//   .div()
//   .table
//     .thead.thead()
//     .tbody
//       .tr
//       .td.td()
//       .tr()
//     .tbody()
//    .table()
//   .div
//   .div()
// .div()


// h = h.div
//   .img`.test`.for([], (t, i, h) => h)()
//   .div()

// h = h.div.on({}).for([], (t, i, h) => h)
//   .div()

// h
// .div.if(true)
//   .class({})
//   .on({})
//   .for([], (t, i, h) => h)
// .div()
// .div.else.if(true)
// .div()
// .p.else
// .p()


// // h.div
// //     .ul()
// // export var html: (p: PROPERTY&T.HTML, h: T<HTMLHeadElement>, b: T<HTMLBodyElement>) => Tag<HTMLElement>
// // export var head           = tc<HTMLHeadElement, METADATA>('head')
// // export var details: (p: PROPERTY&T.DETAILS, s: T<HTMLSummaryElement>, ...c: ChildTag[]) => Tag<HTMLDetailsElement>
// // 'body'
