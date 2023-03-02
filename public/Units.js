class Tank {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xMove = x;
    this.yMove = y;
    this.selected = false;
    this.willCollide = false;
  }
  show() {
    if (this.selected) {
      stroke(0, 244, 0);
    } else {
      stroke(244, 0, 96);
    }
    fill(244, 244, 130);
    circle(this.x, this.y, 20);
  }
  move() {
    if (!this.willCollide) {
      this.x = Math.floor(
        this.x < this.xMove
          ? (this.x += 1)
          : this.x > this.xMove
          ? (this.x -= 1)
          : this.x
      );
      this.y = Math.floor(
        this.y < this.yMove
          ? (this.y += 1)
          : this.y > this.yMove
          ? (this.y -= 1)
          : this.y
      );
    }
  }
  collidingWith(otherTank) {
    // Calculate the new position of the tank after the move
    var newX =
      this.x < this.xMove
        ? this.x + 5
        : this.x > this.xMove
        ? this.x - 5
        : this.x;
    var newY =
      this.y < this.yMove
        ? this.y + 5
        : this.y > this.yMove
        ? this.y - 5
        : this.y;

    // Calculate the distance between the tanks at the new position
    var distance = Math.sqrt(
      (otherTank.x - newX) ** 2 + (otherTank.y - newY) ** 2
    );

    // Check if the tanks collide at the new position
    var sumRadii = 22; // assuming radius of each tank is 20
    return distance <= sumRadii;
  }
}

class Builder extends Tank {
  constructor(x, y, tanks) {
    super(x, y);
    this.tanks = tanks;
  }
  show() {
    if (this.selected) {
      stroke(0, 244, 0);
    } else {
      stroke(122, 122, 96);
    }
    fill(244, 244, 130);
    square(this.x, this.y, 20);
  }

  build() {
    if (tanks.length < 10) {
      const tankRadius = 20; // assuming radius of each tank is 20
      const maxDistance = 30;

      let xNew, yNew;
      let overlap = true;
      while (overlap) {
        // Choose a random location within maxDistance of the builder
        xNew =
          this.x +
          Math.floor(Math.random() * (2 * maxDistance + 1)) -
          maxDistance;
        yNew =
          this.y +
          Math.floor(Math.random() * (2 * maxDistance + 1)) -
          maxDistance;

        // Check if the new tank overlaps with any existing tanks or the builder
        overlap = false;
        for (let tank of this.tanks.concat(this)) {
          if (
            Math.sqrt((tank.x - xNew) ** 2 + (tank.y - yNew) ** 2) <=
            2 * tankRadius
          ) {
            overlap = true;
            break;
          }
        }
      }

      const newTank = new Tank(xNew, yNew);
      this.tanks.push(newTank);
    }
  }
}
