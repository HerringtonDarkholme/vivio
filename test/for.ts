import {html as _h, getResult} from '../index'
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

  it('list', () => {
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

  it('mix normal list', () => {
    h = h
    .ul
      .li.$(0).li()
      .for([1], (h, n) => h.li.props({text: n}).li())
      .li.$('end').li()
    .ul()

    var result = getResult(h)
    expect(result).to.deep.equal(
      r('ul', undefined, [
        r('li', undefined, ['0']),
        r('li', {props: {text: 1}}),
        r('li', undefined, ['end']),
      ])
    )
  })

  it('mix conditional', () => {
    h = h
      .ul
        .for([1, 2, 3], (h, n) => h
          .li.if(n % 2 === 0).$(n).li()
        )
      .ul()
    var result = getResult(h)
    expect(result).to.deep.equal(
      r('ul', undefined, [
        r('li', undefined, ['2']),
      ])
    )
  })

  it('in nested conditional', () => {
    h = h
      .ul.if(false)
        .for([1, 2, 3], (h, n) => h
          .li.if(n % 2 === 0).$(n).li()
          .li.else.$('odd').li()
        )
      .ul()
      .ul.if(true)
        .for([1, 2, 3], (h, n) => h
          .li.if(n % 2 !== 0).$(n).li()
          .li.else.$('even').li()
        )
      .ul()
    var result = getResult(h)
    expect(result).to.deep.equal(
      r('ul', undefined, [
        r('li', undefined, ['1']),
        r('li', undefined, ['even']),
        r('li', undefined, ['3']),
      ])
    )
  })
})
