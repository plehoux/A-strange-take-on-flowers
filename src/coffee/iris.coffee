class Iris extends Flower
  @COLOR = "184,70,183"
  constructor: (id,ctx,canvas,emit,attract,auto=false,color)->
    window.addEventListener("MozGamepadConnected", @initGamepad);
    if color then @color = color else @color = Iris.COLOR
    super(id,ctx,canvas,emit,attract,auto)

  update:(antagonist)->
    if @gamepad.index == 0
      @updateGamepad()
    super(antagonist)

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

  initGamepad:(event)=>
    @gamepad = event.gamepad

this.Iris = Iris



###gauche :
[0, -1, 0.003921568859368563, -1, 0.003921568859368563, 0.003921568859368563]
[0, 1, 0.003921568859368563, 1, 0.003921568859368563, 0.003921568859368563]

haut
[0, 0.003921568859368563, -1, 0.019607843831181526, 0.003921568859368563, 0.003921568859368563]
[0, 0.003921568859368563, 1, 0.019607843831181526, 0.003921568859368563, 0.003921568859368563]###