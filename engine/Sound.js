class Sound {

  constructor() {
    // this.context = new (window.AudioContext || window.webkitAudioContext)();
    // this.footsteps = this.context.createBufferSource();
    //
    // let request = new XMLHttpRequest();
    // request.open('GET', 'foosteps.mp3', true);
    // request.responseType = 'arraybuffer';
    // request.onload = () => {
    //   this.context.decodeAudioData(request.response, buffer => {
    //     this.footsteps.buffer = buffer;
    //     this.footsteps.connect(this.context.destination);
    //     this.footsteps.loop = true;
    //   }, error => console.log('Error decoding audio', error));
    // };
    // request.send();
    this.footsteps = new Audio('assets/footsteps3.mp3');
    this.footsteps.loop = true;

    this.music = new Audio('assets/music.mp3');
    this.music.volume = 0.05;
    this.music.loop = true;
  }

  playMusic() {
    if (this.music) this.music.play();
  }

  playFootsteps() {
    if (this.footsteps) this.footsteps.play();
  }

  stopFootsteps() {
    if (this.footsteps) this.footsteps.pause();
  }

}
