class CameraView {

  constructor(canvas, level, camera) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.level = level;
    this.camera = camera;

    this.forEachRay = null;
    this.maxDistance = 25;
    this.renderBackground();
  }

  renderBackground() {
    const background = document.createElement('canvas');
    // background.width = this.canvas.width;
    background.width = 1;
    background.height = this.canvas.height;

    const context = background.getContext('2d');
    context.fillStyle = '#373737';
    context.fillRect(0, 0, background.width, background.height);
    context.fillStyle = '#686868';
    context.fillRect(0, background.height / 2, background.width, background.height / 2);

    if (this.fog) {
      const height = Math.floor(background.height / this.maxDistance);
      for (let y = 0; y < background.height / 2; y++) {
        context.fillStyle = `rgba(0, 0, 0, ${y / ((background.height - height) / 2)})`;
        context.fillRect(0, y, background.width, 1);
        context.fillRect(0, background.height - 1 - y, background.width, 1);
      }
    }

    this.background = new Image();
    this.background.src = background.toDataURL();
  }

  setFog(fog) {
    this.fog = fog;
    this.renderBackground();
  }

  render(frame) {
    this.context.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);

    let angle = this.camera.direction + this.camera.fieldOfView / 2;
    const angleIncrement = this.camera.fieldOfView / this.canvas.width;

    for (let x = 0; x < this.canvas.width; x++) {
      let ray = Ray.cast(this.level, { x: this.camera.x, y: this.camera.y }, angle, this.maxDistance, this.forEachRay);

      if (ray.hit) {
        const height = Math.floor(this.canvas.height / (ray.distance * Math.cos(this.camera.direction - angle)));
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
      this.context.drawImage(
        ray.hit.texture,
        Math.floor(ray.hit.texture.naturalWidth * ray.offset), 0, 1, ray.hit.texture.naturalHeight,
        x, y, 1, height);
    } else {
      this.context.fillStyle = ray.hit.color;
      this.context.fillRect(x, y, 1, height);
    }

    if (ray.vertical) {
      this.context.fillStyle = `rgba(0, 0, 0, 0.5)`;
      this.context.fillRect(x, Math.floor(y), 1, height + 1);
    }

    if (this.fog) {
      this.context.fillStyle = `rgba(0, 0, 0, ${ray.distance / this.maxDistance})`;
      this.context.fillRect(x, Math.floor(y), 1, height + 1);
    }
  }

}
