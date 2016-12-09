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
})
