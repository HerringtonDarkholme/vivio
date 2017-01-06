import {
  BaseHelper
} from './interface'

export function createMap<V>(): {[k: string]: V} {
    var ret = Object.create(null);
    ret["__"] = undefined;
    delete ret["__"];
    return ret;
}

export function vuexInit (this: any) {
  const options = this.$options
  // store injection
  if (options.store) {
    this.$store = options.store
  } else if (options.parent && options.parent.$store) {
    this.$store = options.parent.$store
  }
}

const state = memoize(k => function(this: any) {
  return this.$store.state[k]
})
const getters = memoize(k => function(this: any) {
  return this.$store.getters[k]
})
const mutations = memoize(k => function(this: any, ...args: any[]) {
  return this.$store.commit(k, ...args)
})
const actions = memoize(k => function(this: any, ...args: any[]) {
  return this.$store.dispatch(k, ...args)
})

function map(keys: string[], mapper: (k: string) => any) {
    const res = {}
    for (let key of keys) {
      res[key] = mapper(key)
    }
    return res
}

export const helperImpl: BaseHelper = {
  mapState(...keys: string[]) {
    return map(keys, state)
  },
  mapGetters(...keys: string[]) {
    return map(keys, getters)
  },
  mapMutations(...keys: string[]) {
    return map(keys, mutations)
  },
  mapActions(...keys: string[]) {
    return map(keys, actions)
  },
}

type Cacheable<R> = (this: void, k: string) => R
function memoize<R>(func: Cacheable<R>): Cacheable<R> {
  function memoized(key: string) {
    let cache: {[k: string]: R} = memoized['cache']
    if (!cache[key]) cache[key] = func(key)
    return cache[key]
  }
  memoized['cache'] = createMap()
  return memoized
}
