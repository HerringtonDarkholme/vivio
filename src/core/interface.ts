import {HTML, HTMLBrand} from '../template/interface'
import {WatchOptions} from 'vue/types/options'
import * as Vue from 'vue'

export interface Emitter<T> {
  // we don't support multiple arguments due to TS limitation
  <K extends keyof T>(key: K, payload: T[K], ...args: any[]): void
}

export type ScopedSlot<T> = {[K in keyof T]: (scope: T[K]) => HTMLBrand}

export interface HotModule {
  hot: {
    accept(): void
    data?: any
    dispose(fn: Function): void
  }
  id: {}
}

// props, data, computed, methods, komponent, Emit, Scoped, sloT
export interface Extends<P, D, C, M, K, E, S, T> extends Mixin<P, D, C, M, K, E, S, T> {
  extends<P1, D1, C1, M1, K1>(m: Comp<P1, D1, C1, M1, K1, E, S, T>): Mixin<P1&P, D1&D, C1&C, M1&M, K1&K, E, S, T>
}

export interface Mixin<P, D, C, M, K, E, S, T> extends Prop<P, D, C, M, K, E, S, T> {
  mixin<P1, D1, C1, M1, K1>(m: Comp<P1, D1, C1, M1, K1, E, S, T>): Mixin<P1&P, D1&D, C1&C, M1&M, K1&K, E, S, T>
}
export interface Prop<P, D, C, M, K, E, S, T> extends Data<P, D, C, M, K, E, S, T> {
  props<P1>(props: P1): Data<Partial<Readonly<P1>>&P, D, C, M, K, E, S, T>
}
export interface Data<P, D, C, M, K, E, S, T> extends Declare<P, D, C, M, K, E, S, T> {
  data<D1>(init: (this: P&D, p: P&D) => D1): Declare<P, D1&D, C, M, K, E, S, T>
}

export interface Declare<P, D, C, M, K, E, S, T> extends Repeatable<P, D, C, M, K, E, S, T> {
  emit<E1>(): Declare<P, D, C, M, K, E1, S, T>
  scopedSlots<S1>(): Declare<P, D, C, M, K, E, S1, T>
  slots<T1>(): Declare<P, D, C, M, K, E, S, T1>
}

export interface ComputedOpt<T, V> {
  get?(this: V): T;
  set?(this: V, value: T): void;
  cache?: boolean;
}

export interface ComputedFunc<T, V> {
  (this: V): T
}

export type Computed<C, V> = {
  [K in keyof C]: ComputedOpt<C[K], V>
} & {
  [k: string]: ComputedOpt<any, V>
}
export type ComputedFuncs<C, V> = {
  [K in keyof C]: ComputedFunc<C[K], V>
} & {
  [k: string]: ComputedFunc<any, V>
}

export interface Methods<V> {
  [k: string]: (this: V, ...args: any[]) => any
}

export type Vueify<P,D,C,M,E,S,T> =
  P&D&C&M&Special<E,S,T>&Vue


export interface Repeatable<P, D, C, M, K, E, S, T> extends Render<P, D, C, M, K, E, S, T> {
  computed<C1>(opt: ComputedFuncs<C1, P&D&C&M>): Repeatable<P, D, Readonly<C1>&C, M, K, E, S, T>
  computed<C1>(opt: Computed<C1, P&D&C&M>): Repeatable<P, D, C1&C, M, K, E, S, T>
  methods<M1 extends Methods<Vueify<P,D,C,M,E,S,T>>>(opt: M1): Repeatable<P, D, C, M1&M, K, E, S, T>
}

export interface Async<K> {
  (): Promise<K> | K
}

export type Components<K> = {
  [k in keyof K]: K[k] | Async<K[k]>
}

export type SlotComp<S, T> = {
  slot: {
    props: ({name: keyof S} & S[keyof S]) | {name: keyof T}
  }
}
export type RenderComp<S, T, K> = SlotComp<S, T> & K

export interface RenderFunc<P,D,C,M,E,S,T, K> {
  (this: Vueify<P,D,C,M,E,S,T>, h: HTML<RenderComp<S,T,K>>, vm: Vueify<P,D,C,M,E,S,T>): HTMLBrand
}

export interface Render<P, D, C, M, K, E, S, T> extends Other<P, D, C, M, K, E, S, T> {
  components<K1>(opt: Components<K1>): Render<P, D, C, M, K1&K, E, S, T>
  render(f: RenderFunc<P,D,C,M,E,S,T,K>): Other<P, D, C, M, K, E, S, T>
}

export interface WatchHandler<T, V> {
  (this: V, val: T, oldVal: T): void
}
export interface WatchOpt<T, V> extends WatchOptions {
  handler: WatchHandler<T, V>
}

export type Watch<T, V> = {
  [K in keyof T]?: WatchHandler<T[K], V> | WatchOpt<T[K], V>
}

export interface Lifecycle<V> {
  beforeCreate?(this: V): void
  created?(this: V): void
  destroyed?(this: V): void
  beforeMount?(this: V): void
  mounted?(this: V): void
  beforeUpdate?(this: V): void
  updated?(this: V): void
  activated?(this: V): void
  deactivated?(this: V): void
}

export interface Other<P, D, C, M, K, E, S, T> {
  watch(opt: Watch<P&D&C,Vueify<P,D,C,M,E,S,T>>): this
  lifecycle(opt: Lifecycle<Vueify<P,D,C,M,E,S,T>>): this
  done(module?: HotModule): Comp<P, D, C, M, K, E, S, T>
}

export interface Comp<P, D, C, M, K, E, S, T> extends Special<E, S, T> {
  props: P
  data(): D
  computed: C
  methods: M
  components: K
}

export interface Special<E, S, T>  {
  $emit: Emitter<E>
  $scopedSlots: ScopedSlot<S>
  $slots: T
}
