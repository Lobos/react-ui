describe('utils Color', function() {
  var Color = ReactUI.Utils.Color

  it('new Color', function () {
    var color = new Color('#334455')
    color.toString('hex').should.equal('#334455')
    color = new Color(51,68,85)
    color.toString('hex').should.equal('#334455')
    color = new Color('#334455', 0.5)
    color.toString('rgba').should.equal('rgba(51,68,85,0.5)')
    color = new Color('rgba(51,68,85,0.5)')
    color.toString().should.equal('#334455')
    color = new Color('hsv(210,40%,33%)')
    color.toString('hex').should.equal('#324354')
  })

  it('color.toString', function () {
    var color = new Color('#334455')
    color.toString('hex').should.equal('#334455')
    color.toString('rgb').should.equal('rgb(51,68,85)')
    color.toString('rgba').should.equal('rgba(51,68,85,1)')
    color.toString('hsv').should.equal('hsv(210,40%,33%)')
  })

  it('color.hex', function () {
    var color = new Color()
    color.hex('#fffefd')
    color.color.r.should.equal(255)
    color.color.g.should.equal(254)
    color.color.b.should.equal(253)
    color.color.a.should.equal(1)

    var hex = color.hex()
    hex.should.equal('#fffefd')
    var rgba = color.rgba()
    rgba.should.eql({r:255,g:254,b:253,a:1})

    color.hex('#000000', 0.5)
    color.color.r.should.equal(0)
    color.color.g.should.equal(0)
    color.color.b.should.equal(0)
    color.color.a.should.equal(0.5)

    hex = color.hex()
    hex.should.equal('#000000')
    rgba = color.rgba()
    rgba.should.eql({r:0,g:0,b:0,a:0.5})

    color.hex('#0000ff')
    color.color.r.should.equal(0)
    color.color.g.should.equal(0)
    color.color.b.should.equal(255)

    hex = color.hex()
    hex.should.equal('#0000ff')
  })

  it('color.rgba', function () {
    var color = new Color()
    color.rgba(255,254,253)
    color.color.r.should.equal(255)
    color.color.g.should.equal(254)
    color.color.b.should.equal(253)
    color.color.a.should.equal(1)

    var hex = color.hex()
    hex.should.equal('#fffefd')
    var rgba = color.rgba()
    rgba.should.eql({r:255,g:254,b:253,a:1})

    color.rgba('rgba(0,0,0,0.5)')
    color.color.r.should.equal(0)
    color.color.g.should.equal(0)
    color.color.b.should.equal(0)
    color.color.a.should.equal(0.5)

    var hex = color.hex()
    hex.should.equal('#000000')
    var rgba = color.rgba()
    rgba.should.eql({r:0,g:0,b:0,a:0.5})
  })

  it('color.hsv', function () {
    var color = new Color()
    color.hsv(300, 100, 100)
    var hsv = color.hsv()
    hsv.should.deep.equal({h:300, s:100, v:100})
    var hex = color.hex()
    hex.should.equal('#ff00ff')

    color.hsv('hsv(300,100%,100%)')
    var hsv = color.hsv()
    hsv.should.deep.equal({h:300, s:100, v:100})

    color.hsv('hsv(210,40%,33%)')
    color.rgba().should.deep.equal({r:50, g:67, b:84, a:1})
    color = new Color('hsv(210,40%,33%)')
    color.rgba().should.deep.equal({r:50, g:67, b:84, a:1})

  })
})
