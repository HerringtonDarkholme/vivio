Vivio
=========

A TypeScript expedient for Vue. It provides native-like API to use Vue in TypeScript

Example project: https://github.com/HerringtonDarkholme/dogfood

Component
======

```ts
// component.ts
import vivio, {p} from 'vivio'
import child from './child-component'

export default
vivio
.component({
  delimiter: ['{', '}'],
  newOption: 'new option which has no method'
})
.props({
  numProp: p(Number), // simple propperty with type `number`
  myProp: p({ // object style property
    type: p(String),
    default: 'hello world',
  }),
})
.data(vm => ({
  someData: 42, // direct define
  useProp: vm.numProp, // use property defined before
}))
.computed({
  sum() {
    // this is set to vue
    return this.someData + this.numProp
  }
})
.methods({
  alert() {
    // this is set to vue
    alert(this.someData + this.numProp)
  }
})
.component({
  child: child // import child component
})
.render(h => h // render function definition, see below
  .h1
    .$`Hello world`
    .child.child() // use child component
  .h1())
.done(module) // get the component definition object
// you can pass webpack module object to done to enable HotModule reload
```

Render function
=======

```ts
h
.div`.el-autocomponet` // staticClass in tagged template
  .elInput // registred component
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
      .for(s.suggestions, (h, item, index) => h
        .li
        .on({click: s.select})
        .class({highlighted: s.highlightIndex === index})
          .span.if(!s.customIndex)
            .$`Name: ${item.value}` // interpolate text via $`statictext`
          .span()
          .tag(s.customIndex).else // dynamic tag mounting
            .class({highlighted: s.highlightIndex === index})
            .on({click: s.select})
            .props({item, index})
          .tag()
        .li()
      )
    .ul()
  .transition()
.div()
```
