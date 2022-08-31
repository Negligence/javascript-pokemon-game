
const battleBackgroundImage = new Image();
battleBackgroundImage.src = `./img/battle-background.png`;

const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  image: battleBackgroundImage
});


let draggle;
let emby;
let renderedSprites;
let battleAnimationId;
let queue;
// console.log(emby);


function initBattle() {
  document.querySelector(`#user-interface`).style.display = `block`;
  document.querySelector(`#dialog-box`).style.display = `none`;
  document.querySelector(`#enemy-health-bar`).style.width = `100%`;
  document.querySelector(`#player-health-bar`).style.width = `100%`;
  document.querySelector(`#attacks-box`).replaceChildren();

  draggle = new Monster(monsters.Draggle);
  emby = new Monster(monsters.Emby);
  renderedSprites = [draggle, emby];
  queue = [];

  emby.attacks.forEach(attack => {
    const button = document.createElement(`button`);
    button.innerHTML = attack.name;
    document.querySelector(`#attacks-box`).append(button);
  });

  // Attack Button addEventListeners
  const BUTTONS = document.querySelectorAll(`button`);

  BUTTONS.forEach(button => {
    button.addEventListener(`click`, function (event) {
      const selectedAttack = attacks[event.currentTarget.innerHTML];
      // console.log(attacks[event.currentTarget.innerHTML]);

      emby.attack({
        attack: selectedAttack,
        recipient: draggle,
        renderedSprites,
      });

      if (draggle.health <= 0) {
        queue.push(() => {
          draggle.faint();
        });

        queue.push(() => {
          //fade back to black
          gsap.to(`#overlapping-div`, {
            opacity: 1,
            onComplete: () => {
              cancelAnimationFrame(battleAnimationId);
              animate();
              document.querySelector(`#user-interface`).style.display = `none`;

              gsap.to(`#overlapping-div`, {
                opacity: 0,
              });

              battle.initiated = false;
            }
          });
        });
      }

      // Enemy Attacks Here
      const randomAttack = draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)];

      queue.push(() => {
        draggle.attack({
          attack: randomAttack,
          recipient: emby,
          renderedSprites,
        });

        if (emby.health <= 0) {
          queue.push(() => {
            emby.faint();
          });

          queue.push(() => {
            //fade back to black
            gsap.to(`#overlapping-div`, {
              opacity: 1,
              onComplete: () => {
                cancelAnimationFrame(battleAnimationId);
                animate();
                document.querySelector(`#user-interface`).style.display = `none`;
  
                gsap.to(`#overlapping-div`, {
                  opacity: 0,
                });

                battle.initiated = false;
              },
            });
          });
    
        }
      });

    });

    button.addEventListener(`mouseenter`, (event) => {
      const selectedAttack = attacks[event.currentTarget.innerHTML];
      document.querySelector(`#attack-type`).innerHTML = selectedAttack.type;
      document.querySelector(`#attack-type`).style.color = selectedAttack.color;
    });
  });
}

function animateBattle() {
  battleAnimationId = window.requestAnimationFrame(animateBattle);
  battleBackground.draw();

  // console.log(battleAnimationId);

  renderedSprites.forEach(sprite => {
    sprite.draw();
  });
}

// initBattle();
// animateBattle();

document.querySelector(`#dialog-box`).addEventListener(`click`, (event) => {
  if (queue.length > 0) {
    queue[0]()
    queue.shift();
  } else  event.currentTarget.style.display = `none`;
  // console.log(`Clicked Dialog`);
});