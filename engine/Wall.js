class Wall {

  // color
  // texture

  constructor(color, texture = null) {
    this.color = color;
    if (texture) {
      this.texture = new Image();
      this.texture.src = texture;
    }
  }



}
