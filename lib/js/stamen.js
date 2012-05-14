(function() {
  var Stamen,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Stamen = (function(_super) {

    __extends(Stamen, _super);

    Stamen.RADIUS = 1.5;

    Stamen.SPEED = 2;

    function Stamen(canvas, ctx, angle, x, y, color) {
      if (color == null) color = "#ccc";
      Stamen.__super__.constructor.call(this, canvas, ctx);
      this.destroy = false;
      this.radius = Stamen.RADIUS;
      this.angle = angle;
      this.color = color;
      this.x = x;
      this.y = y;
      this.vX = Math.cos(this.angle) * Stamen.SPEED;
      this.vY = Math.sin(this.angle) * Stamen.SPEED;
      this.aX = 0;
      this.aY = 0;
      this.setTimeout = false;
    }

    Stamen.prototype.update = function() {
      var _this = this;
      if (this.setTimeout === false) {
        setTimeout(function() {
          return _this.destroy = true;
        }, 2500);
        this.setTimeout = true;
      }
      this.x += this.vX;
      this.y += this.vY;
      if (this.x < 0 || this.x > this.canvas.width || this.y < 0 || this.y > this.canvas.height) {
        return this.destroy = true;
      }
    };

    Stamen.prototype.draw = function() {
      return this.drawCircle(this.x, this.y, Stamen.RADIUS, "rgba(" + this.color + ",0.8)");
    };

    return Stamen;

  })(Object);

  this.Stamen = Stamen;

}).call(this);
