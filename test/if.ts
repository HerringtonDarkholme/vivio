import {default as _h, getResult} from '../index'
import {expect} from 'chai'
import {r} from './index'

var h = _h({})

describe('if directive', () => {

  it('should render if true', () => {
    h = h.div.if(true)
      .div()
    var ret = getResult(h)
    expect(ret).to.deep.equal(r('div'))
  })

  it('should not render if false', () => {
    h = h.div.if(false)
      .div()
    var ret = getResult(h)
    expect(ret).to.deep.equal(undefined)
  })

  it('should render nested if', () => {
    h = h.div.if(true)
      .p.if(false)
      .p()
      .div.if(true)
      .div()
      .div()
    var ret = getResult(h)
    expect(ret).to.deep.equal(
      r('div', undefined, [
        r('div')
      ])
    )
  })

  it('should render nested if 2', () => {
    h = h
    .div.if(true)
      .p.if(false)
      .p()
      .div.if(false)
      .div()
    .div()
    var ret = getResult(h)
    expect(ret).to.deep.equal(
      r('div')
    )
  })

  it('should render deeply nested if', () => {
    h = h.div.if(true)
        .p.if(false)
          .div.if(true)
          .div()
        .p()
      .div()
    var ret = getResult(h)
    expect(ret).to.deep.equal(r('div'))
  })

  it('should render else', () => {
    h = h.div.if(false)
      .div()
      .p.else
      .p()
    var ret = getResult(h)
    expect(ret).to.deep.equal(r('p'))
  })

  it('should not render else', () => {
    h = h.div.if(true)
      .div()
      .p.else
      .p()
    var ret = getResult(h)
    expect(ret).to.deep.equal(r('div'))
  })

  it('should render elseif', () => {
    h = h.div.if(false)
      .div()
      .p.else.if(true)
      .p()
      .h1.else
      .h1()
    var ret = getResult(h)
    expect(ret).to.deep.equal(r('p'))
  })

  it('should render elseif2', () => {
    h = h.div.if(false)
      .div()
      .p.else.if(false)
      .p()
      .h1.else
      .h1()
    var ret = getResult(h)
    expect(ret).to.deep.equal(r('h1'))
  })

  it('should render complex nested', () => {
    h = h.div.if(false)
        .p.if(true)
          .a.if(false)
          .a()
          .span.else
          .span()
        .p()
      .div()
      .h1.else
        .a.if(false)
          .div.if(true).div()
        .a()
        .b.else.if(true)
          .props({test: 123})
          .span.if(false).span()
          .select.else.select()
          .strong`.always`
          .strong()
        .b()
      .h1()
    var ret = getResult(h)
    expect(ret).to.deep.equal(r('h1', undefined, [
      r('b', {props: {test: 123}}, [
        r('select'),
        r('strong', {staticClass: 'always'})
      ])
    ]))
  })

  it('should not render text', () => {
    h = h.div.if(false).span`.test`.span().div()
    var ret = getResult(h)
    expect(ret).to.deep.equal(undefined)
  })

  it('should not render text', () => {
    let interpolate = 'world'
    h = h.div.span.if(false).$`hello ${interpolate}`.span().div()
    var ret = getResult(h)
    expect(ret).to.deep.equal(r('div'))
  })

  it('should render text in if', () => {
    let interpolate = 'world'
    h = h.div.span.if(true).$`hello ${interpolate}`.span().div()
    var ret = getResult(h)
    expect(ret).to.deep.equal(r('div', undefined, [
      r('span', undefined, ['hello world'])
    ]))
  })

})
