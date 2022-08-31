const audio = {
  Map: new Howl({
    src: `./audio/map.wav`,
    html5: true,
    // volume: 0.1
  }),

  InitBattle: new Howl({
    src: `./audio/init-battle.wav`,
    html5: true,
    // volume: 0.1
  }),

  Battle: new Howl({
    src: `./audio/battle.mp3`,
    html5: true,
    // volume: 0.1
  }),

  TackleHit: new Howl({
    src: `./audio/tackle-hit.wav`,
    html5: true,
    // volume: 0.1
  }),

  FireballHit: new Howl({
    src: `./audio/fireball-hit.wav`,
    html5: true,
    // volume: 0.1
  }),

  InitFireball: new Howl({
    src: `./audio/init-fireball.wav`,
    html5: true,
    // volume: 0.1
  }),

  Victory: new Howl({
    src: `./audio/victory.wav`,
    html5: true,
    // volume: 0.1
  }),
};