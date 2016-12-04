import _h from '../index'
import {setRenderContext} from '../index'
import {expect} from 'chai'

var h = _h({})

// var k = h.div

describe('simple tag tree', () => {
  setRenderContext({
    _h(tag: string, prop: any, children: any) {
      return {tag, prop, children}
    }
  })
  it('should return html', () => {
    var ret = h.div.div()
    expect(ret).to.have.property('tag')
      .and.equal('div')
    expect(ret).to.have.property('prop')
      .and.equal(undefined)
    expect(ret).to.have.property('children')
      .and.equal(undefined)
  })
})

// h = h.div
//   .div
//   .div()
//   .div()

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
//   .p
//   .p()
//   .div
//   .div()
// .div()


// h.div
// .for([], (t, i, h) => h
//   .span.span()
//  )
// .div()

// var ul = h.ul

// h = h.ul
//   .li
//   .li()
//   .ul()

// h = ul.ul()

// ul.li
//   .div

// h.img.if(true)()
//   .div.else
//   .div()

// h.ul`test`

// h = h.div
//   .img`.test`.for([], (t, i, h) => h)()
//   .div()

// h = h.img()

// h = h.div.if(true)
//   .div()

// h = h.div.on({}).for([], (t, i, h) => h)
//   .div()

// h.div.if(true)
//   .div()

// h.div.if(false)
//   .div()
//   .img.else()
//   .div.if(true)
//     .p.p()
//   .div()
//   .p.else.if(true)
//   .p()

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



// h = h
// .div`.test`
//   .$`test inner text`
// .div()
// .hr()

// // k = h.div`.test`
// //     .ul`.test2`
// //     .ul()

// h.div`.test`
//   .if(true)

// // h.div
// //     .ul()
// // export var html: (p: PROPERTY&T.HTML, h: T<HTMLHeadElement>, b: T<HTMLBodyElement>) => Tag<HTMLElement>
// // export var head           = tc<HTMLHeadElement, METADATA>('head')
// // export var details: (p: PROPERTY&T.DETAILS, s: T<HTMLSummaryElement>, ...c: ChildTag[]) => Tag<HTMLDetailsElement>
// // 'body'
