import h from '../index'
var s = {
  handleChange() {},
  handleFocus() {},
  highlight(i: number) {},
  extract(...field: string[]) {return null as any},
  highlightIndex: 123,
  suggestionVisible: true,
  loading: true,
  suggestions: [{value: 'suggestion'}],
  customIndex: 'test',
  select() {},
}
h.div`.el-autocomponet`
  .elInput
    .props(s.extract('value', 'disabled', 'placeholder', 'name', 'size'))
    .on({change: s.handleChange, focus: s.handleFocus})
    .nativeOn({
      'keydown.up': () => s.highlight(s.highlightIndex - 1),
      'keydown.down': () => s.highlight(s.highlightIndex + 1),
      'keydown.enter': () => s.highlight(s.highlightIndex),
    })()
  .transition
    .ul.if(s.suggestionVisible)
      .li.if(s.loading)
        .i`.el-icon-loading`()
      .li()
      .li.tag(s.customIndex)
        .class({highlighted: s.highlightIndex === index})
        .on({click: s.select})
        .for(s.suggestions, (item, index) => h
          .t(item.value).if(!s.customIndex)
          .tag(s.customIndex).else
            .class({highlighted: s.highlightIndex === index})
            .on({click: s.select})
            .props({item, index})
          .tag()
      .li()
      ).template()
    .ul()
  .transition()
.div()
