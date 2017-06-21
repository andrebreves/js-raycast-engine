class Level {

  constructor() {
    this.map = [
    //'...............',
      '...............',
      '...............',
      '...............',
      '....00000000...',
      '....0......0...',
      '..2....1...0...',
      '....0......0...',
      '....000.0000...',
      '......0.0......',
      '......0.00000..',
      '......0.....0..',
      '......0000000..',
      '...............',
      '...............',
      '...............',
    //'...............',
    ];

    this.width = 0;
    this.map.forEach(row => this.width = Math.max(this.width, row.length));
    this.height = this.map.length;

    this.SCALE = 20;

    this.block = {
      0: { r:   0, g:   0, b: 255 },
      1: { r:   0, g: 255, b:   0 },
      2: { r: 255, g:   0, b:   0 },
    }

    this.walls = {
      0: new Wall('red'),
      1: new Wall('green'),
      2: new Wall('blue'),
    }
  }

  wallAt(x, y) {
    if (y < 0 || y >= this.map.length) return null;
    const row = this.map[Math.floor(y)];

    if (!row || x < 0 || x >= row.length) return null;
    return this.walls[row.charAt(Math.floor(x))] || null;
  }

  blockColor(block, alpha = 1.0) {
    const color = this.block[block];
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
  }

  blockAt(x, y) {
    if (y < 0 || y >= this.map.length) return ' ';
    const row = this.map[Math.floor(y)];

    if (!row || x < 0 || x >= row.length) return ' ';
    return row.charAt(Math.floor(x)) || ' ';
  }

  isEmpty(x, y) {
    return this.blockAt(x, y) === '.';
  }

  render(canvas) {
    const context = canvas.getContext('2d');

    context.save();

    const scaleX = canvas.width / this.width;
    const scaleY = canvas.height / this.height;
    this.SCALE = Math.min(scaleX, scaleY);

    // Clear canvas
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < this.map.length; y++) {
      const row = this.map[y];
      for (let x = 0; x < row.length; x++) {
        const block = this.blockAt(x, y);

        if (block === '.') {
          context.strokeStyle = 'white';
          context.strokeRect(Math.floor(x * this.SCALE), Math.floor(y * this.SCALE), this.SCALE, this.SCALE);
        } else {
          context.fillStyle = this.blockColor(block);
          context.fillRect(Math.floor(x * this.SCALE), Math.floor(y * this.SCALE), this.SCALE, this.SCALE);
        }
      }
    }

    context.restore();
  }

}
