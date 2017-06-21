class Camera {

  constructor(map, fov = Math.PI / 4) {
    this.map = map;
    this.fov = fov;
    this.x = 0;
    this.y = 0;
    this.direction = 0;

    this.SCALE = 20;

    this.showRays = false;
    this.fog = false;
    this.timestamp = 0;
    this.maxDistance = 5;
  }

  setPosition(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  castRay(x, y, direction) {
    let block, distance;
    const step = 0.01;
    const xStep = Math.cos(direction) * step;
    const yStep = Math.sin(direction) * step;

    for (distance = 0; distance < this.maxDistance; distance += step) {
      block = this.map.blockAt(x, y);
      if (block !== '.') break;
      x += xStep;
      y += yStep;
    }

    return { x, y, distance, block, intercept: (block !== '.' && block !== ' ') };
  }

  renderRay(offset, canvas, ray) {
    const context = canvas.getContext('2d');
    context.save();
    context.strokeStyle = 'rgba(255, 255, 0, 0.3)';
    context.lineWidth = 1;
    context.setLineDash([4, 2]);
    context.lineDashOffset = -offset;
    context.beginPath();
    context.moveTo(this.x * this.map.SCALE, this.y * this.map.SCALE);
    context.lineTo(ray.x * this.map.SCALE, ray.y * this.map.SCALE);
    context.stroke();
    if (ray.intercept) {
      context.fillStyle = 'white';
      context.fillRect(ray.x * this.map.SCALE, ray.y * this.map.SCALE, 1, 1);
    }
    context.restore();
  }

  render(frame, canvas, map) {
    const context = canvas.getContext('2d');

    context.fillStyle = 'black';
    context.fillRect(0, 0, view.width, view.height);

    let angle = this.direction - this.fov / 2;
    const angleIncrement = this.fov / canvas.width;

    for (let x = 0; x < canvas.width; x++) {
      let ray = this.castRay(this.x, this.y, angle);

      if (this.showRays && x % 5 === 0) this.renderRay((frame / 2) % 256, map, ray);

      if (ray.intercept) {

        const z = ray.distance * this.SCALE * Math.cos(this.direction - angle);
        const height = Math.floor(canvas.height * this.SCALE/ z);

        const fracX = ray.x % 1;
        const fracY = ray.y % 1;
        let dark = fracX < 0.01 || fracX > 1 - 0.01;

        if (this.fog)
          context.fillStyle = this.map.blockColor(ray.block, dark ? ((1 - (ray.distance / this.maxDistance) * 0.5)) : (1 - (ray.distance / this.maxDistance)));
        else
          context.fillStyle = this.map.blockColor(ray.block, dark ? 0.5 : 1);

        const y = (canvas.height - height) / 2;
        context.fillRect(x, y, 1, height);
      }

      angle += angleIncrement;
    }


  }

}
