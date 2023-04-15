const width = 400;
const height = 400;
const squareSize = 15;

const snake = {
  xAxis: 15,
  yAxis: 15,
  height,
  width,
};

const fruit = {
  x: Math.floor(Math.random() * (width / squareSize)) * squareSize,
  y: Math.floor(Math.random() * (height / squareSize)) * squareSize,
};

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'black';
ctx.fillRect(snake.xAxis, snake.yAxis, squareSize, squareSize);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createFruit();
  updateSnake();
}

function updateSnake() {
  if (checkCollision()) {
    deleteFruit();
    return draw();
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'red';
  ctx.fillRect(fruit.x, fruit.y, squareSize, squareSize);
  ctx.fillStyle = 'black';
  ctx.fillRect(snake.xAxis, snake.yAxis, squareSize, squareSize);
}

function createFruit() {
  ctx.fillStyle = 'red';
  fruit.x = Math.floor(Math.random() * (width / squareSize)) * squareSize;
  fruit.y = Math.floor(Math.random() * (height / squareSize)) * squareSize;
  ctx.fillRect(fruit.x, fruit.y, squareSize, squareSize);
}

function deleteFruit() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.fillRect(snake.xAxis, snake.yAxis, squareSize, squareSize);
}

function handleMoves(event) {
  const key = event.key;

  if (key === 'ArrowRight') {
    if (snake.xAxis >= 885) snake.xAxis = 0;
    else snake.xAxis += 15;
    updateSnake();
  }

  if (key === 'ArrowLeft') {
    if (snake.xAxis <= 0) snake.xAxis = 885;
    else snake.xAxis -= 15;
    updateSnake();
  }

  if (key === 'ArrowDown') {
    if (snake.yAxis >= 710) snake.yAxis  = 0;
    else snake.yAxis += 15;
    updateSnake();
  }

  if (key === 'ArrowUp') {
    if (snake.yAxis <= 0) snake.yAxis = 710;
    else snake.yAxis -= 15;
    updateSnake();
  }
}

function checkCollision() {
  return snake.xAxis === fruit.x && snake.yAxis === fruit.y;
}

document.addEventListener('keydown', handleMoves);
draw();
