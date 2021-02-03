/* eslint-disable max-len */
/* eslint-disable no-const-assign */
/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-alert */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */

// import Background from './background.js';
import Ball from './ball.js';
import Brick from './brick.js';
import Lives from './lives.js';
import Paddle from './paddle.js';
import Score from './score.js';

// CONSTANTS
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// INITIALIZATIONS
// const background = new Background();
const ball = new Ball();
const lives = new Lives();
const score = new Score();

const paddleHeight = 10;
const paddleWidth = 75;
const paddleX = (canvas.width - paddleWidth) / 2;
const paddleY = (canvas.height - 12);
const paddle = new Paddle(paddleX, paddleY, paddleWidth, paddleHeight);

const brick = new Brick();

const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

let rightPressed = false;
let leftPressed = false;

const bricks = [];

// Draw the bricks
function drawBricks() {
  for (const c = 0; c < brickColumnCount; c) {
    for (const r = 0; r < brickRowCount; r) {
      if (bricks[c][r].status == 1) {
        brick.render(ctx);
      }
    }
  }
}

// Ball collides with bricks
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c) {
    for (let r = 0; r < brickRowCount; r) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (ball.x > b.x && ball.x < b.x + brickWidth && ball.y > b.y && ball.y < b.y + brickHeight) {
          ball.dy = -ball.dy;
          b.status = 0;
          score++;
          if (score === brickRowCount * brickColumnCount) {
            // alert('YOU WIN, CONGRATULATIONS!');
            document.location.reload();
          }
        }
      }
    }
  }
}

// If keys are pressed down
function keyDownHandler(e) {
  // If right arrow is pressed
  if (e.key == 'Right' || e.key == 'ArrowRight') {
    rightPressed = true;
  // If left arrow is pressed
  } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
    leftPressed = true;
  }
}

// If keys aren't pressed down
function keyUpHandler(e) {
  // If right arrow isn't pressed
  if (e.key == 'Right' || e.key == 'ArrowRight') {
    rightPressed = false;
  // If left arrow isn't pressed
  } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
    leftPressed = false;
  }
}

// Move mouse to move paddle
function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function renderObjectsOnCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.render(ctx);
  paddle.render(ctx);
  lives.render(ctx);
  score.render(ctx);
  ball.move(ctx);
  drawBricks();
  collisionDetection();

  // brick setup
  for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
      const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
      const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;

      bricks[c][r] = new Brick(brickX, brickY, brickWidth, brickHeight);
    }
  }

  // paddle movement
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  // paddle/canvas collisions
  if (ball.x + ball.dx > canvas.width - ball.ballRadius || ball.x + ball.dx < ball.ballRadius) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.dy < ball.ballRadius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ball.ballRadius) {
    if (ball.x > paddleX && ball.x < paddleX + paddleWidth) {
      ball.dy = -ball.dy;
    } else {
      lives--;
      if (!lives) {
        alert('GAME OVER');
        document.location.reload();
      } else {
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        ball.dx = 3;
        ball.dy = -3;
        paddle.x = paddleX;
      }
    }
  }

  // Draw the screen again
  requestAnimationFrame(renderObjectsOnCanvas);
}

// Register Events
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

renderObjectsOnCanvas();
