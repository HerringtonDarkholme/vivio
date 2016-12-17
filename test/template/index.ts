import {setRenderContext} from '../../src/template/implementation'
export {getResult, getResults} from '../../src/template/implementation'
export {html as _h} from '../../src/template/index'

setRenderContext({
  _c: r,
  _s: (i: any) => i.toString(),
  _t: t,
  _v: (d: any) => d,
})

export function r(tag: string | Function, prop?: any, children?: any) {
  return {tag, prop, children}
}

export function t(name: string, children?: (any[] | null), props?: any) {
  return {
    type: 'slot',
    name, children, props
  }
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
