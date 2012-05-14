(function() {
  var Iris,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Iris = (function(_super) {

    __extends(Iris, _super);

    Iris.COLOR = "184,70,183";

    function Iris(id, ctx, canvas, emit, attract, auto, color) {
      if (auto == null) auto = false;
      if (color) {
        this.color = color;
      } else {
        this.color = Iris.COLOR;
      }
      Iris.__super__.constructor.call(this, id, ctx, canvas, emit, attract, auto);
    }

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

    return Iris;

  })(Flower);

  this.Iris = Iris;

}).call(this);
