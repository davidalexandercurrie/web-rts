const socket = io();

let tanks = [];
let builder;
let counter = 0;

let mouseSelection = {
  x1: null,
  x2: null,
  y1: null,
  y2: null,
};

function setup() {
  let canvas = createCanvas(800, 800);
  canvas.elt.addEventListener('contextmenu', e => e.preventDefault());
  for (let i = 0; i < 5; i++) {
    tanks.push(new Tank(Math.floor(random(400)), Math.floor(random(400))));
  }
  builder = new Builder(100, 100, tanks);
  tanks.push(builder);
  frameRate(30);
}

function draw() {
  if (counter % 120 === 0) {
    console.log('building');
    builder.build();
  }
  counter++;
  background(247, 237, 240);
  for (let i = 0; i < tanks.length; i++) {
    tanks[i].show();

    for (let j = 0; j < tanks.length; j++) {
      if (i !== j && tanks[i].collidingWith(tanks[j])) {
        tanks[i].willCollide = true;
        break;
      } else {
        tanks[i].willCollide = false;
      }
    }
    tanks[i].move();
  }
  if (mouseIsPressed && mouseButton === LEFT) {
    fill(194, 239, 235, 130);
    stroke(43, 80, 170);
    rect(
      mouseSelection.x1,
      mouseSelection.y1,
      mouseX - mouseSelection.x1,
      mouseY - mouseSelection.y1
    );
  }
}

function mousePressed() {
  if (mouseButton === LEFT) {
    mouseSelection.x1 = mouseX;
    mouseSelection.y1 = mouseY;
  }
  if (mouseButton === RIGHT) {
    for (let i = 0; i < tanks.length; i++) {
      if (tanks[i].selected) {
        tanks[i].xMove = Math.floor(mouseX);
        tanks[i].yMove = Math.floor(mouseY);
        console.log(tanks[i]);
      }
    }
  }
}
function mouseReleased() {
  if (mouseButton === LEFT) {
    mouseSelection.x2 = mouseX;
    mouseSelection.y2 = mouseY;
    for (let i = 0; i < tanks.length; i++) {
      tanks[i].selected = isWithinRect(tanks[i], mouseSelection);
    }
  }
}

function isWithinRect(obj, area) {
  return (
    obj.x >= area.x1 && obj.x <= area.x2 && obj.y >= area.y1 && obj.y <= area.y2
  );
}
