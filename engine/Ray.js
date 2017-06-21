class Ray {

  static cast(level, origin, direction, maxDistance) {
    const step = 0.01;
    const xStep = Math.cos(direction) * step;
    const yStep = Math.sin(direction) * step;

    let wall, distance;
    let x = origin.x;
    let y = origin.y;

    for (distance = 0; distance < maxDistance; distance += step) {
      wall = level.wallAt(x, y);
      if (wall !== '.') break;
      x += xStep;
      y += yStep;
    }

    if (block !== '.' && block !== ' ') return new Ray(origin, direction, { x, y, wall, distance });
    else return new Ray(origin, direction);
  }

  constructor(origin, direction, hit) {
    this.origin = origin;
    this.direction = direction;
    if (hit) this.hit = hit;
  }

}
