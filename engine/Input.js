class Input {

  constructor() {
    this.state = { left: false, right: false, forward: false, backward: false, strafe: false };
    this.keyMap = { 37: 'left', 39: 'right', 38: 'forward', 40: 'backward', 18: 'strafe' };
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

    if (state.left  && !state.right && !state.strafe) player.turnLeft();
    if (state.right && !state.left  && !state.strafe) player.turnRight();
    if (state.left  && !state.right && state.strafe) player.strafeLeft();
    if (state.right && !state.left  && state.strafe) player.strafeRight();
    if (state.forward && !state.backward) player.moveForward();
    if (state.backward && !state.forward) player.moveBackward();

    if ((state.forward && !state.backward) || (state.backward && !state.forward) ||
    (state.left  && !state.right && state.strafe) || (state.right && !state.left  && state.strafe)) {
      player.setWalking(true);
    } else {
      player.setWalking(false);
    }
  }

}
