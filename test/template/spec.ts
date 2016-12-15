import {html as h, getResult} from '../../index'
import {Emitter} from '../../index'
import {expect} from 'chai'
import {r} from './index'

class elInput {
  disabled: boolean
  $emit: Emitter<{
    change: string,
    focus: boolean
  }>
  props: 'disabled'
}

class CustomIndex {
  $emit: Emitter<{
    click: number
  }>
  item: {}
  index: number
  props: 'item' | 'index'
}

var s = {
  handleChange(s: string) {},
  handleFocus(b: boolean) {},
  highlight(i: number) {},
  extract(...field: string[]) {return null as any},
  highlightIndex: 123,
  suggestionVisible: true,
  loading: true,
  suggestions: [{value: 'suggestion'}],
  customIndex: CustomIndex,
  select(n: number) {},
}


describe('nontrivial case', () => {
  it('should render', () => {
    var nativeOn = {
      'keydown.up': () => s.highlight(s.highlightIndex - 1),
      'keydown.down': () => s.highlight(s.highlightIndex + 1),
      'keydown.enter': () => s.highlight(s.highlightIndex),
    }

    var k = h({elInput}).div`.el-autocomplete`
      .elInput
        .props(s.extract('value', 'disabled', 'placeholder', 'name', 'size'))
        .on({change: s.handleChange, focus: s.handleFocus})
        .nativeOn(nativeOn)
      .elInput()
      .transition.props({name: 'transition'})
        .ul.if(s.suggestionVisible)
          .li.if(s.loading)
            .i`.el-icon-loading`.i()
          .li()
          .for(s.suggestions, (h, item, index) => h
            .li
            .on({click: s.select})
            .class({highlighted: s.highlightIndex === index})
              .span.if(!s.customIndex).$`item.value`.span()
              .tag(s.customIndex).else
                .class({highlighted: s.highlightIndex === index})
                .on({click: s.select})
                .props({item, index})
              .tag()
            .li()
          )
        .ul()
      .transition()
    .div()

    var ret = getResult(k)
    expect(ret).to.deep.equal(
      r('div', { staticClass: 'el-autocomplete'}, [
        r(elInput, {
          props: null,
          on: {change: s.handleChange, focus: s.handleFocus},
          nativeOn
        }),
        r('transition', {props: {name: 'transition'}}, [
          r('ul', undefined, [
            r('li', undefined, [
              r('i', {staticClass: 'el-icon-loading'})
            ]),
            r('li', {
              on: {click: s.select},
              class: {highlighted: false}
            }, [
              r(s.customIndex, {
                on: {click: s.select},
                class: {highlighted: false},
                props: {item: {value: 'suggestion'}, index: 0}
              })
            ]),

          ]) // ul
        ]) // transition
      ]) // div
    )
  })
})
