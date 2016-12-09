Vivio
=========

A DSL alternative for JSX.

Why?
=====

Because I want type safety in Vue's template and tsx does not support Vue compatible format. Period.

Example
====

Should be self explanatory.


```ts
// component definition
class elInput {
  disabled: boolean
  $emit: Emitter<{
    change: string,
    focus: boolean
  }>
  props: 'disabled'
}

h({elInput}) // register components
.div`.el-autocomponet` // staticClass in tagged template
  .elInput // component
    .props(s.extract('value', 'disabled', 'placeholder', 'name', 'size')) // pass props by special method
    .on({change: s.handleChange, focus: s.handleFocus}) // the same for event
    .nativeOn({
      'keydown.up': () => s.highlight(s.highlightIndex - 1),
      'keydown.down': () => s.highlight(s.highlightIndex + 1),
      'keydown.enter': () => s.highlight(s.highlightIndex),
    })
  .elInput() // close tag
  .transition.props({name: 'from element'})
    .ul.if(s.suggestionVisible)
      .li.if(s.loading)
        .i`.el-icon-loading`.i()
      .li()
      .li
        .on({click: s.select})
        .for(s.suggestions, (item, index, h) => h
        .class({highlighted: s.highlightIndex === index})
          .span.if(!s.customIndex)
            .$`Name: ${item.value}` // interpolate text via $`statictext`
          .span()
          .tag.else(s.customIndex) // dynamic tag mounting
            .class({highlighted: s.highlightIndex === index})
            .on({click: s.select})
            .props({item, index})
          .tag()
        )
      .li()
    .ul()
  .transition()
.div()
```

Should I use it in ....?
=====

No. The API design and implemenation is too experimental and heretic.
It might even harm your feeling when making a new toy.

TODO
====

- [ ] for
- [x] $
- [x] tag
- [x] children
- [ ] scoped template
