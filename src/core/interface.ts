import {HTML, HTMLBrand} from '../template/interface'
import {ComputedOptions, WatchOptions, ComponentOptions} from 'vue/types/options'
import * as Vue from 'vue'
// TODO: encoding computed readonly, by overloading
// encoding prop readonly

// props, data, computed, methods, komponent, Emit, Scoped, sloT
export interface Extends<P, D, C, M, K, E, S, T> extends Mixin<P, D, C, M, K, E, S, T> {
  extends<P1, D1, C1, M1, K1>(m: Comp<P1, D1, C1, M1, K1, E, S, T>): Mixin<P1&P, D1&D, C1&C, M1&M, K1&K, E, S, T>
}

export interface Mixin<P, D, C, M, K, E, S, T> extends Prop<P, D, C, M, K, E, S, T> {
  mixin<P1, D1, C1, M1, K1>(m: Comp<P1, D1, C1, M1, K1, E, S, T>): Mixin<P1&P, D1&D, C1&C, M1&M, K1&K, E, S, T>
}
export interface Prop<P, D, C, M, K, E, S, T> extends Data<P, D, C, M, K, E, S, T> {
  props<P1>(props: P1): Data<P1&P, D, C, M, K, E, S, T>
}
export interface Data<P, D, C, M, K, E, S, T> extends Declare<P, D, C, M, K, E, S, T> {
  data<D1>(init: (this: P&D, p: P&D) => D1): Declare<P, D1&D, C, M, K, E, S, T>
}

export interface Declare<P, D, C, M, K, E, S, T> extends Repeatable<P, D, C, M, K, E, S, T> {
  emit<E1>(): Declare<P, D, C, M, K, E1, S, T>
  scopedSlots<S1>(): Declare<P, D, C, M, K, E, S1, T>
  slots<T1>(): Declare<P, D, C, M, K, E, S, T1>
}

export type ComputedOpt<T, V> = {
  get?(this: V): T;
  set?(this: V, value: T): void;
  cache?: boolean;
} | (
  (this: V) => T
)

export type Computed<C, V> = {
  [K in keyof C]: ComputedOpt<C[K], V>
} & {
  [k: string]: ComputedOptions<V>
}

export type Methods<V> = {
  [k: string]: (this: V, ...args: any[]) => any
}

export type Vueify<P,D,C,M,E,S,T> =
  P&D&C&M&Special<E,S,T>&Vue


export interface Repeatable<P, D, C, M, K, E, S, T> extends Render<P, D, C, M, K, E, S, T> {
  computed<C1>(opt: Computed<C1, P&D&C&M>): Repeatable<P, D, C1&C, M, K, E, S, T>
  methods<M1 extends Methods<Vueify<P,D,C,M,E,S,T>>>(opt: M1): Repeatable<P, D, C, M1&M, K, E, S, T>
}

export type Async<K> = () => (Promise<K> | K)

export type Components<K> = {
  [k in keyof K]: K[k] | Async<K[k]>
}
export interface Render<P, D, C, M, K, E, S, T> extends Other<P, D, C, M, K, E, S, T> {
  components<K1>(opt: Components<K1>): Render<P, D, C, M, K1&K, E, S, T>
  render(f: (this: Vueify<P,D,C,M,E,S,T>, h: HTML<K>, vm: Vueify<P,D,C,M,E,S,T>) => HTMLBrand): Other<P, D, C, M, K, E, S, T>
}

export type WatchHandler<T, V> = (this: V, val: T, oldVal: T) => void;
export type WatchOpt<T, V> = {
  handler: WatchHandler<T, V>
} & WatchOptions

export type Watch<T, V> = {
  [K in keyof T]?: WatchHandler<T[K], V> | WatchOpt<T[K], V>
}

export type Lifecycles =
  | 'beforeCreate' | 'created' | 'destroyed' | 'beforeMount' | 'mounted'
  | 'beforeUpdate' | 'updated' | 'activated' | 'deactivated'

export type Lifecycle<V> = {
  [K in Lifecycles]: (this: V) => void
}

export interface Other<P, D, C, M, K, E, S, T> extends Comp<P, D, C, M, K, E, S, T>{
  watch(opt: Watch<P&D&C,Vueify<P,D,C,M,E,S,T>>): this
  lifecycle(opt: Lifecycle<Vueify<P,D,C,M,E,S,T>>): this
  options(opt: ComponentOptions<Vue>): this
  done(): Comp<P, D, C, M, K, E, S, T>
}

export interface Comp<P, D, C, M, K, E, S, T> extends Special<E, S, T> {
  _props: P
  _data(): D
  _computed: C
  _methods: M
  _components: K
}

export interface Special<E, S, T>  {
  $emit: E
  $scopedSlots: S
  $slots: T
}
