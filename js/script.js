const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let cW = canvas.width = 1024;
let cH = canvas.height = 576;
let speed = 1.5;

// context.fillStyle = 'white';
// context.fillRect(0, 0, cW, cH);

const collisionsMap = [];

for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, i + 70));
}

const boundaries = [];
const offset = {
  x: -735,
  y: -630
};

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
    boundaries.push(
      new Boundary({
        position: {
          x: j * Boundary.width + offset.x,
          y: i * Boundary.height + offset.y
        }}));
      });
    });

const image = new Image();
image.src = './img/pellet-town.png';

const foregroundImage = new Image();
foregroundImage.src = './img/foreground.png';

const playerDownImage = new Image();
playerDownImage.src = './img/player-down.png';

const playerUpImage = new Image();
playerUpImage.src = './img/player-up.png';

const playerLeftImage = new Image();
playerLeftImage.src = './img/player-left.png';

const playerRightImage = new Image();
playerRightImage.src = './img/player-right.png';

let pW = playerDownImage.width;
let pH = playerDownImage.height;
  
  const player = new Sprite({
    position: {
      x: cW / 2 - 192 / 4 / 2,
      y: cH / 2 - 68 / 2
  },
  image: playerDownImage,
  frames: {
    max: 4
  },
  sprites: {
    up: playerUpImage,
    left: playerLeftImage,
    down: playerDownImage,
    right: playerRightImage,
  }
});

const background = new Sprite({
  position:{
    x: offset.x,
    y: offset.y
  },
  image: image
});

const foreground = new Sprite({
  position:{
    x: offset.x,
    y: offset.y
  },
  image: foregroundImage
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

// const testBoundary = new Boundary({
//   position: {
//     x: 400,
//     y: 400
//   }
// });

const movables = [background, ...boundaries, foreground];

function rectangularCollision({rectangle1, rectangle2}) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}

function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  boundaries.forEach(boundary => {
    boundary.draw();
  });
  
  // testBoundary.draw();
  
  player.draw();
  foreground.draw();
  
  let moving = true;
  player.moving = false;
  
  if (keys.w.pressed && lastKey === 'w' || keys.ArrowUp.pressed && lastKey === 'ArrowUp') {
    for (let i = 0; i < boundaries.length; i++) {
      player.moving = true;
      player.image = player.sprites.up;
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + speed
            }
          }
        })
      ) {
        moving = false;
        break;
      }      
    }
    
    if (moving)
    movables.forEach(movable => {
    movable.position.y += speed
  })}

  else if (keys.a.pressed && lastKey === 'a' || keys.ArrowLeft.pressed && lastKey === 'ArrowLeft') {
    for (let i = 0; i < boundaries.length; i++) {
      player.moving = true;
      player.image = player.sprites.left;
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + speed,
              y: boundary.position.y
            }
          }
        })
      ) {
        moving = false;
        break;
      }      
    }
    
    if (moving)
    movables.forEach(movable => {
    movable.position.x += speed
  })}

  else if (keys.s.pressed && lastKey === 's' || keys.ArrowDown.pressed && lastKey === 'ArrowDown') {
    for (let i = 0; i < boundaries.length; i++) {
      player.moving = true;
      player.image = player.sprites.down;
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - speed
            }
          }
        })
      ) {
        moving = false;
        break;
      }      
    }
    
    if (moving)
    movables.forEach(movable => {
    movable.position.y -= speed
  })}

  else if (keys.d.pressed && lastKey === 'd' || keys.ArrowRight.pressed && lastKey === 'ArrowRight') {
    for (let i = 0; i < boundaries.length; i++) {
      player.moving = true;
      player.image = player.sprites.right;
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - speed,
              y: boundary.position.y
            }
          }
        })
      ) {
        moving = false;
        break;
      }      
    }
    
    if (moving)
    movables.forEach(movable => {
    movable.position.x -= speed
  })}

}
animate();

let lastKey = '';
window.addEventListener('keydown', (e) => {
  switch (e.key) {

    case 'w':
       keys.w.pressed = true;
       lastKey = 'w';
      break;

    case 'a':
       keys.a.pressed = true;
       lastKey = 'a';
      break;

    case 's':
       keys.s.pressed = true;
       lastKey = 's';
      break;

    case 'd':
       keys.d.pressed = true;
       lastKey = 'd';
      break;

    case 'ArrowUp':
       keys.ArrowUp.pressed = true;
       lastKey = 'ArrowUp';
      break;

    case 'ArrowLeft':
       keys.ArrowLeft.pressed = true;
       lastKey = 'ArrowLeft';
      break;

    case 'ArrowDown':
       keys.ArrowDown.pressed = true;
       lastKey = 'ArrowDown';
      break;

    case 'ArrowRight':
       keys.ArrowRight.pressed = true;
       lastKey = 'ArrowRight';
      break;

  
    default:
      break;
  }
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
})