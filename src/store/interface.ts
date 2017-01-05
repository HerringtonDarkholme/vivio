// utility
export type F01<T, R> = (this: void, t?: T) => R
export type F1<A, R> = (this: void, a: A) => R
export type _ = {}

// vue related types
export interface Subscriber<P, S> {
  (mutation: P, state: S): void
}

export interface VueGetter<S, R> {
  (s: S): R
}

export interface CommitOption {
  silent?: boolean
}

export type WatchHandler<C, T> = (this: C, newVal: T, oldVal: T) => void
export interface WatchOption<C, T>{
  deep?: boolean
  immediate?: boolean
  handler?: WatchHandler<C, T>
}

export type Unsubscription = () => void


// vuex's API
export interface ActionStore<S, G, C, D> {
  readonly state: S
  readonly getters: G
  readonly commit: C
  readonly dispatch: D
}

export interface GetDef<S, G, T> {
  (s: S, g: G): T
}
export type GetDefs<S, G, T> = {
  [K in keyof T]: (s: S, g: G) => T[K]
} & {
  [k: string]: (s: S, g: G) => _
}
export type Getter<K extends string, T> = {
  readonly [k in K]: T
}

// mutation definition
export interface MD0<S, T> {
  (s: S, t?: T): void
}
export interface MD1<S, T> {
  (s: S, t: T): void
}
export interface MutationHandler0<T> {
  (this: void, t?: T, opt?: CommitOption): void
}
export interface MutationHandler1<T> {
  (this: void, t: T, opt?: CommitOption): void
}

// mutation definition object
export type MDO<S, T> = {
  [K in keyof T]: (s: S, t: T[K]) => void
} & {[k: string]: (s: S, t: any) => void}

export interface C0<K, T> {
  (k: K, t?: T, opt?: CommitOption): void
}
export interface CO0<T> {
  (k: keyof T, t?: undefined, opt?: CommitOption): void
}
export interface C1<K, T> {
  (k: K, t: T, opt?: CommitOption): void
}
export interface CO1<T> {
  <K extends keyof T>(k: K, t: T[K], opt?: CommitOption): void
}

export type CH0<K extends string, T> = {
  [k in K]: MutationHandler0<T>
}
export type COH0<T> = {
  [k in keyof T]: MutationHandler0<undefined>
}
export type CH1<K extends string, T> = {
  [k in K]: MutationHandler1<T>
}
export type COH1<T> = {
  [K in keyof T]: MutationHandler1<T[K]>
}

// action definition
export interface AD0<S, G, C, D, T, R> {
  (s: ActionStore<S, G, C, D>, t?: T): Promise<R> | R
}
export type ADO0<S, G, C, D, R> = {
  [K in keyof R]: (s: any) => (Promise<R[K]> | R[K])
} & {
  [k: string]: (s: ActionStore<S, G, C, D>) => any
}

export interface AD1<S, G, C, D, T, R> {
  (s: ActionStore<S, G, C, D>, t: T): Promise<R> | R
}
export type ADO1<S, G, C, D, T, R> = {
  [K in keyof R]: (s: any, t: any) => Promise<R[K]> | R[K]
} & {
  [K in keyof T]: (s: any, t: T[K]) => any
} & {
  [k: string]: (s: ActionStore<S, G, C, D>, t: any) => any
}

export type ActionHandler0<T, R> = F01<T, Promise<R[]>>
export type ActionHandler1<T, R> = F1<T, Promise<R[]>>
export interface D0<K, T, R> {
  (k: K, t?: T): Promise<R[]>
}
export interface DO0<R> {
  <K extends keyof R>(k: K): Promise<R[K][]>
}

export interface D1<K, T, R> {
  (k: K, t: T): Promise<R[]>
}
export interface DO1<T, R> {
  <K extends keyof (R | T)>(k: K, t: T[K]): Promise<R[K][]>
}

export type DH0<K extends string, T, R> = {
  [k in K]: ActionHandler0<T, R>
}
export type DHO0<R> = {
  [K in keyof R]: () => Promise<R[K][]>
}
export type DH1<K extends string, T, R> = {
  [k in K]: ActionHandler1<T, R>
}
export type DHO1<T, R> = {
  [K in keyof (T|R)]: (t: T[K]) => Promise<R[K][]>
}

export interface P0<K, T> {
  type: K
  payload?: T
}

export interface PO0<T> {
  type: keyof T
}

export interface P1<K, T> {
  type: K
  payload: T
}

export type ModuleState<K extends string, S> = {
  readonly [k in K]: S
}

