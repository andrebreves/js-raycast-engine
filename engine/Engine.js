
// Referência:
// https://github.com/hunterloftis/playfuljs-demos/blob/gh-pages/raycaster/index.html
// http://permadi.com/1996/05/ray-casting-tutorial-table-of-contents/
// https://developer.mozilla.org/en-US/docs/Games
// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
// http://codeincomplete.com/posts/javascript-game-foundations-the-game-loop/

class Engine {

  static start() {
    const engine = new Engine();
    engine.runAt(60);
  }

  constructor() {
    this.canvas = document.getElementById('map');
    this.view = document.getElementById('view');
    this.level = new Level();
    this.player = new Player(this.level);
    this.control = new Input();
    this.camera = new Camera(this.level);

    this.mapView = new MapView(this.canvas, this.level, this.player);
    this.cameraView = new CameraView(this.view, this.level, this.camera);

    let element;

    element = document.getElementById('debug')
    this.debug = element.checked || false;
    if (element) element.addEventListener('change', event => this.debug = event.target.checked);

    element = document.getElementById('fog')
    this.camera.fog = element.checked;
    element.addEventListener('change', event => this.camera.fog = event.target.checked);

    element = document.getElementById('maxDistance');
    this.camera.maxDistance = element.value;
    element.addEventListener('input', event => this.camera.maxDistance = Math.floor(event.target.value));

    element = document.getElementById('fov');
    this.camera.fov = element.value;
    element.addEventListener('input', event => this.camera.fov = event.target.value);

  }


  runAt(framesPerSecond) {
    this.frame = 0;
    this.elapsedTime = 0;
    this.lastTimestamp = performance.now();
    this.frameInterval = 1000 / framesPerSecond;

    window.requestAnimationFrame(t => this.gameLoop(t));
  }


  gameLoop(timestamp) {
    window.requestAnimationFrame(t => this.gameLoop(t));

    this.elapsedTime += timestamp - this.lastTimestamp;

    while (this.elapsedTime > this.frameInterval) {
      this.frame++;
      this.update(this.frame)
      this.elapsedTime -= this.frameInterval;
    }

    this.render(this.frame);

    if (this.debug) this.showDebugInfo(timestamp);

    this.lastTimestamp = timestamp;
  }


  update(frame) {
    this.control.update(this.player);
  }


  render(frame) {
    this.mapView.render(frame);

    this.camera.setPosition(this.player.position.x, this.player.position.y, this.player.position.direction);
    // this.camera.showRays = this.debug;
    //this.camera.render(frame, this.view, this.canvas);
    this.cameraView.render(frame);
  }


  showDebugInfo(timestamp) {
    if (this.debugInfo === undefined) this.debugInfo = { fps: 0, averageFps: 0, lastFpsUpdate: timestamp };

    const context = this.view.getContext('2d')

    this.debugInfo.averageFps = 0.25 * (1000 / (timestamp - this.lastTimestamp)) + (1 - 0.25) * this.debugInfo.averageFps;

    if (timestamp > this.debugInfo.lastFpsUpdate + 250) {
      this.debugInfo.fps = this.debugInfo.averageFps;
      this.debugInfo.lastFpsUpdate = timestamp;
    }

    context.fillStyle = 'white';
    context.font = '20px Monospace';
    context.fillText('FPS: ' + this.debugInfo.fps.toFixed(1) + '/Frame: ' + this.frame, 10, 20);
  }

}
