const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
// console.log(gsap);

let cW = canvas.width = 1024;
let cH = canvas.height = 576;
let speed = 3;

// context.fillStyle = 'white';
// context.fillRect(0, 0, cW, cH);

const collisionsMap = [];

for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, i + 70));
}

const battleZonesMap = [];

for (let i = 0; i < battleZonesData.length; i += 70) {
  battleZonesMap.push(battleZonesData.slice(i, i + 70));
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
    
const battleZones = [];

battleZonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
    battleZones.push(
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
    max: 4,
    hold: 30,
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
  },
  TouchUp: {
    pressed: false
  },
  TouchLeft: {
    pressed: false
  },
  TouchDown: {
    pressed: false
  },
  TouchRight: {
    pressed: false
  },
}

// const testBoundary = new Boundary({
//   position: {
//     x: 400,
//     y: 400
//   }
// });

const movables = [background, ...boundaries, foreground, ...battleZones];

function rectangularCollision({rectangle1, rectangle2}) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}

const battle = {
  initiated: false,
};

function animate() {
  const animationId = window.requestAnimationFrame(animate);
  background.draw();
  boundaries.forEach(boundary => {
    boundary.draw();
  });
  
  // testBoundary.draw();
  
  battleZones.forEach(battleZone => {
    battleZone.draw();
  })

  player.draw();
  foreground.draw();

  let moving = true;
  player.animate = false;
  
  // console.log(animationId);
  if (battle.initiated) return;

  // #region Activate a Battle
  if (keys.w.pressed || keys.ArrowUp.pressed || keys.a.pressed || keys.ArrowLeft.pressed || keys.s.pressed || keys.ArrowDown.pressed || keys.d.pressed || keys.ArrowRight.pressed) {
    for (let i = 0; i < battleZones.length; i++) {
      const battleZone = battleZones[i];
      const overlappingArea = (Math.min(player.position.x + player.width, battleZone.position.x + battleZone.width) - Math.max(player.position.x, battleZone.position.x)) * (Math.min(player.position.y + player.height, battleZone.position.y + battleZone.height) - Math.max(player.position.y, battleZone.position.y));

      if (rectangularCollision({rectangle1: player, rectangle2: battleZone}) && overlappingArea > (player.width * player.height) / 2 && Math.random() < 0.05) {
        console.log(`Activate Battle!`);

        // deactivate current animation loop
        window.cancelAnimationFrame(animationId);

        battle.initiated = true;
        gsap.to(`div > div`, {
          opacity:1,
          repeat:3,
          yoyo: true,
          duration: 0.4,
          onComplete() {
            gsap.to(`div > div`, {
              opacity:1,
              duration: 0.4,
              onComplete () {
                // activate a new animation loop
                animateBattle();
                gsap.to(`div > div`, {
                  opacity:0,
                  duration: 0.4,
                });
              }
            });
            


            
          }
        });
      }      
    }
  }
  // #endregion Activate a Battle

  if (keys.w.pressed && lastKey === 'w' || keys.ArrowUp.pressed && lastKey === 'ArrowUp' || keys.TouchUp.pressed && lastKey === `TouchUp`) {
    for (let i = 0; i < boundaries.length; i++) {
      player.animate = true;
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

  else if (keys.a.pressed && lastKey === 'a' || keys.ArrowLeft.pressed && lastKey === 'ArrowLeft' || keys.TouchLeft.pressed && lastKey === `TouchLeft`) {
    for (let i = 0; i < boundaries.length; i++) {
      player.animate = true;
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

  else if (keys.s.pressed && lastKey === 's' || keys.ArrowDown.pressed && lastKey === 'ArrowDown' || keys.TouchDown.pressed && lastKey === `TouchDown`) {
    for (let i = 0; i < boundaries.length; i++) {
      player.animate = true;
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

  else if (keys.d.pressed && lastKey === 'd' || keys.ArrowRight.pressed && lastKey === 'ArrowRight' || keys.TouchRight.pressed && lastKey === `TouchRight`) {
    for (let i = 0; i < boundaries.length; i++) {
      player.animate = true;
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

const battleBackgroundImage = new Image();
battleBackgroundImage.src = `./img/battle-background.png`;

const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  image: battleBackgroundImage
});

const draggleImage = new Image();
draggleImage.src = `./img/draggle-sprite.png`;

const draggle = new Sprite({
  position: {
    x: 800,
    y: 100,
  },

  image: draggleImage,

  frames: {
    max: 4,
    hold: 30,
  },

  animate: true,
  
});

const embyImage = new Image();
embyImage.src = `./img/emby-sprite.png`;

const emby = new Sprite({
  position: {
    x: 280,
    y: 325,
  },

  image: embyImage,

  frames: {
    max: 4,
    hold: 30,
  },

  animate: true,
  
});

function animateBattle() {
  window.requestAnimationFrame(animateBattle)
  battleBackground.draw();
  draggle.draw();
  emby.draw();
}

// animateBattle();

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
});

var xDown = null;                                                        
var yDown = null;

function getTouches(event) {
  return event.touches ||             // browser API
         event.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(event) {
    const firstTouch = getTouches(event)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
}                                     
                                                                         
function handleTouchMove(event) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = event.touches[0].clientX;                                    
    var yUp = event.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* right swipe */ 

            keys.TouchLeft.pressed = true;
            lastKey = `TouchLeft`;
        } else {
            /* left swipe */
            keys.TouchRight.pressed = true;
            lastKey = `TouchRight`;
        }         

    } else {
        if ( yDiff > 0 ) {
            /* down swipe */ 
            keys.TouchUp.pressed = true;
            lastKey = `TouchUp`;

        } else { 
            /* up swipe */
            keys.TouchDown.pressed = true;
            lastKey = `TouchDown`;
        }                                                                 
    }
    /* reset values */
    // xDown = null;
    // yDown = null;                                             
}

function handleTouchEnd () {
  keys.TouchLeft.pressed = false;
  keys.TouchRight.pressed = false;
  keys.TouchUp.pressed = false;
  keys.TouchDown.pressed = false;
}

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);
document.addEventListener('touchend', handleTouchEnd, false);