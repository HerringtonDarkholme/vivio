import {default as _h, getResult} from '../index'
import {r} from './index'
import {expect} from 'chai'

var h = _h({})

describe('simple tag tree', () => {
  it('should return html', () => {
    h = h.div.div()
    var ret = getResult()
    expect(ret).to.deep.equal(r('div'))
  })

  it('should return nested', () => {
    h = h.div.div.div().div()
    var ret = getResult()
    expect(ret).to.deep.equal(r('div', undefined, [
      r('div')
    ]))
  })

  it('should render props', () => {
    h = h
      .div.props({test: '1232'})
      .class({vnode: true})
      .div()
    var ret = getResult()
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
    var ret = getResult()
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
    class TestComponent {}
    _h({test: TestComponent}).test.test()
    var ret = getResult()
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
    var ret = getResult()
    expect(ret).to.deep.equal(
      r('div', undefined, [
        r('p'),
        r('div')
      ])
    )
  })

  it('should render class literal', () => {
    h = h.div`.static-class`.div()
    var ret = getResult()
    expect(ret).to.deep.equal(
      r('div', {staticClass: 'static-class'})
    )
  })

  it('should render id literal', () => {
    h = h.div`#static-id`.div()
    var ret = getResult()
    expect(ret).to.deep.equal(
      r('div', {attrs: {id: 'static-id'}})
    )
  })

  it('should render mixed literal', () => {
    h = h.div`#id-1.class-1.class-2#id-2.class-3`.div()
    var ret = getResult()
    expect(ret).to.deep.equal(
      r('div', {
        attrs: {
          id: 'id-1 id-2'
        },
        staticClass: 'class-1 class-2 class-3'
      })
    )
  })

})
