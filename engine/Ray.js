class Ray {

  static cast(level, origin, direction, maxDistance = 10, step = 0.01) {
    const xStep = Math.cos(direction) * step;
    const yStep = Math.sin(direction) * step;

    let wall, distance;
    let x = origin.x;
    let y = origin.y;

    for (distance = 0; distance < maxDistance; distance += step) {
      wall = level.wallAt(x, y);
      if (wall) return new Ray(level, origin, direction, { x, y }, distance , wall);
      x += xStep;
      y += yStep;
    }

    return new Ray(level, origin, direction, { x, y }, distance - step, null);
  }

  constructor(level, origin, direction, end, distance, hit) {
    this.level = level;
    this.origin = origin;
    this.direction = direction;
    this.end = end;
    this.distance = distance;
    this.hit = hit;
  }

}
