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
    color.toString('hex').should.equal('#334455')
    color = new Color('hsv(210,40%,33%)')
    color.toString('hex').should.equal('#324354')
    color = new Color({r:255, g:255, b:255})
    color.toString('hex').should.equal('#ffffff')
    color = new Color({h:210, s:40, v:33})
    color.toString('hex').should.equal('#324354')
  })

  it('color.toString', function () {
    var color = new Color('#334455')
    color.toString('hex').should.equal('#334455')
    color.toString('rgb').should.equal('rgb(51,68,85)')
    color.toString('rgba').should.equal('rgba(51,68,85,1)')
    color.toString('hsv').should.equal('hsv(210,40%,33%)')
    color = new Color()
    expect(color.toString()).to.be.null
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

  it('color check', function () {
    Color.check('', 'hex').should.be.false
    Color.check('#123', 'hex').should.be.false
    Color.check('#123456', 'hex').should.be.ok
    Color.check('#ff3456', 'hex').should.be.ok
    Color.check('123456', 'hex').should.be.false
    Color.check('', 'rgba').should.be.false
    Color.check('rgba(0,1,2,2)', 'rgba').should.be.false
    Color.check('rgba(0,1,2,1)', 'rgba').should.be.ok
    Color.check('rgba(0,1,2,0.2)', 'rgba').should.be.ok
    Color.check('rgba(0,1,256,1)', 'rgba').should.be.false
    Color.check('', 'rgb').should.be.false
    Color.check('rgb(255,1,2)', 'rgb').should.be.ok
    Color.check('rgb(256,1,1)', 'rgb').should.be.false
    Color.check('rgb(255,1)', 'rgb').should.be.false
    Color.check('rgb(0,1,254,1)', 'rgb').should.be.false
    Color.check('', 'hsv').should.be.false
    Color.check('hsv(0,0%,1%)', 'hsv').should.be.ok
    Color.check('hsv(256,100%,0%)', 'hsv').should.be.ok
    Color.check('hsv(255,100,100)', 'hsv').should.be.false
    Color.check('hsv(0,1%)', 'hsv').should.be.false
  })
})
