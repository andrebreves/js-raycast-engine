class Wall {

  // color
  // texture

  constructor(color, texture = null, width = 0, height = 0) {
    this.color = color;
    if (texture) {
      this.texture = new Image(width, height);
      this.texture.src = texture;
    }
  }



}
