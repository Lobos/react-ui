import Quill from 'quill'

let BlockEmbed = Quill.import('blots/block/embed')

class ImageBlot extends BlockEmbed {
  static create (value) {
    let node = super.create()
    node.setAttribute('alt', value.alt)
    node.setAttribute('src', value.url)
    return node
  }

  static value (node) {
    return {
      alt: node.getAttribute('alt'),
      url: node.getAttribute('src')
    }
  }
}

ImageBlot.blotName = 'image-blot'
ImageBlot.tagName = 'img'

export default ImageBlot
