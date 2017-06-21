class Input {

  constructor() {
    this.state = { left: false, right: false, forward: false, backward: false, strafeLeft: false, strafeRight: false };
    this.keyMap = { 37: 'left', 39: 'right', 38: 'forward', 87: 'forward', 83: 'backward', 40: 'backward', 65: 'strafeLeft', 68: 'strafeRight' };
    window.addEventListener('keydown', e => this.keyDown(e), false);
    window.addEventListener('keyup', e => this.keyUp(e), false);
  }

  keyDown(event) {
    const control = this.keyMap[event.keyCode];
    if (control !== undefined) {
      this.state[control] = true;
      event.preventDefault();
    }
  }

  keyUp(event) {
    const control = this.keyMap[event.keyCode];
    if (control !== undefined) {
      this.state[control] = false;
      event.preventDefault();
    }
  }

  update(player) {
    const state = Object.assign({}, this.state);

    if (state.left && !state.right) player.turnLeft();
    if (state.right && !state.left) player.turnRight();
    if (state.forward && !state.backward) player.moveForward();
    if (state.backward && !state.forward) player.moveBackward();
    if (state.strafeLeft && !state.strafeRight) player.strafeLeft();
    if (state.strafeRight && !state.strafeLeft) player.strafeRight();
  }

}
