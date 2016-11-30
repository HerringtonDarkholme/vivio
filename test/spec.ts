import h from '../index'
import {Emitter} from '../index'

export class elInput {
  disabled: boolean
  $emit: Emitter<{
    change: string,
    focus: boolean
  }>
  props: 'disabled'
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
  customIndex: 'test',
  select() {},
}

h({elInput}).div`.el-autocomponet`
  .elInput
    .props(s.extract('value', 'disabled', 'placeholder', 'name', 'size'))
    .on({change: s.handleChange, focus: s.handleFocus})
    .nativeOn({
      'keydown.up': () => s.highlight(s.highlightIndex - 1),
      'keydown.down': () => s.highlight(s.highlightIndex + 1),
      'keydown.enter': () => s.highlight(s.highlightIndex),
    })
  .elInput()
  .transition
    .ul.if(s.suggestionVisible)
      .li.if(s.loading)
        .i`.el-icon-loading`.i()
      .li()
      .li
        .on({click: s.select})
        .for(s.suggestions, (item, index, h) => h
          .class({highlighted: s.highlightIndex === index})
          .span.if(!s.customIndex).$`item.value`.span()
        //   // .tag(s.customIndex).else
        //   //   .class({highlighted: s.highlightIndex === index})
        //   //   .on({click: s.select})
        //   //   .props({item, index})
        //   // .tag()
        )
      .li()
    .ul()
  .transition()
.div()
