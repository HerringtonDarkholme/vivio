declare var process: any

import {HotModule} from '../core/interface'
import {
  Opt, BaseOpt,
  BG, BC, BD, BasePlugin, BP,
  GetDef, MD0, AD0,
} from './interface'
import StoreImpl from './store'
import {createMap} from './helper'
const m = createMap

type BaseActDef = AD0<{}, BG, BC, BD, {}, {}>
/** @internal */
export interface ActDefs {
  [k: string]: BaseActDef
}

type BaseMutateDef = MD0<{}, {}>
/** @internal */
export interface MutateDefs {
  [k: string]: BaseMutateDef
}

type BaseRawGetter = GetDef<{}, BG, {}>
/** @internal */
export interface RawGetters {
  [k: string]: BaseRawGetter
}

/** @internal */
export default class OptImpl implements BaseOpt {

  _state: {}
  _getters: RawGetters = m<BaseRawGetter>()
  _actions: ActDefs = m<BaseActDef>()
  _mutations: MutateDefs = m<BaseMutateDef>()
  _modules = m<OptImpl>()
  _plugins: BasePlugin[] = []

  state_t: {}
  getters_t: BG
  commit_t: BC
  dispatch_t: BD
  payload_t: BP

  constructor(s: {}) {
    this._state = s
  }

  getter(key: string, f: GetDef<string, BG, {}>) {
    this._getters[key] = f
    return this
  }
  getters(opts: {}) {
    for (let key of Object.keys(opts)) {
      this._getters[key] = opts[key]
    }
    return this
  }
  declareGetter() { return this }

  mutation(key: string, f: BaseMutateDef) {
    this._mutations[key] = f
    return this
  }
  mutationWithArg(key: string, f: BaseMutateDef) {
    return this.mutation(key, f)
  }
  mutations(opts: {}) {
    for (let key of Object.keys(opts)) {
      this._mutations[key] = opts[key]
    }
    return this
  }
  mutationsWithArg(opts: {}) {
    return this.mutations(opts)
  }
  declareMutation() { return this }

  action(key: string, f: BaseActDef) {
    this._actions[key] = f
    return this
  }
  actionWithArg(key: string, f: BaseActDef) {
    return this.action(key, f)
  }
  actions(opts: {}) {
    for (let key of Object.keys(opts)) {
      this._actions[key] = opts[key]
    }
    return this
  }
  actionsWithArg(opts: {}) {
    return this.actions(opts)
  }

  declareAction() { return this }

  module(key: string, o: OptImpl) {
    this._modules[key] = o
    return this
  }

  plugin(...plugins: BasePlugin[]) {
    this._plugins = this._plugins.concat(plugins)
    return this
  }

  done(module?: HotModule) {
    let store = new StoreImpl(this);
    if (process.env.NODE_ENV !== 'production') {
      if (module && module.hot) {
        if (module.hot.data) {
          store = module.hot.data.store
          store.hotUpdate(this)
        }
        module.hot.accept();
        module.hot.dispose((data: any) => {
          data.store = store
        })
      }
    }
    return store;
  }
}

export function store(): Opt<never, never, never, never, never, never, never>
export function store<S>(s: S): Opt<S, never, never, never, never, never, never>
export function store(s = {}): BaseOpt {
  return new OptImpl(s)
}
