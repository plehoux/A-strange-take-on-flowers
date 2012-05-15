(function() {
  var Game,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  HTMLElement.prototype.hasClass = function(cls) {
    return (' ' + this.className + ' ').indexOf(' ' + cls + ' ') > -1;
  };

  Game = (function() {

    Game.TITLE = "A strange take on flowers";

    Game.SUB_TITLE = "— I can’t stand you, but i like you. Made in 48 hours at ToJam By Philippe-Antoine Lehoux™.";

    Game.TUTORIAL_STEPS = ["This is a two player game", "Each player is a flower", "You move them with [WASD] or [←↑↓→]", "[WASD]’s attraction move is triggered by [space]", "[←↑↓→]’s attraction move is triggered by [↩]", "The goal is to catch the other flower's pollen", "Flowers can’t “touch” each other", "After 10 “touches”, it is game over", "Remaining “touches” are illustrated by the purple bars", "The flower who harvest the most pollen win", "Ready?"];

    function Game(canvas) {
      this.titleScreenEvent = __bind(this.titleScreenEvent, this);
      this.skipTutorialEvent = __bind(this.skipTutorialEvent, this);
      var _this = this;
      this.birdsSound = new Audio("lib/sounds/bg.m4a");
      this.birdsSound.loop = "loop";
      this.body = document.getElementsByTagName('body')[0];
      this.h1 = document.getElementsByTagName('h1')[0];
      this.h2 = document.getElementsByTagName('h2')[0];
      this.content = document.getElementById('content');
      this.buttons = document.getElementById('buttons');
      this.playButton = document.getElementById("play");
      this.tutorialButton = document.getElementById("tutorial");
      this.canvas = document.getElementById(canvas);
      this.collisionBuffer = false;
      this.collision = 0;
      this.displayCollisionIndicator = false;
      this.flowers = [];
      this.initCanvas(this.canvas);
      this.birdsSound.play();
      this.titleScreen();
      setInterval(function() {
        return _this.update();
      }, 16);
    }

    Game.prototype.tutorial = function() {
      this.displayCollisionIndicator = true;
      this.clearTitle();
      this.h2.innerHTML = "Press space to skip";
      this.tutorialStep = 0;
      this.showTutorialStep(this.tutorialStep);
      return window.addEventListener('keydown', this.skipTutorialEvent);
    };

    Game.prototype.skipTutorialEvent = function(event) {
      if (event.keyCode === 32 || event.keyCode === 13) {
        return this.showTutorialStep();
      }
    };

    Game.prototype.showTutorialStep = function() {
      this.flashBg();
      if (this.tutorialStep < Game.TUTORIAL_STEPS.length - 1) {
        this.h1.innerHTML = Game.TUTORIAL_STEPS[this.tutorialStep];
        return this.tutorialStep++;
      } else if (this.tutorialStep === Game.TUTORIAL_STEPS.length - 1) {
        this.flowers = [];
        this.h2.innerHTML = "";
        this.h1.innerHTML = Game.TUTORIAL_STEPS[this.tutorialStep];
        return this.tutorialStep++;
      } else {
        window.removeEventListener('keydown', this.skipTutorialEvent);
        clearInterval(this.tutorialInterval);
        return this.play();
      }
    };

    Game.prototype.titleScreen = function() {
      this.flashBg();
      this.flowers.push(new Iris(0, this.ctx, this.canvas, true, true, true));
      this.flowers.push(new Trillium(1, this.ctx, this.canvas, true, true, true));
      this.h1.innerHTML = Game.TITLE;
      this.h2.innerHTML = Game.SUB_TITLE;
      this.buttons.style.display = "block";
      return window.addEventListener('keydown', this.titleScreenEvent);
    };

    Game.prototype.titleScreenEvent = function(event) {
      if (event.keyCode === 37 || event.keyCode === 39) this.switchButton();
      if (event.keyCode === 32 || event.keyCode === 13) {
        window.removeEventListener('keydown', this.titleScreenEvent);
        if (this.playButton.hasClass('selected')) this.play();
        if (this.tutorialButton.hasClass('selected')) return this.tutorial();
      }
    };

    Game.prototype.switchButton = function() {
      if (this.tutorialButton.hasClass('selected')) {
        this.playButton.className = "selected";
        return this.tutorialButton.className = "";
      } else {
        this.tutorialButton.className = "selected";
        return this.playButton.className = "";
      }
    };

    Game.prototype.play = function() {
      var flower, _i, _len, _ref;
      this.displayCollisionIndicator = true;
      this.flowers = [];
      this.flowers.push(new Iris(0, this.ctx, this.canvas, false, false, false));
      this.flowers.push(new Trillium(1, this.ctx, this.canvas, false, false, false));
      _ref = this.flowers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        flower = _ref[_i];
        flower.initKeyboard();
      }
      this.clearTitle();
      this.count = 3;
      return this.counter();
    };

    Game.prototype.start = function() {
      var flower, _i, _len, _ref, _results;
      this.clearTitle();
      this.flashBg();
      _ref = this.flowers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        flower = _ref[_i];
        flower.isAttracted = true;
        _results.push(flower.emitStamens = true);
      }
      return _results;
    };

    Game.prototype.clearTitle = function() {
      this.h1.innerHTML = "";
      this.h2.innerHTML = "";
      return this.buttons.style.display = "none";
    };

    Game.prototype.counter = function() {
      var _this = this;
      this.h1.innerHTML = this.count === 0 ? "GO!" : this.count;
      return setTimeout(function() {
        _this.count--;
        _this.flashBg();
        if (_this.count >= 0) {
          return _this.counter();
        } else {
          return _this.start();
        }
      }, 1000);
    };

    Game.prototype.initCanvas = function() {
      this.body.addEventListener("touchmove", function(event) {
        event.preventDefault();
        return false;
      });
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      return this.ctx = this.canvas.getContext("2d");
    };

    Game.prototype.flashBg = function() {
      var _this = this;
      this.canvas.style.background = "#000";
      return setTimeout(function() {
        return _this.canvas.style.background = "#fff";
      }, 50);
    };

    Game.prototype.update = function() {
      var collision, flower, i, _len, _ref,
        _this = this;
      if (this.collision < 10) {
        collision = 0;
        _ref = this.flowers;
        for (i = 0, _len = _ref.length; i < _len; i++) {
          flower = _ref[i];
          collision += flower.update(this.flowers[i === 1 ? 0 : 1]);
        }
        if (collision > 0) {
          if (!this.collisionBuffer) {
            this.collision++;
            if (this.collision < 10) this.flashBg();
          }
          this.collisionBuffer = true;
          clearTimeout(this.collisionTimeout);
          this.collisionTimeout = setTimeout(function() {
            return _this.collisionBuffer = false;
          }, 100);
        }
        if (this.collision >= 10) {
          if (this.flowers[0].points > this.flowers[1].points) {
            this.h1.innerHTML = 'The WASD player WON';
          } else {
            this.h1.innerHTML = 'The ARROWS player WON';
          }
          this.h1.width = '100%';
          this.h2.innerHTML = "⌘ + R to restart the game!";
        }
        return this.draw();
      }
    };

    Game.prototype.draw = function() {
      var flower, _i, _len, _ref;
      this.clearCanvas();
      _ref = this.flowers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        flower = _ref[_i];
        flower.draw();
      }
      if (this.displayCollisionIndicator) {
        this.ctx.fillStyle = "rgba(96,70,184,0.2)";
        this.ctx.fillRect(0, 0, this.canvas.width - this.canvas.width / 10 * this.collision, 30);
        return this.ctx.fillRect(0, this.canvas.height - 30, this.canvas.width - this.canvas.width / 10 * this.collision, 30);
      }
    };

    Game.prototype.clearCanvas = function() {
      return this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    return Game;

  })();

  this.g = new Game('game');

}).call(this);
