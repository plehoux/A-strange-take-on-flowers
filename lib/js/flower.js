(function() {
  var Flower,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Flower = (function(_super) {

    __extends(Flower, _super);

    Flower.RADIUS = 25;

    Flower.MAX_VELOCITY = 10;

    Flower.START_VELOCITY = 2;

    Flower.FRICTION = 0.1;

    function Flower(id, ctx, canvas, emit, attract, auto) {
      if (emit == null) emit = true;
      if (attract == null) attract = true;
      if (auto == null) auto = false;
      Flower.__super__.constructor.call(this, canvas, ctx);
      this.friction = Flower.FRICTION;
      this.fireAngle = 0;
      this.emitStamens = emit;
      this.stamens = [];
      this.isAttracted = attract;
      this.autoStart = true;
      this.radius = Flower.RADIUS;
      this.goLeft = false;
      this.goUp = false;
      this.goRight = false;
      this.goDown = false;
      this.loadCount = 240;
      this.gamepad = false;
      this.auto = auto;
      this.angle = 1;
      this.ctx = ctx;
      this.vX = 0;
      this.vY = 0;
      this.x = this.canvas.width / 3 * (id + 1);
      this.y = this.canvas.height / 2;
    }

    Flower.prototype.update = function(antagonist) {
      var collision, i, stamen, _del, _i, _j, _k, _len, _len2, _len3, _len4, _ref, _ref2, _ref3;
      if (this.testColision(antagonist.x, antagonist.y, antagonist.radius)) {
        this.vX += antagonist.vX;
        antagonist.vX = -antagonist.vX;
        this.vY += antagonist.vY;
        antagonist.vY = -antagonist.vY;
        collision = true;
      }
      if (!collision) {
        if (this.vX > 0) {
          this.vX -= this.friction;
        } else if (this.vX < 0) {
          this.vX += this.friction;
        }
        if (this.vY > 0) {
          this.vY -= this.friction;
        } else if (this.vY < 0) {
          this.vY += this.friction;
        }
      }
      if (this.auto) {
        if (Math.floor(Math.random() * 50) + 1 === 1 || this.changeDirectionAuto || this.autoStart) {
          this.autoStart = false;
          this.changeDirectionAuto = false;
          this.goLeft = false;
          this.goRight = false;
          this.goUp = false;
          this.goDown = false;
          switch (Math.floor(Math.random() * 4) + 1) {
            case 1:
              this.goLeft = true;
              break;
            case 2:
              this.goRight = true;
              break;
            case 3:
              this.goUp = true;
              break;
            case 4:
              this.goDown = true;
          }
        }
      }
      if (!collision) {
        if (this.goLeft) this.left();
        if (this.goUp) this.up();
        if (this.goRight) this.right();
        if (this.goDown) this.down();
      }
      if (this.x < 0) {
        this.vX = Math.abs(this.vX);
        if (this.auto) this.changeDirectionAuto = true;
      } else if (this.x > this.canvas.width) {
        this.vX = -Math.abs(this.vX);
        if (this.auto) this.changeDirectionAuto = true;
      }
      if (this.y < 0) {
        this.vY = Math.abs(this.vY);
        if (this.auto) this.changeDirectionAuto = true;
      } else if (this.y > this.canvas.height) {
        this.vY = -Math.abs(this.vY);
        if (this.auto) this.changeDirectionAuto = true;
      }
      if (this.isAttracted && !collision) {
        this.attract(antagonist.x, antagonist.y, 1000);
      }
      this.x = this.x + this.vX;
      this.y = this.y + this.vY;
      if (this.fireAngle <= 360) {
        this.fireAngle++;
      } else {
        this.fireAngle = 0;
      }
      if (this.emitStamens) {
        for (i = 1; i <= 8; i++) {
          this.stamens.push(new Stamen(this.canvas, this.ctx, this.fireAngle + (10 * i - 10), this.x, this.y, this.color));
        }
      }
      _ref = antagonist.stamens;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        stamen = _ref[_i];
        if (!this.force) {
          if (this.testColision(stamen.x, stamen.y, stamen.radius * 100)) {
            stamen.attract(this.x, this.y, this.radius);
          }
        } else {
          stamen.directlyAttract(this.x, this.y);
        }
      }
      _del = [];
      _ref2 = this.stamens;
      for (i = 0, _len2 = _ref2.length; i < _len2; i++) {
        stamen = _ref2[i];
        stamen.update();
        if (stamen.destroy) _del.push(i);
      }
      for (_j = 0, _len3 = _del.length; _j < _len3; _j++) {
        i = _del[_j];
        this.stamens.splice(i, 1);
      }
      _ref3 = antagonist.stamens;
      for (_k = 0, _len4 = _ref3.length; _k < _len4; _k++) {
        stamen = _ref3[_k];
        if (this.testColision(stamen.x, stamen.y, stamen.radius)) {
          stamen.destroy = true;
          this.points++;
        }
      }
      if (this.points > 400 && this.auto) this.points = 0;
      if (this.loadCount > 0) this.loadCount--;
      if (collision && !this.auto && this.loadCount <= 0) {
        return 1;
      } else {
        return 0;
      }
    };

    Flower.prototype.draw = function(color) {
      var stamen, _i, _len, _ref;
      if (color == null) color = "#000";
      this.drawCircle(this.x, this.y, this.points / 10 + 25, "rgba(" + color + ",0.1)");
      if (!this.auto && this.loadCount > 0) {
        this.drawCircle(this.x, this.y, this.loadCount, "rgba(" + color + ",0.08)");
      }
      _ref = this.stamens;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        stamen = _ref[_i];
        stamen.draw();
      }
      return this.drawCircle(this.x, this.y, Flower.RADIUS, "rgb(" + color + ")");
    };

    Flower.prototype.left = function() {
      if (this.vX > -Flower.MAX_VELOCITY) {
        return this.vX = this.vX - Flower.START_VELOCITY;
      }
    };

    Flower.prototype.up = function() {
      if (this.vY > -Flower.MAX_VELOCITY) {
        return this.vY = this.vY - Flower.START_VELOCITY;
      }
    };

    Flower.prototype.right = function() {
      if (this.vX < Flower.MAX_VELOCITY) {
        return this.vX = this.vX + Flower.START_VELOCITY;
      }
    };

    Flower.prototype.down = function() {
      if (this.vY < Flower.MAX_VELOCITY) {
        return this.vY = this.vY + Flower.START_VELOCITY;
      }
    };

    Flower.prototype.updateGamepad = function() {
      if ((this.gamepad != null) && !this.auto) {
        if (this.gamepad.axes[1] < -0.5) {
          this.goLeft = true;
        } else {
          this.goLeft = false;
        }
        if (this.gamepad.axes[1] > 0.5) {
          this.goRight = true;
        } else {
          this.goRight = false;
        }
        if (this.gamepad.axes[2] < -0.5) {
          this.goUp = true;
        } else {
          this.goUp = false;
        }
        if (this.gamepad.axes[2] > 0.5) {
          this.goDown = true;
        } else {
          this.goDown = false;
        }
        if (this.gamepad.buttons[2] === 1) {
          return this.force = true;
        } else {
          return this.force = false;
        }
      }
    };

    return Flower;

  })(Object);

  this.Flower = Flower;

}).call(this);
