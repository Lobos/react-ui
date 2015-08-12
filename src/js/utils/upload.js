'use strict'

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest()
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true)
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest()
    xhr.open(method, url)
  } else {
    // CORS not supported.
    xhr = null
  }
  return xhr
}

function ajaxUpload({url, name, file, onProgress, onError}) {
  let data = new FormData()
  data.append(name, file)

  let xhr = createCORSRequest('POST', url)
  xhr.upload.addEventListener('progress', onProgress)
  xhr.send(data)
}

export default function (args) {
  ajaxUpload(args)
}
