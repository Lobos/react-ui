var Regs = require('./regs')

var Color = function (r, g, b, a) {
  var args = arguments.length
  if (args >= 3) {
    this.rgba(r, g, b, a)
  } else if (args === 2) {
    this.hex(r, g)
  } else if (args === 1) {
    if (typeof r === 'string') {
      if (r.indexOf('#') === 0) this.hex(r)
      else if (r.indexOf('rgb') === 0) this.rgba(r)
      else if (r.indexOf('hsv') === 0) this.hsv(r)
    } else if (typeof r === 'object') {
      if (r.r !== undefined) {
        this.rgba(r.r, r.g, r.b, r.a)
      } else if (r.h !== undefined) {
        this.hsv(r.h, r.s, r.v)
      }
    }
  }
}

var proto = Color.prototype

function rgb2hsv(r, g, b) {
  r = r / 255
  g = g / 255
  b = b / 255
  var rr, gg, bb, h, s,
  v = Math.max(r, g, b),
  diff = v - Math.min(r, g, b),
  diffc = function(c){
    return (v - c) / 6 / diff + 1 / 2
  }

  if (diff === 0) {
    h = s = 0
  } else {
    s = diff / v
    rr = diffc(r)
    gg = diffc(g)
    bb = diffc(b)

    if (r === v) {
      h = bb - gg
    } else if (g === v) {
      h = (1 / 3) + rr - bb
    } else if (b === v) {
      h = (2 / 3) + gg - rr
    }
    if (h < 0) {
      h += 1
    } else if (h > 1) {
      h -= 1
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100)
  }
}

function hsv2rgb(h, s, v) {
  h = to01(h, 360) * 6
  s = to01(s, 100)
  v = to01(v, 100)

  var i = Math.floor(h),
      f = h - i,
      p = v * (1 - s),
      q = v * (1 - f * s),
      t = v * (1 - (1 - f) * s),
      mod = i % 6,
      r = [v, q, p, p, t, v][mod],
      g = [t, v, v, q, p, p][mod],
      b = [p, p, t, v, v, q][mod]

  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) }
}

function to01(n, max) {
  n = parseFloat(n) || 0
  if (n < 0.0000001) return 0
  if (n > max) return 1
  return n / max
}

proto.toString = function (type) {
  if (!this.color) return null
  var str
  switch (type) {
    case 'rgba':
      str = 'rgba(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ',' + this.color.a + ')'
      break
    case 'rgb':
      str = 'rgb(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ')'
      break
    case 'hsv':
      var hsv = this.hsv()
      str = 'hsv(' + hsv.h + ',' + hsv.s + '%,' + hsv.v + '%)'
      break
    default:
      str = "#" +
        ("0" + this.color.r.toString(16)).slice(-2) +
        ("0" + this.color.g.toString(16)).slice(-2) +
        ("0" + this.color.b.toString(16)).slice(-2)
      break
  }
  return str
}

proto.rgba = function (r,g,b,a) {
  if (arguments.length === 0) {
    return this.color
  }

  if (typeof r === 'string' && r.indexOf('rgb') === 0) {
    var rgba = r.substr(r.indexOf('(') + 1).replace(')','').split(',')
    r = rgba[0]
    g = rgba[1]
    b = rgba[2]
    a = rgba[3]
  }

  this.color = {
    r: typeof r === 'string' ? parseInt(r) : r || 0,
    g: typeof g === 'string' ? parseInt(g) : g || 0,
    b: typeof b === 'string' ? parseInt(b) : b || 0,
    a: (typeof a !== 'string' && typeof a !== "number") && 1 || typeof a === 'string' && parseFloat(a) || a
  }
  return this
}

proto.hex = function (hex, a) {
  var r,g,b
  if (hex === undefined) {
    return this.toString('hex')
  }

  if (typeof hex === 'string') {
    r = hex.substr(hex.indexOf("#") + 1)
    var threeDigits = r.length === 3
    r = parseInt(r, 16)
    if (threeDigits)
      r = (((r & 0xF00) * 0x1100) | ((r & 0xF0) * 0x110) | ((r & 0xF) * 0x11))
  }

  g = (r & 0xFF00) / 0x100
  b =  r & 0xFF
  r =  r >>> 0x10
  this.rgba(r,g,b,a)
  return this
}

proto.hsv = function (h, s, v) {
  if (arguments.length === 0) {
    if (this.color)
      return rgb2hsv(this.color.r, this.color.g, this.color.b)  
    else
      return null
  }

  if (typeof h === 'string' && h.indexOf('hsv') === 0) {
    var hsv = h.substr(h.indexOf('(') + 1).replace(')','').split(',')
    h = hsv[0]
    s = hsv[1]
    v = hsv[2]
  }

  this.color = hsv2rgb(h, s, v)
  this.color.a = 1
  return this
}

Color.check = function (value, type) {
  if (!value) return false
  type = type || 'hex'
  value = value.replace(/\s/g, '')
  var re = Regs[type]
  if (!re) return false
  return re.test(value)
}

module.exports = Color
