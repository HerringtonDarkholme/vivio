import {Core} from './impl'
import {Extends, HotModule, PropDef} from './interface'
export type ComponentDef = Extends<never, never, never, never, never, never, never, never>

export function component(module?: HotModule): ComponentDef {
  return new Core(module) as ComponentDef
}

export interface Class<T> {new (...args: {}[]): T}

export interface PlainProp<T> {
  type?: Class<T>
  validator?(value: T): boolean
  required?: boolean
}

export interface DefaultProp<T> extends PlainProp<T> {
  default: T | (() => T)
}

export interface RequiredProp<T> extends PlainProp<T> {
  required: true
  default?: T | (() => T)
}

// FuncPropOption is solely for bad API
export interface FuncProp<T extends Function> {
  type?: FunctionConstructor,
  defaultFunc?: T
  required?: boolean
}

// we cast arugment's config object type into plain data object type
// say, p(Number) has a return type of `number`, but at runtime it is
// {type: Number}. This is solely for API user's conciseness
export function p<T>(tpe: NumberConstructor): PropDef<number | undefined>
export function p<T>(tpe: StringConstructor): PropDef<string | undefined>
export function p<T>(tpe: BooleanConstructor): PropDef<boolean | undefined>
export function p<T>(tpe: Class<T>): PropDef<T | undefined>
export function p<T>(conf: RequiredProp<T>): PropDef<T>
export function p<T>(conf: DefaultProp<T>): PropDef<T>
export function p<T>(conf: PlainProp<T>): PropDef<T | undefined>
export function p<T extends Function>(conf: FuncProp<T>): PropDef<T>
export function p<T>(confOrType: Class<T> | PlainProp<T>): PropDef<T> {
  if (typeof confOrType === 'function') {
    let tpe = confOrType
    return {type: tpe} as any
  }
  let conf: any = confOrType
  if (conf.type === Function) {
    conf.default = conf.defaultFunc
    // TODO: evaluate copying a config rather than delete prop
    delete conf.defaultFunc
  }
  return conf
}
