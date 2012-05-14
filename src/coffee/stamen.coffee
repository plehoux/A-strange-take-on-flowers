class Stamen extends Object
  @RADIUS = 1.5
  @SPEED  = 2
  constructor:(canvas,ctx,angle,x,y,color="#ccc")->
    super(canvas,ctx)
    @destroy = false
    @radius  = Stamen.RADIUS
    @angle   = angle
    @color   = color
    @x       = x
    @y       = y
    @vX = Math.cos(@angle)*Stamen.SPEED
    @vY = Math.sin(@angle)*Stamen.SPEED
    @aX = 0
    @aY = 0
    @setTimeout = false

  update:->
    if @setTimeout == false
      setTimeout(=>
          @destroy = true
        ,2500)
      @setTimeout = true
    @x += @vX
    @y += @vY
    @destroy = true if @x < 0 or @x > @canvas.width or @y < 0 or @y > @canvas.height

  draw:->
    @drawCircle(@x,@y,Stamen.RADIUS,"rgba("+@color+",0.8)")

this.Stamen = Stamen
