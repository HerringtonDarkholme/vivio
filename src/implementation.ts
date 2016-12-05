export class Tag {
  protected ttt: number
  children?: Tag[]
  props?: {[k: string]: any}
  constructor(public tag: string) {}
}

const vnodekeys = [
  'class',
  'on',
  'props',
  'nativeon',
  'domprops',
  'style',
  'attrs',
  'slotname',
  'ref',
  'key',
  'directives',
]

export const COMPONENT_KEY = '__components__'

interface RenderContext {
  _h: (tag: string, p: any, children: any) => any
  _t: Function
}

let tagStack: Tag[] = []
let currentTag: Tag
let context: RenderContext
let result: Tag

export function setRenderContext(t: any) {
  context = t
}

export function startTag(tag: string, target: any) {
  tagStack.push(currentTag)
  const components = target[COMPONENT_KEY]
  if (components && components.hasOwnProperty(tag)) {
    currentTag = new Tag(components[tag])
  } else {
    currentTag = new Tag(tag)
  }
}

export function addProps(key: string, content: any) {
  if (!currentTag) throw new Error()
  if (currentTag.props) {
    currentTag.props[key] = content
  } else {
    currentTag.props = {[key]: content}
  }
}

export function closeTag(this: any, tag: string) {
  let t = tagStack.pop()!
  currentTag = tagStack.pop()!;
  let ret = context._h(t.tag, t.props, t.children)
  if (currentTag) {
    if (currentTag.children) {
      currentTag.children.push(ret)
    } else {
      currentTag.children = [ret]
    }
  }
  if (tagStack.length === 0) {
    result = ret
  }
  return this
}

export function getResult() {
  return result
}

export var proxyHandler = {
  get(target: any, name: string, receiver: any) {
    if (vnodekeys.indexOf(name) >= 0) {
      return (content: any) => {
        addProps(name, content)
        return receiver
      }
    }
    startTag(name, target)
    return receiver
  },
  apply(target: any, thisArg: any, argList: any) {
    return closeTag.call(thisArg)
  }
}
