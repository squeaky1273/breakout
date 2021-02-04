/* eslint-disable max-classes-per-file */
/* eslint-disable max-len */
/* eslint-disable no-const-assign */
/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-alert */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */

// import Ball from './ball.js';
// import Brick from './brick.js';
// import Paddle from './paddle.js';

/// CLASSES
class Ball {
  constructor() {
    this.ballRadius = 10;
    this.color = '#0095DD';
    this.x = 250;
    this.y = 160;
    this.dx = 2;
    this.dy = 2;
  }

  // this method draws the ball
  drawBall(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  // this method changes the position of the ball on the canvas
  move(canvas) {
    // this is what moves the ball (literaly)
    if (this.x + this.dx > canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
      this.dx = -(this.dx);
    }
    if (this.y + this.dy > canvas.height - this.ballRadius || this.y + this.dy < this.ballRadius) {
      this.dy = -(this.dy);
    }
    this.x += this.dx;
    this.y += this.dy;
  }

  determineLoss(canvas, paddle) {
    // determine if ball goes off screen or not!
    if (this.y + this.dy > canvas.height - this.ballRadius) {
      if (this.x > paddle.x && this.x < paddle.x + paddle.width) {
        this.dy = -(this.dy);
      } else {
        alert('GAME OVER');
        document.location.reload();
      }
    }
  }
}
class Brick {
  constructor(argX, argY, argStatus) {
    this.x = argX;
    this.y = argY;
    this.status = argStatus;
    this.color = '#0095DD';
    this.width = 75;
    this.height = 20;
  }

  // methods here
  // THIS DRAWS THE BRICKS AND APPLYS OFFSETS
  drawBrick(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  detectCollision(ball) {
    // detect collision of ball during drawing!
    if (ball.x > this.x && ball.x < this.x + this.width
      && ball.y > this.y
      && ball.y < this.y + this.height) {
      // eslint-disable-next-line no-param-reassign
      ball.dy = -(ball.dy);
      this.status = 0;
      score.update(ctx);
      document.location.reload();
    }
  }
}

class Paddle {
  constructor(canvas) {
    this.color = '#0095DD';
    this.width = 75;
    this.height = 10;
    this.x = (canvas.width - this.width) / 2;
  }

  drawPaddle(canvas, ctx, rightPressed, leftPressed) {
    if (rightPressed && this.x < canvas.width - this.width) {
      this.x -= 7;
    } else if (leftPressed && this.x > 0) {
      this.x += 7;
    }
    ctx.beginPath();
    ctx.rect(this.x, canvas.height - this.height, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

class Score {
  constructor(color = '#000000', score = 0, font = '20px Comic-San') {
    this.color = color;
    this.score = score;
    this.font = font;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Score: ${this.score}`, 8, 20);
  }

  update() {
    this.score += 1;
  }
}

class Lives {
  constructor(x, y, color = '#000000', lives, font) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.lives = lives;
    this.font = font;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Lives: ${this.lives}`, this.y, 20);
  }

  loseLife() {
    this.lives -= 1;
  }
}

/// CONSTANTS
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// const canvasWidth = canvas.width;

/// INITIALIZATIONS
const ball1 = new Ball();
const score = new Score();
const lives = new Lives(0, 3, '#000000');

// BRICK VALUES
const brickRowCount = 5;
const brickColumnCount = 3;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    // THIS CREATES THE BRICK'S AND THEIR POSITIONS
    const brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
    const brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
    bricks[c][r] = new Brick(brickX, brickY, 1);
  }
}
const paddle = new Paddle(canvas);
/// EVENT HANDLERS AND EVENT LISTENERS
let rightPressed = false;
let leftPressed = false;
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
// document.addEventListener('mousemove', mouseMoveHandler, false);

// function mouseMoveHandler(e) {
//   const relativeX = e.clientX - canvas.offsetLeft;
//   if (relativeX > 0 && relativeX < canvasWidth) {
//     paddle.x = relativeX - paddle.width / 2;
//   }
// }

function keyDownHandler(e) {
  if (e.key == 'Right' || e.key == 'ArrowRight') {
    rightPressed = true;
  } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == 'Right' || e.key == 'ArrowRight') {
    rightPressed = false;
  } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
    leftPressed = false;
  }
}

// this generates the canvas and draws all the class objects onto it
function renderObjectsOnCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  score.render(ctx);
  lives.render(ctx);
  // generate ball and move it
  ball1.drawBall(ctx);
  ball1.move(canvas);
  // we need to draw each brick, every frame!
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        // draw brick if status == 1
        bricks[c][r].drawBrick(ctx);
        // detect collision of ball during drawing!
        bricks[c][r].detectCollision(ball1);
      }
    }
  }
  // update paddle position
  paddle.drawPaddle(canvas, ctx, leftPressed, rightPressed);
  // confirm loss state
  ball1.determineLoss(canvas, paddle);
}
setInterval(renderObjectsOnCanvas, 10);
