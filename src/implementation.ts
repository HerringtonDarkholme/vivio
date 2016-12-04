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

let tagStack: Tag[] = []
let currentTag: Tag
let renderFunc = function(t: string, p: any, children: any[] | undefined) {
  console.log('rendered: ' + t)
  console.log('props: ' + JSON.stringify(p))
  console.log('children count: ' + (children ? children.length : 0))
  return {t, p, children}
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
  if (currentTag) {
    if (currentTag.children) {
      currentTag.children.push(t)
    } else {
      currentTag.children = [t]
    }
  }
  renderFunc(t.tag, t.props, t.children)
  return html
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

html
.div
.props({test: '1232'})
.class({vnode: true})
  .p
    .props({ptest: '1232'})
    .class({pnode: true})
  .p()
.div()

export {html}
