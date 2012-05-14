class Iris extends Flower
  @COLOR = "184,70,183"
  constructor: (id,ctx,canvas,emit,attract,auto=false,color)->
    if color then @color = color else @color = Iris.COLOR
    super(id,ctx,canvas,emit,attract,auto)

  draw:->
    super(@color)

  initKeyboard: ->
    window.addEventListener('keydown',(event)=>
        switch event.keyCode
          when 65 then @goLeft  = true
          when 87 then @goUp    = true
          when 68 then @goRight = true
          when 83 then @goDown  = true
          when 32 then @force   = true
      )
    window.addEventListener('keyup',(event)=>
        switch event.keyCode
          when 65 then @goLeft  = false
          when 87 then @goUp    = false
          when 68 then @goRight = false
          when 83 then @goDown  = false
          when 32 then @force   = false
      )

this.Iris = Iris