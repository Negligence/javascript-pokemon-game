const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let cW = canvas.width = 1024;
let cH = canvas.height = 576;

context.fillStyle = 'white';
context.fillRect(0, 0, cW, cH);

const image = new Image();
image.src = './img/pellet-town.png';

const playerImage = new Image();
playerImage.src = './img/player-down.png';

let pW = playerImage.width;
let pH = playerImage.height;

class Sprite {
  constructor({ position, velocity, image }) {
    this.position = position;
    this.image = image;
  }

  draw() {
    context.drawImage(this.image, this.position.x, this.position.y);
  }
}

const background = new Sprite({
  position:{
    x: -735,
    y: -590
  },
  image: image
});

const keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  },
  ArrowUp: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  },
  ArrowDown: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  }
}

function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  context.drawImage(
    playerImage,
    /* Cropping */
    0,
    0,
    pW / 4,
    pH,
    /* Actual */
    cW / 2 - pW / 4 / 2,
    cH / 2 - pH / 2,
    pW / 4,
    pH
    );

  if (keys.w.pressed || keys.ArrowUp.pressed) background.position.y = background.position.y + 3;
  else if (keys.a.pressed || keys.ArrowLeft.pressed) background.position.x = background.position.x + 3;
  else if (keys.s.pressed || keys.ArrowDown.pressed) background.position.y = background.position.y - 3;
  else if (keys.d.pressed || keys.ArrowRight.pressed) background.position.x = background.position.x - 3;
}
animate();

window.addEventListener('keydown', (e) => {
  switch (e.key) {

    case 'w':
       keys.w.pressed = true;
      break;

    case 'a':
       keys.a.pressed = true;
      break;

    case 's':
       keys.s.pressed = true;
      break;

    case 'd':
       keys.d.pressed = true;
      break;

    case 'ArrowUp':
       keys.ArrowUp.pressed = true;
      break;

    case 'ArrowLeft':
       keys.ArrowLeft.pressed = true;
      break;

    case 'ArrowDown':
       keys.ArrowDown.pressed = true;
      break;

    case 'ArrowRight':
       keys.ArrowRight.pressed = true;
      break;

  
    default:
      break;
  }
  console.log(keys);
})

window.addEventListener('keyup', (e) => {
  switch (e.key) {

    case 'w':
       keys.w.pressed = false;
      break;

    case 'a':
       keys.a.pressed = false;
      break;

    case 's':
       keys.s.pressed = false;
      break;

    case 'd':
       keys.d.pressed = false;
      break;

    case 'ArrowUp':
       keys.ArrowUp.pressed = false;
      break;

    case 'ArrowLeft':
       keys.ArrowLeft.pressed = false;
      break;

    case 'ArrowDown':
       keys.ArrowDown.pressed = false;
      break;

    case 'ArrowRight':
       keys.ArrowRight.pressed = false;
      break;

  
    default:
      break;
  }
  console.log(keys);
})