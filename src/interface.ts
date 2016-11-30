import {B} from './block'

export type Class<C> = {
  new(): C
}

export type Classes<T> = {
  [K in keyof T]: Class<T[K]>
}

export declare class HTMLBrand {
  htmlBrand: {}
}

export type HTML<Comps> = B<HTMLBrand, Comps>
