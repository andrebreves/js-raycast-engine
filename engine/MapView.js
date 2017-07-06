class MapView {

  constructor(canvas, level, player) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.level = level;
    this.scale = Math.min(canvas.width / level.width, canvas.height / level.height);
    this.player = player;
  }


  render(frame) {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.renderLevel(frame);
    this.renderPlayer(frame);
  }


  renderLevel(frame) {
    this.context.save();

    this.context.lineWidth = 1 / this.scale;
    this.context.scale(this.scale, this.scale);

    for (let y = 0; y < this.level.height; y++) {
      for (let x = 0; x < this.level.width; x++) {
        const wall = this.level.wallAt(x, y);

        if (wall) {
          if (wall.texture) {
            this.context.drawImage(wall.texture, x, y, 1, 1);
          } else {
            this.context.fillStyle = wall.color;
            this.context.fillRect(x, y, 1, 1);
          }
        } else {
          this.context.strokeStyle = 'white';
          this.context.strokeRect(x, y, 1, 1);
        }
      }
    }

    this.context.restore();
  }


  renderPlayer(frame) {
    this.context.save();

    this.context.translate(this.player.position.x * this.scale, this.player.position.y * this.scale);
    this.context.rotate(this.player.position.direction);

    this.context.strokeStyle = 'red';
    this.context.lineWidth = 2;

    this.context.beginPath();
    this.context.moveTo(-5,  0);
    this.context.lineTo( 5,  0);
    this.context.lineTo( 2,  -4);
    this.context.moveTo( 5,  0);
    this.context.lineTo( 2, 4);
    this.context.stroke();

    this.context.restore();
  }


  renderRay(frame, ray) {
    this.context.save();

    this.context.strokeStyle = 'rgba(255, 255, 0, 0.3)';

    this.context.lineWidth = 0.5;
    this.context.setLineDash([4, 2]);
    this.context.lineDashOffset = -((frame / 2) % 256);

    this.context.beginPath();
    this.context.moveTo(ray.origin.x * this.scale, ray.origin.y * this.scale);
    this.context.lineTo(ray.end.x * this.scale, ray.end.y * this.scale);
    this.context.stroke();

    if (ray.hit) {
      this.context.fillStyle = 'white';
      this.context.fillRect(ray.end.x * this.scale, ray.end.y * this.scale, 2, 2);
    }

    this.context.restore();
  }

}
