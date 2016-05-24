export default class Page {
  constructor (props) {
    this.title = 'React ui docs'
  }

  static open (path) {
    browser.url('http://localhost:3000/#/' + path)
  }

  static pause (time) {
    browser.pause(time = 3000)
  }
}
