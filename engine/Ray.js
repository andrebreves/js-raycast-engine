class Ray {

  static cast(level, origin, direction, range = 10, raycb = null) {
    // return Ray.naiveCast(level, origin, direction, range, 0.01, raycb);
    return Ray.fastCast(level, origin, direction, range, raycb);
  }

  static naiveCast(level, origin, direction, range = 10, step = 0.1, raycb = null) {
    const xStep = Math.cos(direction) * step;
    const yStep = Math.sin(direction) * step;

    let wall, distance;
    let x = origin.x;
    let y = origin.y;

    for (distance = 0; distance < range; distance += step) {
      wall = level.wallAt(x, y);
      if (wall) return new Ray(level, origin, direction, { x, y }, distance , wall, 0, raycb);
      x += xStep;
      y -= yStep;
    }

    return new Ray(level, origin, direction, { x, y }, distance - step, null, null, raycb);
  }


  static fastCast(level, origin, direction, range = 10, raycb = null) {
    let verticalWall = Ray.castX(level, origin, direction, range);
    let horizontalWall = Ray.castY(level, origin, direction, range);

    let ray;
    if (verticalWall.hit && !horizontalWall.hit) ray = verticalWall;
    else if (!verticalWall.hit && horizontalWall.hit) ray = horizontalWall;
    else ray = (verticalWall.distance < horizontalWall.distance) ? verticalWall : horizontalWall;

    if (raycb) raycb(ray);

    return ray;
  }


  static castX(level, origin, direction, range = 10) {
    const cos = Math.cos(direction);
    const sin = Math.sin(direction);

    // Define se o raio vai andar para a esquerda ou para direita
    const dx = cos < 0 ? -1 : +1;
    const offset = dx / 10000;

    // Encontra o primeiro cruzamento do raio com uma linha vertical
    let x = cos < 0 ? Math.ceil(origin.x) + dx : Math.floor(origin.x) + dx;

    // Calcula a distância percorrida pelo raio até o momento (hipotenusa)
    let distance = Math.abs((x - origin.x) / cos);

    // Calcula a posição no eixo Y (tamanho cateto oposto)
    let y = origin.y - (distance * sin);

    const step = Math.abs(dx / cos);  // Deslocamento do raio (hipotenusa)
    const dy = step * sin;  // Deslocamento no eixo Y (outro cateto)

    while (distance < range) {
      let wall = level.wallAt(x + offset, y);
      if (wall) return new Ray(level, origin, direction, { x, y }, distance, wall, y % 1);
      x += dx;
      y -= dy;
      distance += step;
    }

    return new Ray(level, origin, direction, { x: origin.x + cos * range, y: origin.y - sin * range }, range, null, null);
  }

  static castY(level, origin, direction, range = 10) {
    const cos = Math.cos(direction);
    const sin = Math.sin(direction);

    // O eixo Y cresce para baixo, de maneira inversa ao plano cartesiano normal

    // Define se o raio vai andar para cima ou para baixo
    const dy = sin < 0 ? -1 : +1;
    const offset = dy / 10000;

    // Encontra o primeiro cruzamento do raio com uma linha horizontal
    let y = sin < 0 ? Math.floor(origin.y) - dy : Math.ceil(origin.y) - dy;

    // Calcula a distância percorrida pelo raio até o momento (hipotenusa)
    let distance = Math.abs((y - origin.y) / sin);

    // Calcula a posição no eixo X (cateto adjacente)
    let x = origin.x + (distance * cos);

    const step = Math.abs(dy / sin);  // Deslocamento do raio (hipotenusa)
    const dx = step * cos;  // Deslocamento no eixo X (outro cateto)

    while (distance < range) {
      let wall = level.wallAt(x, y - offset);
      if (wall) return new Ray(level, origin, direction, { x, y }, distance, wall, x % 1);
      x += dx;
      y -= dy;
      distance += step;
    }

    return new Ray(level, origin, direction, { x: origin.x + cos * range, y: origin.y - sin * range }, range, null, null);
  }


  constructor(level, origin, direction, end, distance, hit, offset, raycb = null) {
    this.level = level;
    this.origin = origin;
    this.direction = direction;
    this.end = end;
    this.distance = distance;
    this.hit = hit;
    this.offset = offset;

    if (raycb) raycb(this);
  }



}
