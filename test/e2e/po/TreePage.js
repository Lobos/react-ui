import Page from './Page'

export default class TreePage extends Page {
  get firstRootLable () {
    return browser.element('//div[@class="docs-example"]/ul/li[1]/div/label')
  }

  get secondRootLable () {
    return browser.element('//div[@class="docs-example"]/ul/li[2]/div/label')
  }

  get valuePreviewDiv () {
    return browser.element('//div[@class="docs-example"]/div[1]')
  }

  init () {
    Page.open('tree')
  }
}
