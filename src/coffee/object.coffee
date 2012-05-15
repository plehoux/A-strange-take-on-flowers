class Object

  constructor:(canvas,ctx)->
    @canvas = canvas
    @ctx    = ctx

  drawCircle: (x,y,radius,color = "#000")->
    @ctx.beginPath()
    @ctx.fillStyle = color
    @ctx.arc(x, y, radius, 0, Math.PI*2, true)
    @ctx.closePath()
    @ctx.fill()

  testColision: (foreignX,foreignY,foreignRadius)->
    dX    = foreignX - @x
    dY    = foreignY - @y
    radii = @radius + foreignRadius
    true if ((dX*dX) + (dY*dY)) < (radii*radii)   

  attract: (destX,destY,destRadius)->
    numerator      = 600 * @radius/2 * destRadius/2
    distX          = @x - destX
    distY          = @y - destY
    denominator    = distX * distX + distY * distY
    forceMagnitude = numerator / denominator
    forceDirection = Math.atan2(distY, distX)
    forceMagnitude = Math.min(forceMagnitude, 2) if forceMagnitude > 0
    #deriving force component, horizontal, vertical
    fX  = forceMagnitude * Math.cos(forceDirection)
    fY  = forceMagnitude * Math.sin(forceDirection)
    @aX = fX/(@radius/2)
    @aY = fY/(@radius/2)
    @vX += -@aX
    @vY += -@aY

  directlyAttract:(x,y)->
    angle = Math.atan2(y - @y, x - @x)
    @vX   += Math.cos(angle)/2
    @vY   += Math.sin(angle)/2

  getRegion:(x,y)->
    if x < @canvas.width/2
      if y < @canvas.height/2 then 0 else 2
    else
      if y < @canvas.height/2 then 1 else 3

  getAngle: (destX,destY)->
    Math.atan2(destY - @y, destX - @x)

this.Object = Object