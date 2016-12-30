import {r, t, _h, getResult} from './index'
import {expect} from 'chai'
import Vivio from '../../index'

var slot = Vivio.component()
.props({test: 'www', name: 'eeee'})
.done()
var h = _h<{slot: typeof slot}>(undefined as any)

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

  it('should mount dynamic component', () => {
    h = h.tag('div').tag()
    var ret = getResult(h)
    expect(ret).to.deep.equal(r('div'))
  })

  it('dynamic component in if', () => {
    h = h.div.if(false).div()
      .tag('span').else.tag()
    var ret = getResult(h)
    expect(ret).to.deep.equal(r('span'))
  })

  it('dynamic component constructor', () => {
    const Test = Vivio.component().done()
    h = h.div.if(false).div()
      .tag(Test).else.tag()
    var ret = getResult(h)
    expect(ret).to.deep.equal(r(Test))
  })

  it('template', () => {
    h = h.div
    .template.if(true)
      .div.div()
      .span.span()
    .template()
    .div()

    var ret = getResult(h)
    expect(ret).to.deep.equal(r('div', undefined, [
      r('div'),
      r('span'),
    ]))
  })

  it('scoped slot', () => {
    const Comp = Vivio.component().scopedSlots<{ default: number }>().done()
    var func = (test: number) => h
      .div
        .$(test)
        .article.article()
      .div()
      .p.$`what`.p()

    var k = _h({comp: Comp})
    .comp
      .scopedSlot(func)
    .comp()

    var ret = getResult(k)
    expect(ret.tag).to.equal(Comp)
    expect(ret.prop).to.haveOwnProperty('scopedSlots')
    expect(ret.prop.scopedSlots).to.haveOwnProperty('default')
    let endResult = ret.prop.scopedSlots.default
    expect(endResult(3)).to.deep.equal([
      r('div', undefined, [
        '3',
        r('article')
      ]),
      r('p', undefined, ['what']),
    ])
  })

  it('asSlot call', () => {
    const Comp = Vivio.component()
    .slots<{ name: number }>()
    .done()

    var k = _h({comp: Comp})
    .comp
      .h1.asSlot('name').h1()
    .comp()

    var ret = getResult(k)
    expect(ret).to.deep.equal(
      r(Comp, undefined, [
        r('h1', {slot: 'name'})
      ])
    )
  })

  it('asSlot template', () => {
    const Comp = Vivio.component()
    .slots<{ name: number }>()
    .done()

    var k = _h({comp: Comp})
    .comp
      .template.asSlot('name').div.div().template()
    .comp()

    var ret = getResult(k)
    expect(ret).to.deep.equal(
      r(Comp, undefined, [
        r('template', {slot: 'name'}, [r('div')])
      ])
    )
  })

  it('named scoped slot', () => {
    const Comp = Vivio.component()
    .scopedSlots<{ name: number }>()
    .done()
    var func = (test: number) => h
      .div
        .$(test)
        .article.article()
      .div()
      .p.$`what`.p()

    var k = _h({comp: Comp})
    .comp
      .scopedSlot('name', func)
    .comp()

    var ret = getResult(k)
    expect(ret.tag).to.equal(Comp)
    expect(ret.prop).to.haveOwnProperty('scopedSlots')
    expect(ret.prop.scopedSlots).to.haveOwnProperty('name')
    let endResult = ret.prop.scopedSlots.name
    expect(endResult(3)).to.deep.equal([
      r('div', undefined, [
        '3',
        r('article')
      ]),
      r('p', undefined, ['what']),
    ])
  })

  it('should render slot', () => {
    h = h.div
      .slot.slot()
    .div()

    var ret = getResult(h)
    expect(ret).to.deep.equal(
      r('div', undefined, [
        t('default')
      ])
    )
  })

  it('should render slot2', () => {
    h = h.div
      .slot
        .p.$`default slot!`.p()
      .slot()
    .div()

    var ret = getResult(h)
    expect(ret).to.deep.equal(
      r('div', undefined, [
        t('default', [r('p', undefined, ['default slot!'])])
      ])
    )
  })

  it('should render slot3', () => {
    h = h.div
      .slot.props({test: '12323', name: 'slot'})
        .p.$`default slot!`.p()
      .slot()
    .div()

    var ret = getResult(h)
    expect(ret).to.deep.equal(
      r('div', undefined, [
        t(
          'slot',
          [r('p', undefined, ['default slot!'])],
          {test: '12323'}
        )
      ])
    )
  })

})
