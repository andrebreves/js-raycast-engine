class Camera {

  constructor(level, fieldOfView = Math.PI / 4) {
    this.level = level;
    this.fieldOfView = fieldOfView;

    this.map = map;
    this.x = 0;
    this.y = 0;
    this.direction = 0;

  }

  setPosition(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

}
