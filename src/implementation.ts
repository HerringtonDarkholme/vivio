export class Tag {
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

interface RenderImpl {
  _h: (tag: string, p: any, children: any) => any
  _t: Function
}

export interface TagTree {
  tagStack: Tag[]
  shouldRender: boolean
  lastIfValue: boolean
  result: Tag|undefined
  __components__: any
}

// let tagStack: Tag[] = []
let currentTag: Tag
let renderImpl: RenderImpl
// let result: Tag | undefined
// let shouldRender = true
// let lastIfValue = false

const SKIP_TAG_PLACEHOLDER = {} as any

export function setRenderContext(t: any) {
  renderImpl = t
}

export function startTag(this: {__tagTree: TagTree}, tag: string) {
  let tagTree = this.__tagTree
  tagTree.tagStack.push(currentTag)
  if (!tagTree.shouldRender) {
    currentTag = SKIP_TAG_PLACEHOLDER
    return
  }
  const components = tagTree.__components__
  if (components && components.hasOwnProperty(tag)) {
    currentTag = new Tag(components[tag])
  } else {
    currentTag = new Tag(tag)
  }
}

export function addProps(this: {__tagTree: TagTree}, key: string, content: any) {
  let tagTree = this.__tagTree
  if (!tagTree.shouldRender) return
  if (currentTag.props) {
    currentTag.props[key] = content
  } else {
    currentTag.props = {[key]: content}
  }
}

export function closeTag(this: {__tagTree: TagTree}, template: TemplateStringsArray, ...args: any[]) {
  let tagTree = this.__tagTree
  if (arguments.length >= 1) {
    // skip when no rendering
    if (!tagTree.shouldRender) return;
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
  let t = tagTree.tagStack.pop()!;
  currentTag = tagTree.tagStack.pop()!;
  if (!tagTree.shouldRender) {
    if (tagTree.tagStack.length === 0 && !tagTree.lastIfValue) {
      tagTree.result = undefined
    }
    if (currentTag !== SKIP_TAG_PLACEHOLDER) {
      tagTree.shouldRender = true
      tagTree.lastIfValue = false
    }
    return this
  }
  let ret = renderImpl._h(t.tag, t.props, t.children)
  if (currentTag) {
    if (currentTag.children) {
      currentTag.children.push(ret)
    } else {
      currentTag.children = [ret]
    }
  }
  if (tagTree.tagStack.length === 0) {
    tagTree.result = ret
  }
  tagTree.lastIfValue = true
  return this
}

export function getResult(t: any) {
  let ret = t.__tagTree.result
  t.__tagTree.result = undefined
  return ret
}

export var proxyHandler = {
  get(target: {__tagTree: TagTree}, name: string, receiver: {}) {
    let tagTree = target.__tagTree
    if (name === '__tagTree') {
      return tagTree
    }
    if (name === 'if') {
      return (condition: boolean) => {
        tagTree.shouldRender = tagTree.shouldRender && condition
        if (!tagTree.shouldRender) { // remove currentTag in p.if(false)
          currentTag = SKIP_TAG_PLACEHOLDER
        }
        return receiver
      }
    }
    if (name === 'else') {
      if (tagTree.shouldRender && tagTree.lastIfValue) { // last p.if is true, skip else
        tagTree.shouldRender = false
        currentTag = SKIP_TAG_PLACEHOLDER
      }
      return receiver
    }
    if (name === 'children') {
      return (...children: any[]) => {
        if (!currentTag.children) {
          currentTag.children = []
        }
        // currentTag.children.push(...children)
        return receiver
      }
    }
    if (vnodekeys.indexOf(name) >= 0) {
      return (content: any) => {
        addProps.call(target, name, content)
        return receiver
      }
    }
    startTag.call(target, name)
    return receiver
  }
}
