(function() {
  var Iris,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Iris = (function(_super) {

    __extends(Iris, _super);

    Iris.COLOR = "184,70,183";

    function Iris(id, ctx, canvas, emit, attract, auto, color) {
      if (auto == null) auto = false;
      this.initGamepad = __bind(this.initGamepad, this);
      window.addEventListener("MozGamepadConnected", this.initGamepad);
      if (color) {
        this.color = color;
      } else {
        this.color = Iris.COLOR;
      }
      Iris.__super__.constructor.call(this, id, ctx, canvas, emit, attract, auto);
    }

    Iris.prototype.update = function(antagonist) {
      if (this.gamepad.index === 0) this.updateGamepad();
      return Iris.__super__.update.call(this, antagonist);
    };

    Iris.prototype.draw = function() {
      return Iris.__super__.draw.call(this, this.color);
    };

    Iris.prototype.initKeyboard = function() {
      var _this = this;
      window.addEventListener('keydown', function(event) {
        switch (event.keyCode) {
          case 65:
            return _this.goLeft = true;
          case 87:
            return _this.goUp = true;
          case 68:
            return _this.goRight = true;
          case 83:
            return _this.goDown = true;
          case 32:
            return _this.force = true;
        }
      });
      return window.addEventListener('keyup', function(event) {
        switch (event.keyCode) {
          case 65:
            return _this.goLeft = false;
          case 87:
            return _this.goUp = false;
          case 68:
            return _this.goRight = false;
          case 83:
            return _this.goDown = false;
          case 32:
            return _this.force = false;
        }
      });
    };

    Iris.prototype.initGamepad = function(event) {
      return this.gamepad = event.gamepad;
    };

    return Iris;

  })(Flower);

  this.Iris = Iris;

  /*gauche :
  [0, -1, 0.003921568859368563, -1, 0.003921568859368563, 0.003921568859368563]
  [0, 1, 0.003921568859368563, 1, 0.003921568859368563, 0.003921568859368563]
  
  haut
  [0, 0.003921568859368563, -1, 0.019607843831181526, 0.003921568859368563, 0.003921568859368563]
  [0, 0.003921568859368563, 1, 0.019607843831181526, 0.003921568859368563, 0.003921568859368563]
  */

}).call(this);
