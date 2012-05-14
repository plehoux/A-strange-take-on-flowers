(function() {
  var Object;

  Object = (function() {

    function Object(canvas, ctx) {
      this.canvas = canvas;
      this.ctx = ctx;
    }

    Object.prototype.drawCircle = function(x, y, radius, color) {
      if (color == null) color = "#000";
      this.ctx.beginPath();
      this.ctx.fillStyle = color;
      this.ctx.arc(x, y, radius, 0, Math.PI * 2, true);
      this.ctx.closePath();
      return this.ctx.fill();
    };

    Object.prototype.testColision = function(foreignX, foreignY, foreignRadius) {
      var dX, dY, radii;
      dX = foreignX - this.x;
      dY = foreignY - this.y;
      radii = this.radius + foreignRadius;
      if (((dX * dX) + (dY * dY)) < (radii * radii)) return true;
    };

    Object.prototype.attract = function(destX, destY, destRadius) {
      var denominator, distX, distY, fX, fY, forceDirection, forceMagnitude, numerator;
      numerator = 600 * this.radius / 2 * destRadius / 2;
      distX = this.x - destX;
      distY = this.y - destY;
      denominator = distX * distX + distY * distY;
      forceMagnitude = numerator / denominator;
      forceDirection = Math.atan2(distY, distX);
      if (forceMagnitude > 0) forceMagnitude = Math.min(forceMagnitude, 2);
      fX = forceMagnitude * Math.cos(forceDirection);
      fY = forceMagnitude * Math.sin(forceDirection);
      this.aX = fX / (this.radius / 2);
      this.aY = fY / (this.radius / 2);
      this.vX += -this.aX;
      return this.vY += -this.aY;
    };

    Object.prototype.directlyAttract = function(x, y) {
      var angle;
      angle = Math.atan2(y - this.y, x - this.x);
      this.vX += Math.cos(angle) / 2;
      return this.vY += Math.sin(angle) / 2;
    };

    Object.prototype.getRegion = function(x, y) {
      if (x < this.canvas.width / 2) {
        if (y < this.canvas.height / 2) {
          return 0;
        } else {
          return 2;
        }
      } else {
        if (y < this.canvas.height / 2) {
          return 1;
        } else {
          return 3;
        }
      }
    };

    Object.prototype.getAngle = function(destX, destY) {
      return Math.atan2(destY - this.y, destX - this.x);
    };

    return Object;

  })();

  this.Object = Object;

}).call(this);
