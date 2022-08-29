const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;

const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;
let highScore = 0;

function drawGame() {
  changeSnakePosition();

  let result = isGameOver();
  if (result) {
    return;
  }
  clearScreen();
  checkAppleColision();
  drawApple();
  drawSnake();
  drawScore();
  setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
  var gameOver = false;

  if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    ctx.fillStyle = "#fff";
    ctx.font = "50px Arial";

    let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    ctx.fillStyle = gradient;

    ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    ctx.fillText("F5 to restart", canvas.width / 6, canvas.height / 1.5);
  }

  return gameOver;
}

function drawScore() {
  ctx.fillStyle = "#fff";
  ctx.font = "15px Kdam Thmor Pro";
  ctx.fillText("Score " + score, canvas.width - 70, 20);
}

function clearScreen() {
  ctx.fillStyle = "#151515";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "#ccc";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  snakeParts.push(new SnakePart(headX, headY));
  if (snakeParts.length > tailLength) {
    snakeParts.shift();
  }

  ctx.fillStyle = "#fff";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;

  if (headX < 0) {
    headX = tileSize + 2;
  } else if (headX === tileCount) {
    headX = tileCount - 20;
  } else if (headY < 0) {
    headY = tileSize + 2;
  } else if (headY === tileCount) {
    headY = tileCount - 20;
  }
}

function drawApple() {
  ctx.fillStyle = "#CF300E";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleColision() {
  if (appleX === headX && appleY === headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
    while (speed <= 18) {
      speed++;
      break;
    }
  }
}

document.addEventListener("keydown", keyDown);

function keyDown(event) {
  //up
  if (event.keyCode == 38) {
    if (yVelocity == 1) return;
    yVelocity = -1;
    xVelocity = 0;
  }
  //down
  if (event.keyCode == 40) {
    if (yVelocity == -1) return;
    yVelocity = 1;
    xVelocity = 0;
  }
  //left
  if (event.keyCode == 37) {
    if (xVelocity == 1) return;
    yVelocity = 0;
    xVelocity = -1;
  }
  //right
  if (event.keyCode == 39) {
    if (xVelocity == -1) return;
    yVelocity = 0;
    xVelocity = 1;
  }
  //space
  if (event.keyCode == 32) {
    confirm("Game paused. Do you wish to continue?");
  }
}

drawGame();
