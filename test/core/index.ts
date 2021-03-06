import Vivio from '../../index'

Vivio.component()
.props({
  test: 123
})
.data(vm => ({
  eee: 123,
  num: 'eee',
  bool: true
}))
.emit<{evt: number}>()
.slots<{
  normalSlot1: HTMLElement
  normalSlot2: HTMLElement
}>()
.scopedSlots<{
  scopedSlot1: {sssss: number}
  scopedSlot2: {eee: string}
}>()
.computed({
  computed() {
    return 333
  }
})
.methods({
  method() {
    this.eee = 333
  }
})
.components({
  test: {
    props: {
      test: 123
    }
  }
})
.render(h => h
  .div
    .h1.$`hello world`.h1()
    .test.props({test: 33}).test()
    .slot.props({name: 'scopedSlot1', eee: '33'}).slot()
  .div()
)
.watch({
  computed(eee) {
    eee.toExponential
  }
})
