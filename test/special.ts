import {default as _h, getResult} from '../index'
import {r} from './index'
import {expect} from 'chai'

var h = _h({})

describe('special tags', () => {
  it('children', () => {
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
})
