class Trillium extends Flower
  @COLOR = "89,101,210"
  constructor: (id,ctx,canvas,emit,attract,auto=false,color)->
    if color then @color = color else @color = Trillium.COLOR
    super(id,ctx,canvas,emit,attract,auto)

  draw:->
    super(@color)

  initKeyboard: ->
    window.addEventListener('keydown',(event)=>
        switch event.keyCode
          when 37 then @goLeft  = true
          when 38 then @goUp    = true
          when 39 then @goRight = true
          when 40 then @goDown  = true
          when 13 then @force   = true
      )
    window.addEventListener('keyup',(event)=>
        switch event.keyCode 
          when 37 then @goLeft  = false
          when 38 then @goUp    = false
          when 39 then @goRight = false
          when 40 then @goDown  = false
          when 13 then @force   = false
      )

this.Trillium = Trillium