(function() {
  var Trillium,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Trillium = (function(_super) {

    __extends(Trillium, _super);

    Trillium.COLOR = "89,101,210";

    function Trillium(id, ctx, canvas, emit, attract, auto, color) {
      if (auto == null) auto = false;
      if (color) {
        this.color = color;
      } else {
        this.color = Trillium.COLOR;
      }
      Trillium.__super__.constructor.call(this, id, ctx, canvas, emit, attract, auto);
    }

    Trillium.prototype.draw = function() {
      return Trillium.__super__.draw.call(this, this.color);
    };

    Trillium.prototype.initKeyboard = function() {
      var _this = this;
      window.addEventListener('keydown', function(event) {
        switch (event.keyCode) {
          case 37:
            return _this.goLeft = true;
          case 38:
            return _this.goUp = true;
          case 39:
            return _this.goRight = true;
          case 40:
            return _this.goDown = true;
          case 13:
            return _this.force = true;
        }
      });
      return window.addEventListener('keyup', function(event) {
        switch (event.keyCode) {
          case 37:
            return _this.goLeft = false;
          case 38:
            return _this.goUp = false;
          case 39:
            return _this.goRight = false;
          case 40:
            return _this.goDown = false;
          case 13:
            return _this.force = false;
        }
      });
    };

    return Trillium;

  })(Flower);

  this.Trillium = Trillium;

}).call(this);
