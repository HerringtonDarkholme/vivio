import {HTMLBrand} from '../template/interface'
import {ComputedOptions, WatchOptions, ComponentOptions} from 'vue/types/options'
import * as Vue from 'vue'
// TODO: encoding computed readonly, by overloading
// encoding prop readonly

// props, data, computed, methods, komponent, assorted
export interface Extends<P, D, C, M, K, A> extends Mixin<P, D, C, M, K, A> {
  extends<P1, D1, C1, M1, K1>(m: Comp<P1, D1, C1, M1, K1, A>): Mixin<P1&P, D1&D, C1&C, M1&M, K1&K, A>
}

export interface Mixin<P, D, C, M, K, A> extends Prop<P, D, C, M, K, A> {
  mixin<P1, D1, C1, M1, K1>(m: Comp<P1, D1, C1, M1, K1, A>): Mixin<P1&P, D1&D, C1&C, M1&M, K1&K, A>
}
export interface Prop<P, D, C, M, K, A> extends Data<P, D, C, M, K, A> {
  props<P1>(props: P1): Data<P1&P, D, C, M, K, A>
}
export interface Data<P, D, C, M, K, A> extends Declare<P, D, C, M, K, A> {
  data<D1>(init: (this: P&D, p: P&D) => D1): Declare<P, D1&D, C, M, K, A>
}

export interface Declare<P, D, C, M, K, A> extends Repeatable<P, D, C, M, K, A> {
  emit<T>(): Declare<P, D, C, M, K, {$emit: T}&A>
  scopedSlots<T>(): Declare<P, D, C, M, K, {$scopedSlots: T}&A>
  slots<T>(): Declare<P, D, C, M, K, {$slots: T}&A>
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

export interface Repeatable<P, D, C, M, K, A> extends Render<P, D, C, M, K, A> {
  computed<C1>(opt: Computed<C1, P&D&C&M>): Repeatable<P, D, C1&C, M, K, A>
  methods<M1 extends Methods<P&D&C&M&A&Vue>>(opt: M1): Repeatable<P, D, C, M1&M, K, A>
}

export type Async<K> = () => (Promise<K> | K)

export type Components<K> = {
  [k in keyof K]: K[k] | Async<K[k]>
}
export interface Render<P, D, C, M, K, A> extends Other<P, D, C, M, K, A> {
  components<K1>(opt: Components<K1>): Render<P, D, C, M, K1&K, A>
  render(f: (this: P&D&C&M&A&Vue, h: any, vm: P&D&C&M&A&Vue) => any): Other<P, D, C, M, K, A>
}

export type WatchHandler<T, V> = (this: V, val: T, oldVal: T) => void;
export type WatchOpt<T, V> = {
  handler: WatchHandler<T, V>
} & WatchOptions

export type Watch<V, M> = {
  [K in keyof V]?: WatchHandler<V[K], V&M> | WatchOpt<V[K], V&M>
}

export type Lifecycles =
  | 'beforeCreate' | 'created' | 'destroyed' | 'beforeMount' | 'mounted'
  | 'beforeUpdate' | 'updated' | 'activated' | 'deactivated'

export type Lifecycle<V> = {
  [K in Lifecycles]: (this: V) => void
}

export interface Other<P, D, C, M, K, A> extends Comp<P, D, C, M, K, A>{
  watch(opt: Watch<P&D&C,M&Vue>): this
  lifecycle(opt: Lifecycle<P&D&C&M&Vue>): this
  options(opt: ComponentOptions<Vue>): this
  done(): Comp<P, D, C, M, K, A>
}

export interface Comp<P, D, C, M, K, A> {
  _props: P,
  _data(): D,
  _computed: C,
  _methods: M,
  _components: K,
  _assorted: A
}
