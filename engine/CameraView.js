class CameraView {

  constructor(canvas, level, camera) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.level = level;
    this.camera = camera;

    this.scale = 20;
    this.maxDistance = 15;
    this.forEachRay = null;
  }

  render(frame) {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    let angle = this.camera.direction + this.camera.fieldOfView / 2;
    const angleIncrement = this.camera.fieldOfView / this.canvas.width;

    for (let x = 0; x < this.canvas.width; x++) {
      let ray = Ray.cast(this.level, { x: this.camera.x, y: this.camera.y }, angle, this.maxDistance, this.forEachRay);

      if (ray.hit) {
        const z = ray.distance * this.scale * Math.cos(this.camera.direction - angle);
        const height = Math.floor(this.canvas.height * this.scale / z);
        this.renderRayTextured(ray, x, height);
      }

      angle -= angleIncrement;
    }
  }

  renderRaySolidColor(ray, x, height) {
    this.context.fillStyle = (ray.vertical ? 'dark' : '') + ray.hit.color;

    const y = (this.canvas.height - height) / 2;
    this.context.fillRect(x, y, 1, height);
  }

  renderRayShadedColor(ray, x, height) {
    this.context.fillStyle = (ray.vertical ? 'dark' : '') + ray.hit.color;

    const y = (this.canvas.height - height) / 2;
    this.context.fillRect(x, y, 1, height);

    this.context.fillStyle = `rgba(0, 0, 0, ${ray.distance / this.maxDistance})`;
    this.context.fillRect(x, y, 1, height);
  }

  renderRayTextured(ray, x, height) {
    const y = (this.canvas.height - height) / 2;

    if (ray.hit.texture) {
      this.context.drawImage(ray.hit.texture, ray.hit.texture.width * ray.offset, 0, 1, ray.hit.texture.height, x, y, 1, height);
    } else {
      this.context.fillStyle = ray.hit.color;
      this.context.fillRect(x, y, 1, height);
    }

    if (ray.vertical) {
      this.context.fillStyle = `rgba(0, 0, 0, 0.5)`;
      this.context.fillRect(x, y, 1, height);
    }

    this.context.fillStyle = `rgba(0, 0, 0, ${ray.distance / this.maxDistance})`;
    this.context.fillRect(x, y, 1, height);
  }

}
