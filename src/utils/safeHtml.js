'use strict'

export function safeHtml (html) {
  if (typeof html !== 'string') return html

	let barrier = document.createElement('DIV')
	barrier.innerHTML = html

	let elements = barrier.querySelectorAll('*')
	for (let i = 0, l = elements.length; i < l; i++) {
		let el = elements[i]

		// <script>
		if (el.tagName === 'SCRIPT') {
			el.parentNode.removeChild(el)
		}

		let attributes = el.attributes
		for (let j = 0, m = attributes.length; j < m; j++) {
			let attribute = attributes[j]
			let name = attribute.name.toLowerCase()

			// href="javascript:…"
			if (name === 'href') {
				let value = attribute.value
				if (value.indexOf('javascript:') >= 0) {
					attribute.value = '#'
				}
			}	else if (name.indexOf('on') === 0) {
				attribute.value = ''
			}
		}
	}

	return barrier.innerHTML
}
