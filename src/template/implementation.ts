declare var Proxy: any;
declare var console: any;

export class Tag {
  children?: (Tag | string)[]
  props?: any
  constructor(public tag: string) {}
}

const vnodekeys = [
  'class',
  'on',
  'props',
  'nativeOn',
  'domProps',
  'style',
  'attrs',
  'asSlot',
  'ref',
  'key',
  'directives',
]

const VOID_TAGS = [
  'br' , 'embed' , 'hr' , 'img' , 'input' , 'area'
]

interface RenderImpl {
  _c: (tag: string, p: any, children: any) => any
  _t: Function
  _s: Function
  _v: Function
}

export interface TagTree {
  tagStack: Tag[]
  shouldRender: boolean
  lastIfValue: boolean
  isVoid: boolean
  result: Tag[]
  currentTag: Tag
  __components__: any
}

let renderImpl: RenderImpl
const SKIP_TAG_PLACEHOLDER = {} as any

export function setRenderContext(t: any) {
  renderImpl = t
}

export function startTag(this: {__tagTree: TagTree}, tag: string) {
  let tagTree = this.__tagTree
  tagTree.tagStack.push(tagTree.currentTag)
  if (!tagTree.shouldRender) {
    tagTree.currentTag = SKIP_TAG_PLACEHOLDER
    return
  }
  const components = tagTree.__components__
  if (typeof tag !== 'string') {
    // component
    tagTree.currentTag = new Tag(tag)
    return
  }
  if (components && components.hasOwnProperty(tag)) {
    tagTree.currentTag = new Tag(components[tag])
  } else {
    tagTree.currentTag = new Tag(tag)
  }
  if (VOID_TAGS.indexOf(tag) >= 0) {
    tagTree.isVoid = true
  }
}

export function addProps(this: {__tagTree: TagTree}, key: string, content: any) {
  let tagTree = this.__tagTree
  if (!tagTree.shouldRender) return
  if (key === 'asSlot') key = 'slot'
  if (tagTree.currentTag.props) {
    tagTree.currentTag.props[key] = content
  } else {
    tagTree.currentTag.props = {[key]: content}
  }
}

export function closeTag(this: {__tagTree: TagTree}, template: TemplateStringsArray, ...args: any[]) {
  let tagTree = this.__tagTree
  if (arguments.length >= 1) {
    // skip when no rendering
    if (!tagTree.shouldRender) return this
    let isArray = Array.isArray(template)
    if (!isArray) {
      console.log('unexpected tree call!')
      return this
    }
    let classString = template[0]
    for (let i = 0, l = args.length; i < l; i++) {
      let argStr = renderImpl._s(args[i])
      classString += argStr + template[i + 1]
    }
    let ids: string[] = []
    classString = classString.replace(/#[^.#]+/g, (match) => {
      ids.push(match.substr(1))
      return ''
    })
    let props = tagTree.currentTag.props = tagTree.currentTag.props || {}
    if (classString) {
      props.staticClass = classString.split('.').join(' ').trim()
    }
    if (ids.length > 0) {
      let attrs = props.attrs = props.attrs || {}
      attrs.id = ids.join(' ')
    }
    return this
  }
  let t: Tag
  if (tagTree.isVoid) {
    t = tagTree.currentTag;
    tagTree.isVoid = false
  } else {
    t = tagTree.tagStack.pop()!;
  }
  tagTree.currentTag = tagTree.tagStack.pop()!;
  if (!tagTree.shouldRender) {
    if (tagTree.currentTag !== SKIP_TAG_PLACEHOLDER) {
      tagTree.shouldRender = true
      tagTree.lastIfValue = false
    }
    return this
  }

  let ret
  if (t.tag === 'template') {
    ret = t.children || []
  } else if (t.tag === 'slot') {
    let props = t.props && t.props.props
    let name = 'default'
    if (props && props.name) {
      name = props.name
      delete props.name
    }
    ret = [renderImpl._t(name, t.children, props)]
  } else {
    ret = [renderImpl._c(t.tag, t.props, t.children)]
  }
  if (tagTree.currentTag) {
    if (tagTree.currentTag.children) {
      tagTree.currentTag.children.push(...ret)
    } else {
      tagTree.currentTag.children = ret
    }
  }
  if (tagTree.tagStack.length === 0) {
    tagTree.result.push(...ret)
  }
  tagTree.lastIfValue = true
  return this
}

