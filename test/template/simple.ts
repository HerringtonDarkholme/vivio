import {expect} from 'chai'
import {r, _h, getResult, getResults} from './index'
import Vivio from '../../index'

var h = _h({})

describe('simple tag tree', () => {
  it('should return html', () => {
    h = h.div.div()
    var ret = getResult(h)
    expect(ret).to.deep.equal(r('div'))
  })

  it('should return nested', () => {
    h = h.div.div.div().div()
    var ret = getResult(h)
    expect(ret).to.deep.equal(r('div', undefined, [
      r('div')
    ]))
  })

  it('should render props', () => {
    h = h
      .div.props({test: '1232'})
      .class({vnode: true})
      .div()
    var ret = getResult(h)
    expect(ret).to.deep.equal(
      r('div', {
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
    var ret = getResult(h)
    expect(ret).to.deep.equal(
      r('div', {
        props: {test: '1232'},
        class: {vnode: true}
      }, [
        r('p', {
          props: {ptest: '1233'},
          class: {pnode: true}
        })
      ])
    )
  })

  it('should resolve component', () => {
    const TestComponent = Vivio.component().done()
    var k = _h({test: TestComponent}).test.test()
    var ret = getResult(k)
    expect(ret).to.deep.equal(r(TestComponent))
  })

  it('should render siblings', () => {
    h = h
      .div
        .p
        .p()
        .div
        .div()
      .div()
    var ret = getResult(h)
    expect(ret).to.deep.equal(
      r('div', undefined, [
        r('p'),
        r('div')
      ])
    )
  })

  it('should render class literal', () => {
    h = h.div`.static-class`.div()
    var ret = getResult(h)
    expect(ret).to.deep.equal(
      r('div', {staticClass: 'static-class'})
    )
  })

  it('should render id literal', () => {
    h = h.div`#static-id`.div()
    var ret = getResult(h)
    expect(ret).to.deep.equal(
      r('div', {attrs: {id: 'static-id'}})
    )
  })

  it('should render mixed literal', () => {
    h = h.div`#id-1.class-1.class-2#id-2.class-3`.div()
    var ret = getResult(h)
    expect(ret).to.deep.equal(
      r('div', {
        attrs: {
          id: 'id-1 id-2'
        },
        staticClass: 'class-1 class-2 class-3'
      })
    )
  })

  it('should render void tag', () => {
    h = h.img()
    var ret = getResult(h)
    expect(ret).to.deep.equal(r('img'))
  })

  it('literal on void tag', () => {
    h = h.img`.test`()
    var ret = getResult(h)
    expect(ret).to.deep.equal(r('img', {staticClass: 'test'}))
  })

  it('should render multiple', () => {
    h = h
    .div`.test`
      .$`test inner text`
    .div()
    .hr()
    var ret = getResults(h)
    expect(ret).to.deep.equal([
      r('div', {staticClass: 'test'}, [
      'test inner text'
      ]),
      r('hr')
    ])
  })

})
