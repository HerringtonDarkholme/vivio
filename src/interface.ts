import {B} from './block'

export declare class HTMLBrand {
  htmlBrand: {}
}

export type HTML = B<HTMLBrand, {
  elInput: {
    $emit: {change: any, focus: any}
  }
}>
