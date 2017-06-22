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

  isEmpty(x, y) {
    if (y < 0 || y >= this.map.length) return false;
    const row = this.map[Math.floor(y)];

    if (!row || x < 0 || x >= row.length) return false;
    return row.charAt(Math.floor(x)) === '.';
  }

}