export function getResult(t: any) {
  let ret = t.__tagTree.result
  t.__tagTree.result = []
  return ret[0]
}

export function getResults(t: any) {
  let ret = t.__tagTree.result
  t.__tagTree.result = []
  return ret
}

var proxyHandler = {
  get(target: {__tagTree: TagTree}, name: string, receiver: {}) {
    let tagTree = target.__tagTree

    if (name === '__tagTree') {
      return tagTree
    }

    if (name === 'if') {
      return (condition: boolean) => {
        tagTree.shouldRender = tagTree.shouldRender && condition
        if (!tagTree.shouldRender) { // remove currentTag in p.if(false)
          tagTree.currentTag = SKIP_TAG_PLACEHOLDER
        }
        return receiver
      }
    }

    if (name === 'for') {
      return (list: Array<{}>, cb: Function) => {
        for (let i = 0, l = list.length; i < l; i++) {
          cb(receiver, list[i], i)
        }
        return receiver
      }
    }

    if (name === 'else') {
      if (tagTree.shouldRender && tagTree.lastIfValue) { // last p.if is true, skip else
        tagTree.shouldRender = false
        tagTree.currentTag = SKIP_TAG_PLACEHOLDER
      }
      return receiver
    }

    if (name === 'children') {
      return (...children: any[]) => {
        if (!tagTree.currentTag.children) {
          tagTree.currentTag.children = []
        }
        for (let child of children) {
          if (typeof child === 'string') {
            tagTree.currentTag.children.push(child)
          } else {
            let tag = getResults(child)
            tagTree.currentTag.children.push(...tag)
          }
        }
        return receiver
      }
    }

    if (name === '$') {
      return (strings: string | TemplateStringsArray, ...args: any[]) => {
        if (!tagTree.shouldRender) return receiver
        if (!tagTree.currentTag.children) {
          tagTree.currentTag.children = []
        }
        if (Array.isArray(strings)) {
          let str = strings[0]
          for (let i = 0, l = args.length; i < l; i++) {
            let argStr = renderImpl._s(args[i])
            str += argStr + strings[i + 1]
          }
          tagTree.currentTag.children.push(renderImpl._v(str))
        } else {
          let strArgs = args.map(i => renderImpl._s(i))
          tagTree.currentTag.children.push(renderImpl._v(strings + strArgs.join('')))
        }
        return receiver
      }
    }

    if (name === 'tag') {
      return function Tag(tag: any) {
        // proxy `get` calls startTag before closeTag
        // so always call startTag
        startTag.call(receiver, tag)
        if (arguments.length === 0) {
          closeTag.call(receiver)
        }
        return receiver
      }
    }
    if (name === 'class') {
      return (...content: any[]) => {
        if (typeof content[0] === 'string') {
          addProps.call(target, 'class', content.join(' '))
        } else {
          addProps.call(target, 'class', content[0])
        }
        return receiver
      }
    }

    if (vnodekeys.indexOf(name) >= 0) {
      return (content: any) => {
        addProps.call(target, name, content)
        return receiver
      }
    }

    if (name === 'scopedSlot') {
      return (key: Function | string, fn?: Function) => {
        if (!tagTree.shouldRender) return
        if (typeof key !== 'string') {
          fn = key
          key = 'default'
        }
        if (!tagTree.currentTag.props) {
          tagTree.currentTag.props = {}
        }
        let props = tagTree.currentTag.props
        if (!props.scopedSlots) {
          props.scopedSlots = {}
        }
        let scopedSlots = props.scopedSlots
        scopedSlots[key] = (arg: {}) => getResults(fn!(arg))
        return receiver
      }
    }
    startTag.call(target, name)
    return receiver
  }
}

export var rootProxy  = {
  get(target: {__components__: any}, name: string, receiver: {}) {
    let comps = target.__components__
    function html(this: any) {
      return closeTag.apply(ret, arguments)
    }
    let _html: {__tagTree: TagTree} = html as any
    _html.__tagTree = {
      __components__: comps,
      lastIfValue: false,
      shouldRender: true,
      isVoid: false,
      tagStack: [],
      result: [],
      currentTag: undefined as any
    }
    let ret = new Proxy(html as any, proxyHandler)
    return ret[name]
  }
}
