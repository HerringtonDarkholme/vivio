export class Tag {
  protected ttt: number
  children?: Tag[]
  props?: any
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
  'slotName',
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
let result: Tag | undefined
let shouldRender = true
let lastIfValue = false

const SKIP_TAG_PLACEHOLDER = {} as any

export function setRenderContext(t: any) {
  context = t
}

export function startTag(this: any, tag: string) {
  tagStack.push(currentTag)
  if (!shouldRender) {
    currentTag = SKIP_TAG_PLACEHOLDER
    return
  }
  const components = this[COMPONENT_KEY]
  if (components && components.hasOwnProperty(tag)) {
    currentTag = new Tag(components[tag])
  } else {
    currentTag = new Tag(tag)
  }
}

export function addProps(key: string, content: any) {
  if (!shouldRender) return
  if (currentTag.props) {
    currentTag.props[key] = content
  } else {
    currentTag.props = {[key]: content}
  }
}

export function closeTag(this: any, template: TemplateStringsArray, ...args: any[]) {
  if (arguments.length >= 1) {
    // skip when no rendering
    if (!shouldRender) return;
    let classString = template[0]
    for (let i = 0, l = args.length; i < l; i++) {
      let argStr = args[i] && args[i].toString()
      classString += argStr + template[i + 1]
    }
    let ids: string[] = []
    classString = classString.replace(/#[^.#]+/g, (match) => {
      ids.push(match.substr(1))
      return ''
    })
    let props = currentTag.props = currentTag.props || {}
    if (classString) {
      props.staticClass = classString.split('.').join(' ').trim()
    }
    if (ids.length > 0) {
      let attrs = props.attrs = props.attrs || {}
      attrs.id = ids.join(' ')
    }
    return this
  }
  let t = tagStack.pop()!;
  currentTag = tagStack.pop()!;
  if (!shouldRender) {
    if (tagStack.length === 0 && !lastIfValue) {
      result = undefined
    }
    if (currentTag !== SKIP_TAG_PLACEHOLDER) {
      shouldRender = true
      lastIfValue = false
    }
    return this
  }
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
  lastIfValue = true
  return this
}

export function getResult() {
  let ret = result
  result = undefined
  return ret
}

export var proxyHandler = {
  get(target: any, name: string, receiver: any) {
    if (name === 'if') {
      return (condition: boolean) => {
        shouldRender = shouldRender && condition
        if (!shouldRender) { // remove currentTag in p.if(false)
          currentTag = SKIP_TAG_PLACEHOLDER
        }
        return receiver
      }
    }
    if (name === 'else') {
      if (shouldRender && lastIfValue) { // last p.if is true, skip else
        shouldRender = false
        currentTag = SKIP_TAG_PLACEHOLDER
      }
      return receiver
    }
    if (vnodekeys.indexOf(name) >= 0) {
      return (content: any) => {
        addProps(name, content)
        return receiver
      }
    }
    startTag.call(target, name)
    return receiver
  }
}
