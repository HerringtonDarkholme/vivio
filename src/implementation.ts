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

export function startTag(tag: string) {
  tagStack.push(currentTag)
  currentTag = new Tag(tag)
}

export function addProps(key: string, content: any) {
  if (!currentTag) throw new Error()
  if (currentTag.props) {
    currentTag.props[key] = content
  } else {
    currentTag.props = {[key]: content}
  }
}

export function closeTag(tag: string) {
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
  return html
}

export function getResult() {
  return result
}

var html: any = new Proxy(closeTag, {
  get(target, name: string) {
    if (vnodekeys.indexOf(name) >= 0) {
      return (content: any) => {
        addProps(name, content)
        return html
      }
    }
    startTag(name)
    return html
  }
})

// html
// .div
// .props({test: '1232'})
// .class({vnode: true})
//   .p
//     .props({ptest: '1232'})
//     .class({pnode: true})
//   .p()
// .div()

export {html}
