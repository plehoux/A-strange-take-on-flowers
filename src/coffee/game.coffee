HTMLElement::hasClass = (cls)->
  (' ' + @className + ' ').indexOf(' ' + cls + ' ') > -1


class Game
  @TITLE           = "A strange take on flowers"
  @SUB_TITLE       = "— I can’t stand you, but i like you. Made in 48 hours at ToJam By Philippe-Antoine Lehoux™."
  @TUTORIAL_STEPS  = 
                    ["This is a two player game"
                     "Each player is a flower"
                     "You move them with [WASD] or [←↑↓→]"
                     "[WASD]’s attraction move is triggered by [space]"
                     "[←↑↓→]’s attraction move is triggered by [↩]"
                     "The goal is to catch the other flower's pollen"
                     "Flowers can’t “touch” each other"
                     "After 10 “touches”, it is game over"
                     "Remaining “touches” are illustrated by the purple bars"
                     "The flower who harvest the most pollen win"
                     "Ready?"]
                    
  constructor:(canvas)->
    @birdsSound = new Audio("lib/sounds/bg.m4a");
    @birdsSound.loop = "loop"
    @birdsSound.play()
    @body = document.getElementsByTagName('body')[0]
    @h1 = document.getElementsByTagName('h1')[0]
    @h2 = document.getElementsByTagName('h2')[0]
    @content = document.getElementById('content')
    @buttons = document.getElementById('buttons')
    @playButton = document.getElementById("play")
    @tutorialButton = document.getElementById("tutorial")
    @canvas = document.getElementById(canvas)
    @collisionBuffer = false
    @collision = 0
    @displayCollisionIndicator = false
    @flowers = []
    @initCanvas(@canvas)
    @titleScreen()
    setInterval(=>
      @update()
    ,16)

  tutorial:->
    @displayCollisionIndicator = true
    @clearTitle()
    @h2.innerHTML = "Press space to skip"
    @tutorialStep = 0
    @showTutorialStep(@tutorialStep)
    window.addEventListener('keydown',@skipTutorialEvent)

  skipTutorialEvent:(event)=>
    @showTutorialStep() if event.keyCode == 32

  showTutorialStep:->
    @flashBg()
    if @tutorialStep < Game.TUTORIAL_STEPS.length-1
      @h1.innerHTML = Game.TUTORIAL_STEPS[@tutorialStep]
      @tutorialStep++
    else if @tutorialStep == Game.TUTORIAL_STEPS.length-1
      @flowers = []
      @h2.innerHTML = ""
      @h1.innerHTML = Game.TUTORIAL_STEPS[@tutorialStep]
      @tutorialStep++
    else
      window.removeEventListener('keydown',@skipTutorialEvent)
      clearInterval(@tutorialInterval)
      @play()

  titleScreen: ->
    @flashBg()
    @flowers.push new Iris(0,@ctx,@canvas,true,true,true)
    @flowers.push new Trillium(1,@ctx,@canvas,true,true,true)
    @h1.innerHTML = Game.TITLE
    @h2.innerHTML = Game.SUB_TITLE
    @buttons.style.display = "block"
    window.addEventListener('keydown',@titleScreenEvent)


  titleScreenEvent:(event)=>
    @switchButton() if event.keyCode == 37 or event.keyCode == 39
    if event.keyCode == 32 or event.keyCode == 13
      window.removeEventListener('keydown',@titleScreenEvent)
      @play()     if @playButton.hasClass('selected')
      @tutorial() if @tutorialButton.hasClass('selected')
 
  switchButton:->
    if @tutorialButton.hasClass('selected')
      @playButton.className = "selected"
      @tutorialButton.className = ""
    else
      @tutorialButton.className = "selected"
      @playButton.className = ""

  play: ->
    @displayCollisionIndicator = true
    @flowers = []
    @flowers.push new Iris(0,@ctx,@canvas,false,false,false)
    @flowers.push new Trillium(1,@ctx,@canvas,false,false,false)
    flower.initKeyboard() for flower in @flowers
    @clearTitle()
    @count = 3
    @counter()

  start:->
    @clearTitle()
    @flashBg()
    for flower in @flowers
      flower.isAttracted = true
      flower.emitStamens = true

  clearTitle:->
    @h1.innerHTML = ""
    @h2.innerHTML = ""
    @buttons.style.display = "none"

  counter: ->
    @h1.innerHTML = if @count == 0 then "GO!" else @count
    setTimeout(=>
        @count--
        @flashBg()
        if @count >= 0
          @counter() 
        else
          @start()
      ,1000)

  initCanvas:->
    @body.addEventListener("touchmove",(event)->
        event.preventDefault()
        return false
      )
    @canvas.width =  window.innerWidth
    @canvas.height =  window.innerHeight
    @ctx = @canvas.getContext("2d")

  flashBg:->
    @canvas.style.background = "#000"
    setTimeout(=>
      @canvas.style.background = "#fff"
    ,50)

  update:->
    if @collision < 10
      collision = 0
      for flower,i in @flowers
        collision += flower.update(@flowers[if i == 1 then 0 else 1])
      if collision > 0
        unless @collisionBuffer
          @collision++
          if @collision < 10
            @flashBg()
        @collisionBuffer = true
        clearTimeout(@collisionTimeout)
        @collisionTimeout = setTimeout(=>
            @collisionBuffer = false
          ,100)
      if @collision >= 10
        if @flowers[0].points > @flowers[1].points
          @h1.innerHTML = 'The WASD player WON'
        else 
          @h1.innerHTML = 'The ARROWS player WON'
        @h1.width = '100%'
        @h2.innerHTML = "⌘ + R to restart the game!"
      @draw()
  
  draw:->
    @clearCanvas()
    flower.draw() for flower in @flowers

    if @displayCollisionIndicator
      @ctx.fillStyle = "rgba(96,70,184,0.2)"
      @ctx.fillRect(0,0,@canvas.width-@canvas.width/10*@collision,30)
      @ctx.fillRect(0,@canvas.height-30,@canvas.width-@canvas.width/10*@collision,30)

  clearCanvas: ->
    @ctx.clearRect(0,0,@canvas.width,@canvas.height)

this.g = new Game('game')