class Ray {

  static cast(level, origin, direction, range = 10, raycb = null) {
    // const ray = Ray.naiveCast(level, origin, direction, range);
    const ray = Ray.fastCast(level, origin, direction, range);
    if (raycb) raycb(ray);
    return ray;
  }

  static naiveCast(level, origin, direction, range = 10, step = 0.1) {
    const dx = Math.cos(direction) * step;
    const dy = Math.sin(direction) * step;

    let hit, distance;
    let x = origin.x;
    let y = origin.y;

    for (distance = 0; distance < range; distance += step) {
      hit = level.wallAt(x, y);
      if (hit) return { level, origin, direction, end: { x, y }, distance, hit };
      x += dx;
      y += dy;
    }

    distance -= step;
    return { level, origin, direction, end: { x, y }, distance };
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
    let distance = (x - origin.x) / cos;

    // Calcula a posição no eixo Y (tamanho cateto oposto)
    let y = origin.y + (distance * sin);

    const step = dx / cos;  // Deslocamento do raio (hipotenusa)
    const dy = step * sin;  // Deslocamento no eixo Y (outro cateto)

    while (distance < range) {
      let hit = level.wallAt(x + offset, y);
      if (hit) return { level, origin, direction, end: { x, y }, distance, hit, offset: cos < 0 ? y % 1 : 1 - (y % 1), vertical: true }
      x += dx;
      y += dy;
      distance += step;
    }

    // O raio não interceptou nenhuma parede
    x = origin.x + cos * range;
    y = origin.y + sin * range;
    distance = range;

    return { level, origin, end: { x, y }, direction, distance };
  }

  static castY(level, origin, direction, range = 10) {
    const cos = Math.cos(direction);
    const sin = Math.sin(direction);

    // Define se o raio vai andar para a esquerda ou para direita
    const dy = sin < 0 ? -1 : +1;
    const offset = dy / 10000;

    // Encontra o primeiro cruzamento do raio com uma linha vertical
    let y = sin < 0 ? Math.ceil(origin.y) + dy : Math.floor(origin.y) + dy;

    // Calcula a distância percorrida pelo raio até o momento (hipotenusa)
    let distance = (y - origin.y) / sin;

    // Calcula a posição no eixo Y (tamanho cateto oposto)
    let x = origin.x + (distance * cos);

    const step = dy / sin;  // Deslocamento do raio (hipotenusa)
    const dx = step * cos;  // Deslocamento no eixo Y (outro cateto)

    while (distance < range) {
      let hit = level.wallAt(x, y + offset);
      if (hit) return { level, origin, direction, end: { x, y }, distance, hit, offset: sin > 0 ? x % 1 : 1 - (x % 1), horizontal: true };
      x += dx;
      y += dy;
      distance += step;
    }

    // O raio não interceptou nenhuma parede
    x = origin.x + cos * range;
    y = origin.y + sin * range;
    distance = range;

    return { level, origin, end: { x, y }, direction, distance };
  }


}