export interface Plugin<Str extends BaseStore> {
  (s: Str): void
}

export interface Helper<G, CH extends BCH, DH extends BDH> {
  mapGetters<K extends keyof G>(...keys: K[]): {[k in K]: () => G[k]}
  mapMutations<K extends keyof CH>(...keys: K[]): {[k in K]: CH[k]}
  mapActions<K extends keyof DH>(...keys: K[]): {[k in K]: DH[k]}
}


// type bound and implementation type
export type BG = {}
export type BC = C0<string, {}>
export type BCH = CH0<string, {}>
export type BD = D0<string, {}|void, {}|void>
export type BDH = DH0<string, {}|void, {}|void>
export type BP = P0<string, {}>
export type BaseOpt = Opt<{}, BG, BC, BD, BP, BCH, BDH>
export type BaseStore = Store<{}, BG, BC, BD, BP, BCH, BDH>
export type BasePlugin = Plugin<BaseStore>
export type BaseSubscriber = Subscriber<BP, {}>
export type BaseHelper = Helper<BG, BCH, BDH>

// type level wizardry
export interface Opt<S, G extends BG, C extends BC, D extends BD, P extends BP, CH extends BCH, DH extends BDH> {
  getter<K extends string, T>(key: K, f: GetDef<S, G, T>): Opt<S, Getter<K, T> & G, C, D, P, CH, DH>
  getters<T>(opt: GetDefs<S, G, T>): Opt<S, Readonly<T>&G, C, D, P, CH, DH>
  declareGetter<K extends string, T>(): Opt<S, Getter<K, T> & G, C, D, P, CH, DH>

  mutation<K extends string, T>(key: K, f: MD0<S, T>): Opt<S, G, C0<K, T> & C, D, P0<K, T> | P, CH0<K, T> & CH, DH>
  mutationWithArg<K extends string, T>(key: K, f: MD1<S, T>): Opt<S, G, C1<K, T> & C, D, P1<K, T> | P, CH1<K, T> & CH, DH>

  mutations<T extends {[k: string]: (s: S) => void}>(commits: T): Opt<S, G, CO0<T> & C, D, PO0<T> | P, COH0<T> & CH, DH>
  mutationsWithArg<T>(commits: MDO<S, T>  ): Opt<S, G, CO1<T> & C, D, P1<keyof T, T> | P, COH1<T> & CH, DH>

  declareMutation<K extends string, T>(): Opt<S, G, C1<K, T> & C, D, P1<K, T> | P, CH1<K, T> & CH, DH>

  action<K extends string, T, R>(key: K, f: AD0<S, G, C, D, T, R>): Opt<S, G, C, D0<K, T, R> & D,  P, CH, DH0<K, T, R> & DH>
  actionWithArg<K extends string, T, R>(key: K, f: AD1<S, G, C, D, T, R>): Opt<S, G, C, D1<K, T, R> & D,  P, CH, DH1<K, T, R> & DH>

  actions<R>(dispatchs: ADO0<S, G, C, D, R>): Opt<S, G, C, DO0<R> & D, P, CH, DHO0<R> & DH>
  actionsWithArg<T, R>(dispatchs: ADO1<S, G, C, D, T, R>): Opt<S, G, C, DO1<T, R> & D, P, CH, DHO1<T, R> & DH>

  declareAction<K extends string, T, R>(): Opt<S, G, C, D1<K, T, R> & D,  P, CH, DH1<K, T, R> & DH>

  module<K extends string, S1, G1 extends BG, C1 extends BC, D1 extends BD, P1 extends BP, CH1 extends BCH, DH1 extends BDH>(key: K, o: Opt<S1, G1, C1, D1, P1, CH1, DH1>): Opt<S & ModuleState<K, S1>, G1 & G, C1 & C, D1 & D, P1 | P, CH1 & CH, DH1 & DH>

  plugin(...plugins: Plugin<Store<S, G, C, D, P, CH, DH>>[]): this
  done(): Store<S, G, C, D, P, CH, DH>

  state_t: S
  getters_t: G
  commit_t: C
  dispatch_t: D
  payload_t: P
}

export interface Store<S, G extends BG, C extends BC, D extends BD, P extends BP, CH extends BCH, DH extends BDH> {
  readonly state: S
  readonly getters: G
  readonly commit: C
  readonly dispatch: D

  readonly helper: Helper<G, CH, DH>

  subscribe(fn: Subscriber<P, S>): Unsubscription
  watch<R>(getter: VueGetter<S, R>, cb: WatchHandler<never, R>, options?: WatchOption<never, R>): Function
  replaceState(state: S): void
}
