import {Extends} from '../../index'

declare var comp: Extends<never, never, never, never, never, never>

comp.props({
  test: 123
})
.data(vm => ({
  eee: 123,
  num: 'eee',
  bool: true
}))
.emit<{evt: number}>()
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
  .div()
)
.watch({
  computed(eee) {
    eee.toExponential
  }
})
