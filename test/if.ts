import {default as _h, getResult} from '../index'
import {expect} from 'chai'
import {r} from './index'

var h = _h({})

describe('if directive', () => {

  it('should render if true', () => {
    h = h.div.if(true)
      .div()
    var ret = getResult()
    expect(ret).to.deep.equal(r('div'))
  })

  it('should not render if false', () => {
    h = h.div.if(false)
      .div()
    var ret = getResult()
    expect(ret).to.deep.equal(undefined)
  })

  it('should render nested if', () => {
    h = h.div.if(true)
      .p.if(false)
      .p()
      .div.if(true)
      .div()
      .div()
    var ret = getResult()
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
    var ret = getResult()
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
    var ret = getResult()
    expect(ret).to.deep.equal(r('div'))
  })

})
