import _h from '../index'
import {setRenderContext, getResult} from '../index'
import {expect} from 'chai'

var h = _h({})

function render(tag: string | Function, prop?: any, children?: any) {
  return {tag, prop, children}
}

// var k = h.div

describe('simple tag tree', () => {
  setRenderContext({
    _h: render
  })
  it('should return html', () => {
    h = h.div.div()
    var ret = getResult()
    expect(ret).to.deep.equal(render('div'))
  })

  it('should return nested', () => {
    h = h.div.div.div().div()
    var ret = getResult()
    expect(ret).to.deep.equal(render('div', undefined, [
      render('div')
    ]))
  })

  it('should render props', () => {
    h = h
      .div.props({test: '1232'})
      .class({vnode: true})
      .div()
    var ret = getResult()
    expect(ret).to.deep.equal(
      render('div', {
        props: {test: '1232'},
        class: {vnode: true}
      })
    )
  })

  it('should render nested props', () => {
    h = h
      .div.props({test: '1232'})
      .class({vnode: true})
        .p
          .props({ptest: '1233'})
          .class({pnode: true})
        .p()
      .div()
    var ret = getResult()
    expect(ret).to.deep.equal(
      render('div', {
        props: {test: '1232'},
        class: {vnode: true}
      }, [
        render('p', {
          props: {ptest: '1233'},
          class: {pnode: true}
        })
      ])
    )
  })

  it('should resolve component', () => {
    class TestComponent {}
    _h({test: TestComponent}).test.test()
    var ret = getResult()
    expect(ret).to.deep.equal(render(TestComponent))
  })

})


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
