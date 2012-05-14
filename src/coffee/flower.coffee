class Flower extends Object
  @RADIUS         = 25
  @MAX_VELOCITY   = 10
  @START_VELOCITY = 2
  @FRICTION       = 0.1
  constructor: (id,ctx,canvas,emit=true,attract=true,auto=false)->
    super(canvas,ctx)
    @friction     = Flower.FRICTION
    @fireAngle    = 0
    @emitStamens  = emit
    @stamens      = []
    @isAttracted  = attract
    @autoStart    = true
    @radius       = Flower.RADIUS
    @goLeft       = false
    @goUp         = false
    @goRight      = false
    @goDown       = false
    @loadCount    = 240
    @points       = 0
    @auto         = auto
    @angle        = 1
    @ctx          = ctx
    @vX           = 0
    @vY           = 0
    @x            = @canvas.width/3*(id+1)
    @y            = @canvas.height/2

  update:(antagonist)->

    if @testColision(antagonist.x,antagonist.y,antagonist.radius)
      @vX += antagonist.vX
      antagonist.vX = -(antagonist.vX)
      @vY += antagonist.vY
      antagonist.vY = -(antagonist.vY)
      collision = true

    #Update velocy with friction
    unless collision
      if @vX > 0
        @vX -= @friction
      else if @vX < 0
        @vX += @friction
      if @vY > 0
        @vY -= @friction
      else if @vY < 0
        @vY += @friction

    #Update velocity on keydown
    if @auto
      if  Math.floor(Math.random() * 50) + 1 == 1 or @changeDirectionAuto or @autoStart
        @autoStart = false
        @changeDirectionAuto = false
        @goLeft  = false
        @goRight = false
        @goUp    = false
        @goDown  = false
        switch Math.floor(Math.random() * 4) + 1
          when 1 then @goLeft  = true
          when 2 then @goRight = true
          when 3 then @goUp    = true
          when 4 then @goDown  = true
    
    unless collision
      @left()  if @goLeft
      @up()    if @goUp
      @right() if @goRight
      @down()  if @goDown

    #floors and walls
    if @x < 0
      @vX = Math.abs(@vX)
      @changeDirectionAuto = true if @auto
    else if @x > @canvas.width
      @vX = -Math.abs(@vX)
      @changeDirectionAuto = true if @auto
    if @y < 0
      @vY = Math.abs(@vY)
      @changeDirectionAuto = true if @auto
    else if @y > @canvas.height
      @vY = -Math.abs(@vY)
      @changeDirectionAuto = true if @auto

    #get attrack by antagonist
    @attract(antagonist.x,antagonist.y,1000) if @isAttracted and !collision

    #update positions
    @x = @x + @vX
    @y = @y + @vY

    #Update fire angle
    if @fireAngle <= 360 then @fireAngle++ else @fireAngle = 0

    #Generate own stamens
    if @emitStamens
      @stamens.push(new Stamen(@canvas,@ctx,@fireAngle+(10*i-10),@x,@y,@color)) for i in [1..8]

    #Test collision on expanded antagonist radius to optimise attraction
    for stamen in antagonist.stamens
      unless @force
        stamen.attract(@x,@y,@radius) if @testColision(stamen.x,stamen.y,stamen.radius*100)
      else
        stamen.directlyAttract(@x,@y)

    #Update own stamens
    _del = []
    for stamen,i in @stamens
      stamen.update()
      _del.push i if stamen.destroy
    @stamens.splice(i, 1) for i in _del

    #Test collision on antagonist's stamen
    for stamen in antagonist.stamens
      if @testColision(stamen.x,stamen.y,stamen.radius)
        stamen.destroy = true
        @points++

    @points = 0 if @points > 400 and @auto

    @loadCount-- if @loadCount > 0

    if collision and !@auto and @loadCount <= 0  then 1 else 0

  draw:(color="#000")->
    @drawCircle(@x,@y,@points/10+25,"rgba("+color+",0.1)")
    @drawCircle(@x,@y,@loadCount,"rgba("+color+",0.08)") if !@auto and @loadCount > 0
    stamen.draw()for stamen in @stamens
    @drawCircle(@x,@y,Flower.RADIUS,"rgb("+color+")")

  left:->
    @vX = @vX-Flower.START_VELOCITY if @vX > -Flower.MAX_VELOCITY
  up:->
    @vY = @vY-Flower.START_VELOCITY if @vY > -Flower.MAX_VELOCITY
  right:->
    @vX = @vX+Flower.START_VELOCITY if @vX < Flower.MAX_VELOCITY
  down:->
    @vY = @vY+Flower.START_VELOCITY if @vY < Flower.MAX_VELOCITY

this.Flower = Flower