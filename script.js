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


image.onload = () => {
  let pW = playerImage.width;
  let pH = playerImage.height;

  context.drawImage(image, -735, -590);
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
}