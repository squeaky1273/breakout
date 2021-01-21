// canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;

// ball speed
var dx = 3;
var dy = -3;

// ball size
var ballRadius = 10;

// paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth) / 2;

// arrow key
var rightPressed = false;
var leftPressed = false;

// bricks
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0 };
    }
}

// Draw the Ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Draw the canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();


    // if ball hits the wall
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        // if ball hits bottom, GAME OVER
        else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    }
    
    x += dx;
    y += dy;

    // move paddle to the right
    if(rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    // move paddle to the left
    else if(leftPressed) {
        paddleX -= 7;
        if (paddleX < 0){
            paddleX = 0;
        }
    }
}

// Draw the Paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// If keys are pressed down
function keyDownHandler(e) {
    // If right arrow is pressed
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    // If left arrow is pressed
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

// If keys aren't pressed down
function keyUpHandler(e) {
    // If right arrow isn't pressed
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    // If left arrow isn't pressed
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

// Draw the bricks
function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
var interval = setInterval(draw, 10);