class CameraView {

  constructor(canvas, level, camera) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.level = level;
    this.camera = camera;

    this.scale = 20;
  }

  render(frame) {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    let angle = this.camera.direction - this.camera.fieldOfView / 2;
    const angleIncrement = this.camera.fieldOfView / this.canvas.width;

    for (let x = 0; x < this.canvas.width; x++) {
      let ray = Ray.cast(this.level, { x: this.camera.x, y: this.camera.y }, angle, 20)

      if (ray.hit) {
        const z = ray.distance * this.scale * Math.cos(this.camera.direction - angle);
        const height = Math.floor(this.canvas.height * this.scale / z);

        const fracX = ray.end.x % 1;
        const fracY = ray.end.y % 1;
        let dark = fracX < 0.01 || fracX > 1 - 0.01;

        this.context.fillStyle = (dark ? 'dark' : '') + ray.hit.color;

        const y = (this.canvas.height - height) / 2;
        this.context.fillRect(x, y, 1, height);
      }

      angle += angleIncrement;
    }
  }

}
