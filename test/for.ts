import {default as _h, getResult} from '../index'
import {r} from './index'
import {expect} from 'chai'

var h = _h({})

describe('for', () => {
  it('simple for', () => {
    h = h
    .div
      .for([1, 2, 3], h => h.span.span())
    .div()
    var result = getResult(h)
    expect(result).to.deep.equal(
      r('div', undefined, [
        r('span'),
        r('span'),
        r('span')
      ])
    )
  })

  it('simple for', () => {
    h = h
    .ul
      .for([1, 2, 3], (h, n) => h.li.$(n).li())
    .ul()
    var result = getResult(h)
    expect(result).to.deep.equal(
      r('ul', undefined, [
        r('li', undefined, ['1']),
        r('li', undefined, ['2']),
        r('li', undefined, ['3']),
      ])
    )
  })
})
