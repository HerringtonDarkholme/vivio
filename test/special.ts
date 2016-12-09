import {default as _h, getResult} from '../index'
import {r} from './index'
import {expect} from 'chai'

var h = _h({})

describe('special tags', () => {
  it('children declared inline', () => {
    h = h.div.children(
      h.p.p()
    ).div()
    var result = getResult(h)
    expect(result).to.deep.equal(
      r('div', undefined, [
        r('p')
      ])
    )
  })

  it('children declared before', () => {
    var k = h.p.p()
    h = h.div.children(k).div()
    var result = getResult(h)
    expect(result).to.deep.equal(
      r('div', undefined, [
        r('p')
      ])
    )
  })

  it('should render text', () => {
    let interpolate = 'world'
    h = h.span.$`hello ${interpolate}`.span()
    var ret = getResult(h)
    expect(ret).to.deep.equal(r('span', undefined, ['hello world']))
  })

  it('should render text2', () => {
    h = h.span.$('test', ' ','test2').span()
    var ret = getResult(h)
    expect(ret).to.deep.equal(r('span', undefined, ['test test2']))
  })
})
