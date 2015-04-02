function getAngle(r, angle, x0, y0) {
  x0 = x0 || 0
  y0 = y0 || 0
  var x1 = x0 + r * Math.cos(angle * Math.PI /180 )
  var y1 = y0 + r * Math.sin(angle * Math.PI /180 )
  return [x1.toFixed(2), y1.toFixed(2)]
}

function getPostions(count, r, angle, x0, y0) {
  r = r || 50
  angle = angle || 0
  x0 = x0 || r
  y0 = y0 || r
  var pos = []
  var step = 360 / count
  for (var i=0; i<count; i++) {
    pos.push(getAngle(r, step*i + angle, x0, y0))
  }
  return pos
}

module.exports = {
  getPostions: getPostions
}
