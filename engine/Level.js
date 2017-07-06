class Level {

  constructor() {
    this.map = [
      '11111111111111111111111',
      '1.....................1',
      '1.....................1',
      '1.....................1',
      '1.....................1',
      '1.....................1',
      '1.......00000000......1',
      '1.......0......0......1',
      '1..............0......1',
      '1.......0......0......1',
      '1.......000.0000......1',
      '1.........0.0.........1',
      '1.........0.00000.....1',
      '1.........0.....0.....1',
      '1.....222200000.0.....1',
      '1.....2.......2.2.....1',
      '1.....2.........2.....1',
      '1.....22222222222.....1',
      '1.....................1',
      '1.....................1',
      '1.....................1',
      '1.....................1',
      '11111111111111111111111',
    ];

    this.width = 0;
    this.map.forEach(row => this.width = Math.max(this.width, row.length));
    this.height = this.map.length;

    this.walls = {
      0: new Wall('red'  , 'assets/colorstone.png'),
      1: new Wall('green', 'assets/greystone.png'),
      2: new Wall('blue' , 'assets/bluestone.png'),
    }
  }

  wallAt(x, y) {
    if (y < 0 || y >= this.map.length) return null;
    const row = this.map[this.map.length - 1 - Math.floor(y)];

    if (!row || x < 0 || x >= row.length) return null;
    return this.walls[row.charAt(Math.floor(x))] || null;
  }

  isEmpty(x, y) {
    if (y < 0 || y >= this.map.length) return false;
    const row = this.map[this.map.length - 1 - Math.floor(y)];

    if (!row || x < 0 || x >= row.length) return false;
    return row.charAt(Math.floor(x)) === '.';
  }

}
